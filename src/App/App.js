import React, { Component } from 'react'
import styles from '../css/App/App.css'
import ProviderForm from '../forms/ProviderForm'
import ProviderResponseForm from '../forms/ProviderResponseForm'

class App extends Component {
  componentWillMount() {}

  render() {
    return (
      <div className={styles.root}>
        <ProviderForm />
        <div className={styles.screenDivider} />
        <ProviderResponseForm />
      </div>
    )
  }
}

export default App
