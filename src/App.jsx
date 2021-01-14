import React, { useState, useEffect,useCallback } from 'react';
import './assets/styles/style.css';
import { AnswersList, Chats } from './components/index';
import FormDialog from './components/Forms/FormDialog';
import { db } from './firebase/index';

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState("init");
  const [dataset, setDataset] = useState({});
  const [open, setOpen] = useState(false);

  // 問い合わせフォーム用モーダルを開くCallback関数
  const handleOpen = useCallback(() => {
    setOpen(true);
  },[setOpen]);

  // 問い合わせフォーム用モーダルを閉じるCallback関数
  // * 子コンポーネントにpropsとして渡しているためuseCallbackで書き換えてパフォーマンス向上
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  // 新しいチャットを追加するCallback関数
  const addChats = useCallback((chat) => {
    setChats(prevChats => {
      return [...prevChats, chat];
    });
  }, [setChats]);

  // 次の質問をチャットエリアに表示する関数
  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    // 選択された回答と次の質問をチャットに追加
    addChats({
      text: nextDataset.question,
      type: 'question'
    });

    // 次の回答一覧をセット
    setAnswers(nextDataset.answers);

    // 現在の質問IDをセット
    setCurrentId(nextQuestionId);
  };

  // 回答が選択された時に呼ばれる関数
  const selectAnswer = useCallback((selectedAnswer, nextQuestionId) => {
    switch (true) {
      // お問い合わせが選択された場合
      case (nextQuestionId === 'contact'):
        handleOpen();
        break;
      // リンクが選択された時
      case (/^https:*/.test(nextQuestionId)):
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank';
        a.click();
        break;
      // 選択された回答をchatsに追加
      default:
        addChats({
          text: selectedAnswer,
          type: 'answer'
        });

        setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 750);
        break;
    }
  }, [answers]);

  // 最初の質問をチャットエリアに表示する
    // コンポーネントが初期化して最初のrender後に何かしら副作用のある処理をしたい時
    // Firebaseのdb(firestore)のデータを取得する(componentDidMountですることが多い）
  useEffect(() => {
    //aync付きの即時関数
    (async () => {
      const initDataset = {};

      // Fetch questions dataset from Firestore
      await db.collection('questions').get().then(snapshots => {
        snapshots.forEach(doc => {
          initDataset[doc.id] = doc.data();
        });
      });

      // Firestoreから取得したデータセットを反映
      setDataset(initDataset);

      // 最初の質問を表示
      displayNextQuestion(currentId, initDataset[currentId]);
    })();
  }, []); //* componentDidMountをuseEffectで書き換えるときは第二引数を空の配列で

  // 最新のチャットが見えるように、スクロール位置の頂点をスクロール領域の最下部に設定する
  //* ComponentDidUpdateをuseEffectで書き換え
  useEffect(() => {
    const scrollArea = document.getElementById('scroll-area');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  });

  return (
    <section className="c-section">
      <div className="c-box">
        <Chats chats={chats} />
        <AnswersList answers={answers} select={selectAnswer} />
        <FormDialog open={open} handleClose={handleClose} />
      </div>
    </section>
  );
}

export default App;
