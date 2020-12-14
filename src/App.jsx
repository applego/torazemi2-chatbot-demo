import React from 'react';
import logo from './logo.svg';
import defaultDataset from './dataset';
import './assets/styles/style.css';
import { AnswersList, Chats } from './components/index';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",
      dataset: defaultDataset,
      open: false
    }
    this.selectAnswer = this.selectAnswer.bind(this);
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
        this.displayNextQuestion(nextQuestionId);
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

        this.displayNextQuestion(nextQuestionId);
        break;
    }
  }

  // コンポーネントが初期化して最初のrender後に何かしら副作用のある処理をしたい時
  componentDidMount() {
    const initAnswer = "";
    this.selectAnswer(initAnswer, 'init');
  }

  render() {
    return(
      <section className="c-section">
        <div className="c-box">
          <Chats chats={this.state.chats} />
          <AnswersList answers={this.state.answers} select={this.selectAnswer} />
        </div>
      </section>
    );
  }
}

export default App;
