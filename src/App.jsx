import React from 'react';
import logo from './logo.svg';
import defaultDataset from './dataset';
import './assets/styles/style.css';
import { AnswersList } from './components/index';

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
  }

  initAnswer = () => {
    const initDataset = this.state.dataset[this.state.currentId]
    const initAnswers = initDataset.answers

    this.setState({
      answers:initAnswers
    })
  }

  // コンポーネントが初期化して最初のrender後に何かしら副作用のある処理をしたい時
  componentDidMount() {
    this.initAnswer()
  }

  render() {
    return(
      <section className="c-section">
        <div className="c-box">
          <AnswersList answers={this.state.answers} />
        </div>
      </section>
    );
  }
}

export default App;
