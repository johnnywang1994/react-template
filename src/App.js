import React, { useState } from 'react'
import { connect } from 'react-redux'

import SwitchApp from '@/views/SwitchApp'

let mapStateToProps = state => {
  return {
    subPageOpen: state.subPageOpen
  }
}


function App({ subPageOpen }) {
  return <SwitchApp showSub={subPageOpen} />;
}

export default connect(
  mapStateToProps
)(App);
