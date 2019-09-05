import React from 'react'
import Main from '@/views/Main'
import SubPage from '@/views/SubPage'

const SwitchApp = ({ showSub }) => {
  return showSub ? <SubPage /> : <Main />;
}

export default SwitchApp;
