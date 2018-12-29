import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from '../css/forms/LeaderboardForm.css'
import * as Constants from '../constants/constants'
import * as actions from '../actions'

class LeaderboardForm extends Component {
  state = { selectedPlayerId: null }

  componentDidMount() {}

  handleRowClick = row => {
    const { editPlayer } = this.props
    this.setState({ selectedPlayerId: row.id })
    editPlayer(row)
  }

  render() {
    const { leaderboard, formMode } = this.props
    const { selectedPlayerId } = this.state
    return (
      <div className={styles.root}>
        <div className={styles.title}>leaderboard</div>
        {leaderboard.length === 0 && (
          <div className={styles.subtitle}>currently empty...</div>
        )}
        {leaderboard.length > 0 && (
          <div>
            <div className={styles.subtitle}>
              select a row to edit or delete
            </div>
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
                    <td
                      style={
                        formMode === Constants.EDIT &&
                        row.id === selectedPlayerId
                          ? {
                              backgroundColor: '#f6f8fa',
                              borderColor: '#f6f8fa',
                            }
                          : {}
                      }
                    >
                      {row.lastName}, {row.firstName}
                    </td>
                    <td
                      style={
                        formMode === Constants.EDIT &&
                        row.id === selectedPlayerId
                          ? {
                              backgroundColor: '#f6f8fa',
                              borderColor: '#f6f8fa',
                            }
                          : {}
                      }
                    >
                      {row.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { updateTime, leaderboard, formMode } = state.app
  return { leaderboard, updateTime, formMode }
}

LeaderboardForm.propTypes = {
  formMode: PropTypes.string,
  leaderboard: PropTypes.arrayOf(PropTypes.object),
  editPlayer: PropTypes.func,
}

LeaderboardForm.defaultProps = {
  formMode: Constants.ADD,
  leaderboard: [],
  editPlayer: undefined,
}

export default connect(
  mapStateToProps,
  actions
)(LeaderboardForm)
