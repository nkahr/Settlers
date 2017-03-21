import React from 'react'
import {render} from 'react-dom'
import MainContainer from './containers/MainContainer'

window.onload = () => {
  render(
    <MainContainer/>,
    document.getElementById('app')
  )
}
