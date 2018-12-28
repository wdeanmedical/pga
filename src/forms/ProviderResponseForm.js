import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from '../css/forms/ProviderResponseForm.css'
import * as actions from '../actions'

class ProviderResponseForm extends Component {
  state = {}

  componentDidMount() {}

  handleRowClick = row => {
    const { editPlayer } = this.props
    editPlayer(row)
  }

  render() {
    const { leaderboard } = this.props
    return (
      <div className={styles.root}>
        <div className={styles.title}>leaderboard</div>
        {leaderboard.length === 0 && (
          <div className={styles.subtitle}>currently empty...</div>
        )}
        {leaderboard.length > 0 && (
          <table>
            <thead>
              <tr>
                <th className={styles.th}>name</th>
                <th className={styles.th}>score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map(row => (
                <tr key={row.id} onClick={() => this.handleRowClick(row)}>
                  <td className={styles.name}>
                    {row.lastName}, {row.firstName}
                  </td>
                  <td className={styles.score}>{row.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { updateTime, leaderboard } = state.app
  return { leaderboard, updateTime }
}

ProviderResponseForm.propTypes = {
  leaderboard: PropTypes.arrayOf(PropTypes.object),
  editPlayer: PropTypes.func,
}

ProviderResponseForm.defaultProps = {
  leaderboard: [],
  editPlayer: undefined,
}

export default connect(
  mapStateToProps,
  actions
)(ProviderResponseForm)
