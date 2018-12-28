import * as Constants from '../constants/constants'
import {
  ADD_PLAYER_SUCCESS,
  DELETE_PLAYER_SUCCESS,
  EDIT_PLAYER_SUCCESS,
  UPDATE_PLAYER_SUCCESS,
} from '../actions/types'

const INITIAL_STATE = {
  updateTime: null,
  player: {},
  leaderboard: [],
  sequenceNumber: 1,
  formMode: Constants.ADD,
}

const scoreComparison = (a, b) => {
  if (a.score < b.score) {
    return -1
  }
  if (a.score > b.score) {
    return 1
  }
  if (a.score === b.score) {
    if (a.lastName < b.lastName) {
      return -1
    }
    if (a.lastName > b.lastName) {
      return 1
    }
  }
  return 0
}

const addToLeaderboard = (state, action) => {
  console.log(`reducer  addToLeaderboard() ${JSON.stringify(action.payload)})`)
  const { firstName, lastName, score } = action.payload
  const { leaderboard, sequenceNumber } = state
  const sortedLeaderboard = leaderboard
  sortedLeaderboard.push({ id: sequenceNumber, firstName, lastName, score })
  sortedLeaderboard.sort(scoreComparison)
  console.log('sortedLeaderboard', sortedLeaderboard)
  return {
    ...state,
    sequenceNumber: sequenceNumber + 1,
    leaderboard: sortedLeaderboard,
    updateTime: { updateTime: new Date() },
  }
}

const updateLeaderboard = (state, action) => {
  console.log(`reducer  updateLeaderboard() ${JSON.stringify(action.payload)})`)
  const { firstName, lastName, score, id } = action.payload
  const { leaderboard } = state
  const updatedLeaderboard = leaderboard
  updatedLeaderboard.find((o, i) => {
    if (o.id === id) {
      updatedLeaderboard[i] = { firstName, lastName, score }
    }
  })
  updatedLeaderboard.sort(scoreComparison)

  console.log('updatedLeaderboard', updatedLeaderboard)
  return {
    ...state,
    formMode: Constants.ADD,
    leaderboard: updatedLeaderboard,
    updateTime: { updateTime: new Date() },
  }
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_PLAYER_SUCCESS:
      return updateLeaderboard(state, action)
    case DELETE_PLAYER_SUCCESS:
      return state
    case ADD_PLAYER_SUCCESS:
      return addToLeaderboard(state, action)
    case EDIT_PLAYER_SUCCESS:
      console.log('action payload', action.payload)
      return {
        ...state,
        player: action.payload,
        formMode: Constants.EDIT,
      }
    default:
      return state
  }
}
