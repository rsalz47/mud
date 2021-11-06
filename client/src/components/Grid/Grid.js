import { useEffect, useState } from 'react';

const ROOM_SIZE = 17;
const [rows, cols] = [30, 60]

const Styles = {
  gridRow: {
    display: 'flex',
    width: '100%'
  },
}

const generateBlankGrid = () => {
  let arr = [];
  for (let i = 0; i < rows; i++) {
    let currRow = []
    for (let j = 0; j < cols; j++) {
      currRow.push({
        x: j, y: i, paintingSrc: ""
      });
    }
    arr.push(currRow);
  }
  return arr
}

const createGrid = (paintings) => {
  const grid = generateBlankGrid();
  paintings.forEach(({x, y, paintingSrc}) => {
    grid[x][y] = {
      x: x,
      y: y,
      paintingSrc: paintingSrc
    }
  })
  return grid;
}

const GridMapper = ({grid, clickHandler}) => {
  return grid.map((currRow, row_index) => (
   <div key={row_index} style={{...Styles.gridRow}} className="gridRow">
     {currRow.map((currSqr, sqr_index) => (
       <GridSquare key={sqr_index} currSqr={currSqr} sqr_index={sqr_index}
       clickHandler={clickHandler}/>
     ))}
   </div> 
  ))
}

const GridSquare = ({sqr_index, currSqr, clickHandler}) => {
  // const [showHover, setShowHover] = useState(false)
  const [ conditionalColor, setConditionalColor ] = useState('transparent')
  const switchHoverState = (color) => {
    setConditionalColor(color)
  }
  const gridSquareStyles =  {
    width: `${ROOM_SIZE}px`,
    height: `${ROOM_SIZE}px`,
    cursor: "pointer",
    border: '0.01rem solid #373d47',
    backgroundColor: conditionalColor,
    transition: '0.1s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  const imgStyles = {
    // maxHeight: '80%',
    // maxWidth: '60%',
    height: '90%'
  }


  return (
    <div 
      onMouseEnter={() => switchHoverState('grey')} 
      onMouseLeave={() => switchHoverState('transparent')} 
      onClick={() => clickHandler(currSqr.x, currSqr.y, currSqr.paintingSrc, true)}
      style={{...gridSquareStyles}} 
    >
      <img key={sqr_index} style={{...imgStyles}} src={currSqr.paintingSrc} alt="" />
    </div>
  )
}

function Grid({paintings, clickHandler}) {
  const [gridData, setGridData] = useState({
    loading: true,
    grid: []
  })

  useEffect(() => {
    setGridData(
      {
        loading: false,
        grid: createGrid(paintings)
      }
    )
  }, [paintings])

  return (
    <div className="grid">
      <GridMapper clickHandler={clickHandler} grid={gridData.grid}/>
    </div>
  );
}

export default Grid;