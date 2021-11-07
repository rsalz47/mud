import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Grid from './components/Grid/Grid'
import CanvasModal from "./components/CanvasModal";

const getAVI = (x, y) => `https://avatars.dicebear.com/api/bottts/${x}:${y}.svg`
const MOCK_PAINTINGS = [
  {
    x: 1, y: 2, paintingSrc: getAVI(1,2), name: "Testing"
  },
  {
    x: 10, y: 30, paintingSrc: getAVI(10,30), name: "HAHA"
  },
  {
    x: 29, y: 20, paintingSrc: getAVI(29,20), name: "HELLO"
  },
  {
    x: 27, y: 21, paintingSrc: getAVI(27,21), name: "hi"
  },
  {
    x: 12, y: 24, paintingSrc: getAVI(12,24), name: "yo yo"
  },
]

function App() {

  //I do not know what this code does, plz explain Jack
  //Some guy came and slapped this shit down, and now it just works
  const [showingModal, setShowingModal] = useState({
    show: false,
    coords: [null, null],
    imgSource: "",
    name: ""
  });

  const clickHandler = (x, y, img, show, name) => {
    setShowingModal({show: show, coords: [x,y], imgSource: img, name: name})
  }

  
  return (
    <div className="App">
      <header className="App-header">

        <p>Welcome to the Museum of User Design</p>

        <Grid clickHandler={clickHandler} paintings={MOCK_PAINTINGS} />
        <CanvasModal 
          showingModal={showingModal}
          clickHandler={clickHandler}
          open={showingModal.show}
          x={showingModal.coords[0]}
          y={showingModal.coords[1]}
          imgSource={showingModal.imgSource}
          name={showingModal.name}
        />
      </header>
    </div>
  );
}

export default App;