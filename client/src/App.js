import logo from './logo.svg';
import Menu from "./Menu/Menu";
import Page from "./Page/Page"
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
            <div className="col">
                <Menu/>
            </div>
            <div className="col">
                <Content/>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
