import logo from './logo.svg';
import './App.css';
import defaultDataset from './dataset';

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
