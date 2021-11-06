import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <textarea id="searchfield" name="searchfield" rows="1" columns="3">
          x,y
        </textarea>

        <button type="button">
          Visit room (x,y)
        </button>
      
      </header>
    </div>
  );
}

export default App;
