import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Grid from './components/Grid/Grid'

const getAVI = (x, y) => `https://avatars.dicebear.com/api/bottts/${x}:${y}.svg`
const MOCK_PAINTINGS = [
  {
    x: 1, y: 2, paintingSrc: getAVI(1,2)
  },
  {
    x: 10, y: 30, paintingSrc: getAVI(10,30)
  },
  {
    x: 29, y: 20, paintingSrc: getAVI(29,20)
  },
  {
    x: 27, y: 21, paintingSrc: getAVI(27,21)
  },
  {
    x: 12, y: 24, paintingSrc: getAVI(12,24)
  },
]

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

        <p>Welcome to the Museum of User Design</p>

        <Grid paintings={MOCK_PAINTINGS} />

        {/* <textarea id="searchfield" name="searchfield" rows="1" columns="3"> */}
          {/* x,y */}
        {/* </textarea> */}
        <button type="button">Visit room (x,y)</button>
        {data}
      </header>
    </div>
  );
}

export default App;