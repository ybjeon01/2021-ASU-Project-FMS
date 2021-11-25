import React, {forwardRef} from 'react'

import './game.css'

function Game(props, ref) {
  return (
    <iframe
      title="game"
      src="../Game_2_internal"
      className="game"
      ref={ref}
    />
  )
}

export default forwardRef(Game);
