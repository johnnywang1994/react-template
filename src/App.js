import React, { Component } from 'react';
import '@/index.sass';

// Components
import Hello from '@/components/Hello';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Hello />
      </div>
    );
  }
}


export default App;
