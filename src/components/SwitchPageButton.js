import React from 'react'
import { boundSwitchPage } from '@/store'

function SwitchPageButton({ children }) {
  return <button onClick={boundSwitchPage}>{ children }</button>;
}

export default SwitchPageButton;
