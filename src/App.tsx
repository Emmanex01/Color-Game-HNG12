import { useState } from 'react'
import './App.css'

function App() {
  const [status, setStatus] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [targetColorHiddden, setTargetColorHiddden] = useState<boolean>(true);
  const [targetColor, setTargetColor] = useState('');
  const [colors, setColors] = useState<string[]>([])


  // A function that generate random RBG color
  const randomColorGenerator = () => {
    const r = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)

    return `rgb(${r}, ${b}, ${g})`;
  }

  // initialize the game at start
  const newGame = () => {
    // target color
    const newTargetColor = randomColorGenerator();
    setTargetColor(newTargetColor);

    // Create an Array of colors which will include both targetcolor and 5 incorrect colors
    const newArr: string[] = [newTargetColor];
    for(let i = 0; i < 5; i++) {
      const color = randomColorGenerator()
      newArr.push(color)
    }
    setColors(
      newArr
    )
    setTargetColorHiddden(true)

  }
    
  

  // target color

  console.log(targetColor)

  
  

  // reshuffle the options
  colors.sort(() => {
    return Math.random() - 0.5
  })
  console.log(colors)

  // Checks for the correct answer
  const handleClick = (selectedColor:string) => {
    if(selectedColor === targetColor ) {
      setStatus("You are correct!");
      setScore( prev => prev + 1);
    } else {
      setStatus("You are Wrong")
    }
    setTargetColorHiddden(false)
  }

  return (
    <div className='mainContainer'>
      <div 
        data-testid="colorBox" 
        id="colorBox"
        style={{backgroundColor: targetColor, filter: targetColorHiddden ? "blur(16px)" : 'blur(0)'}}
      >

      </div>
      <p data-testid="gameInstructions" id='gameInstructions' >Guess the correct color!</p>
      <div id="colorOptionsContainer">
      {colors.map((color, index) => (
        <div 
          key={index}
          style={{
            backgroundColor: color,
            width: '200px',
            height: '50px', 
            borderRadius: '20px', 
            display: "flex",
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer', 
            flexWrap: 'wrap'
          }}
          onClick={() => handleClick(color)}
        >
          {index}
        </div>  
       
      ))}
      </div>
      <div 
        data-testid="gameStatus" 
        id="gameStatus"
      >
        {status}
      </div>
      <div data-testid="score" id='score'>
        Score: 
        <span id="scoreValue">
          {score}
        </span>
      </div>
      <div className='newGameButtonContainer'>
        <button 
          data-testid="newGameButton" 
          id="newGameButton"
          onClick={() => newGame()}
        >
            New Game
        </button>
      </div>
    </div>
  )
}

export default App
