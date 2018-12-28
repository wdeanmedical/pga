import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../actions'
import styles from '../css/forms/ProviderResponseForm.css'

class ProviderResponseForm extends Component {
  state = {}

  componentDidMount() {}

  render() {
    const { leaderboard } = this.props
    return (
      <div className={styles.root}>
        <div className={styles.title}>leaderboard</div>
        {leaderboard.length === 0 && (
          <div className={styles.subtitle}>currently empty...</div>
        )}
        {leaderboard.length > 0 && <div>{JSON.stringify(leaderboard)}</div>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { providerResponse, leaderboard } = state.app
  return { leaderboard, providerResponse }
}

ProviderResponseForm.propTypes = {
  leaderboard: PropTypes.arrayOf(PropTypes.object),
}

ProviderResponseForm.defaultProps = {
  leaderboard: [],
}

export default connect(
  mapStateToProps,
  actions
)(ProviderResponseForm)
