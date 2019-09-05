import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { stateStore } from './store'
import App from './App'
import './index.sass'


render(
  <Provider store={stateStore}>
    <App />
  </Provider>
, document.getElementById('app'));
