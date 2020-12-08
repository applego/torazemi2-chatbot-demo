import logo from './logo.svg';
import defaultDataset from './dataset';
import './assets/styles/style.css';

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

  render() {
    this.return(
      <div>

      </div>
    );
  }
}

export default App;
