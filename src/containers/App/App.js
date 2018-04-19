import React, { Component } from 'react';
import styles from './App.scss';
import Dugme from '../Dugme/Dugme';

class App extends Component {

    render() {
      return (
        <div className={styles.app}>
          <Dugme />
        </div>
      );
    }
}

export default App;
