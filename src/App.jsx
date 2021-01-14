import React from 'react';
import './assets/styles/style.css';
import { AnswersList, Chats } from './components/index';
import FormDialog from './components/Forms/FormDialog';
import { db } from './firebase/index';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",
      dataset: {},//defaultDataset,// firestoreにつなぐ前は./dataset.jsから → 実施
      open: false
    }
    this.selectAnswer = this.selectAnswer.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats;
    chats.push({
      text: this.state.dataset[nextQuestionId].question,
      type:'question'
    })

    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentId: nextQuestionId
    })
  }

  selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case (nextQuestionId === 'init'):
        setTimeout(() => this.displayNextQuestion(nextQuestionId), 500);
        break;
      case (nextQuestionId === 'contact'):
        this.handleClickOpen();
        break;
      case (/^https:*/.test(nextQuestionId)):
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank';
        a.click();
        break;
      default:
        const chats = this.state.chats;
        chats.push({
          text: selectedAnswer,
          type: 'answer'
        });

        this.setState({
          chats: chats
          // NG 直接買い替えてしまっているから chats: this.state.chats.push(chat)
        });

        setTimeout(() => this.displayNextQuestion(nextQuestionId), 1000);
        break;
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  initDataset = (dataset) => {
    this.setState({ dataset: dataset });
  }

  // コンポーネントが初期化して最初のrender後に何かしら副作用のある処理をしたい時
  // Firebaseのdb(firestore)のデータを取得する(componentDidMountですることが多い）
  componentDidMount() {
    //aync付きの即時関数
    (async () => {
      const dataset = this.state.dataset;

      // Fetch questions dataset from Firestore
      await db.collection('questions').get().then(snapshots => {
        snapshots.forEach(doc => {
          dataset[doc.id] = doc.data();
        });
      });
      this.initDataset(dataset);
      const initAnswer = "";
      this.selectAnswer(initAnswer, this.state.currentId);
    })();
  }

  // 最新のチャットが見えるように、スクロール位置の頂点をスクロール領域の最下部に設定する
  componentDidUpdate(prevProps, prevState, snapshot) {
    const scrollArea = document.getElementById('scroll-area');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }

  render() {
    return(
      <section className="c-section">
        <div className="c-box">
          <Chats chats={this.state.chats} />
          <AnswersList answers={this.state.answers} select={this.selectAnswer} />
          <FormDialog open={this.state.open} handleClose={this.handleClose} />
        </div>
      </section>
    );
  }
}

export default App;
