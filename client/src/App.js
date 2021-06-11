import logo from './logo.svg';
import Menu from "./Menu/Menu";
import Page from "./Page/Page"
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Menu/>
        <Page/>
      </div>
    </div>
  );
}

export default App;
