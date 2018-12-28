import React, { Component } from 'react'
import styles from '../css/App/App.css'
import PlayerForm from '../forms/PlayerForm'
import LeaderboardForm from '../forms/LeaderboardForm'

class App extends Component {
  componentWillMount() {}

  render() {
    return (
      <div className={styles.root}>
        <PlayerForm />
        <div className={styles.screenDivider} />
        <LeaderboardForm />
      </div>
    )
  }
}

export default App
