import React, {useState, useEffect, useRef} from 'react'

import {gsap} from 'gsap'

import './App.css'

import Game from './components/Game'

import tutorial_video from './static/tutorial-video.mp4'


function App() {
  let game = useRef();

  let [gameClicked, setGameClicked] = useState(false);

  useEffect(() => {
    if (gameClicked) {
      gsap.to(
        game.current,
        {
          y: '-50%',
          duration: 3,
          ease: 'elastic'
        }  
      );
    }
  }, [gameClicked]);


  return (
    <div className="App">
      <div className="left-side">
        <video className="tutorial-video" autoPlay muted>
          <source src={tutorial_video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="controllers">
          <button
            className="button game-button"
            onClick={() => setGameClicked(true)}  
          >
            Start Game
          </button>

          <button  className="button menu-button">Home</button>
        </div>
      </div>
      <div className="score-board">
        <h1 className="title">
          Highest Score Board
        </h1>
      </div>

      <Game ref={game} />
    </div>
  );
}

export default App;
