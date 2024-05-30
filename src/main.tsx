import React from 'react'
import ReactDOM from 'react-dom/client'
import ColorPicker from './ColorPicker'
import { Color } from './types/colorTypes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorPicker 
      numOfShades={5} 
      primaryColors={[new Color(255, 0, 0), new Color(0, 0, 255), new Color(255, 255, 0)]}
      secondaryColors={[new Color(0, 255, 0), new Color(255, 165, 0), new Color(255, 0, 255)]}/>
  </React.StrictMode>,
)
