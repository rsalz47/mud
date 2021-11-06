import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
function App() {

  //I do not know what this code does, plz explain Jack
  //Some guy came and slapped this shit down, and now it just works
  const [data, setData] = useState(null);
  useEffect(() => {
    //this port will be changed to wherever the VPS is hosted
    fetch("http://localhost:3001")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  //return val is just the HTML/CSS of the webpage itself
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>Welcome to the Museum of User Design</p>

        <textarea id="searchfield" name="searchfield" rows="1" columns="3">
          x,y
        </textarea>
        <p></p>
        <button type="button">Visit room (x,y)</button>
        {data}
      </header>
    </div>
  );
}

export default App;
