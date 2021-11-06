import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <p>
          Welcome to the Museum of User Design
        </p>

        <textarea id="searchfield" name="searchfield" rows="1" columns="3">
          x,y
        </textarea>
        <p></p>
        <button type="button">
          Visit room (x,y)
        </button>
      
      </header>
    </div>
  );
}

export default App;
