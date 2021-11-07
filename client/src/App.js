import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Grid from './components/Grid/Grid'
import CanvasModal from "./components/CanvasModal";
import { Input, FormControl, FormLabel, Text, Button} from "@chakra-ui/react"

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
  const [paintings, setPaintings] = useState([])
  const [loading, setLoading] = useState(true)
  const [showingModal, setShowingModal] = useState({
    show: false,
    coords: [null, null],
    imgSource: "",
    name: ""
  });
  
  const clickHandler = (x, y, img, show, name) => {
    setShowingModal({show: show, coords: [x,y], imgSource: img, name: name})
  }

  const reloadPaintings = () => {
    // fetch('http://localhost:3001/getImages').then(res => res.json()).then(data => {
    //   setPaintings(data)
    // })
    window.location.reload();
  }

  useEffect(() => {
    fetch('http://localhost:3001/getImages').then(res => res.json()).then(data => {
      setPaintings(data)
      setLoading(false)
    })
  }, [])
  return (
    <div className="App">
      <header className="App-header">

        <Text mb="5" fontWeight="medium" >Welcome to the Museum of User Design</Text>

        {/* <FormControl w="lg" my="4" display="flex" alignItems="center" justifyContent="center"> */}
          {/* <FormLabel mx="2" fontWeight="light" m="0">Search: </FormLabel> */}
          {/* <Input onChange={e => setSearchState(e.target.value)} mx="2" variant="flushed" h="8" w="2xs" /> */}
          {/* <Button onClick={handleSearch} size="sm" mx="2">Search</Button> */}
        {/* </FormControl> */}
        {!loading && <Grid clickHandler={clickHandler} paintings={paintings} />}
        <CanvasModal 
          reloadPaintings={reloadPaintings}
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