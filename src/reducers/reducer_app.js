import * as Constants from '../constants/constants'
import {
  ADD_PLAYER_SUCCESS,
  DELETE_PLAYER_SUCCESS,
  EDIT_PLAYER_SUCCESS,
  CANCEL_EDIT_PLAYER_SUCCESS,
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
  const { firstName, lastName, score } = action.payload
  const { leaderboard, sequenceNumber } = state
  const sortedLeaderboard = leaderboard
  sortedLeaderboard.push({ id: sequenceNumber, firstName, lastName, score })
  sortedLeaderboard.sort(scoreComparison)
  return {
    ...state,
    sequenceNumber: sequenceNumber + 1,
    leaderboard: sortedLeaderboard,
    updateTime: { updateTime: new Date() },
  }
}

const updateLeaderboard = (state, action) => {
  const { firstName, lastName, score, id } = action.payload
  const { leaderboard } = state
  const updatedLeaderboard = leaderboard

  updatedLeaderboard.find((o, i) => {
    if (o.id === id) {
      updatedLeaderboard[i] = { id, firstName, lastName, score }
    }
  })
  updatedLeaderboard.sort(scoreComparison)

  return {
    ...state,
    formMode: Constants.ADD,
    leaderboard: updatedLeaderboard,
    updateTime: { updateTime: new Date() },
  }
}

const deleteFromLeaderboard = (state, action) => {
  const id = action.payload
  const { leaderboard } = state
  const updatedLeaderboard = leaderboard
  updatedLeaderboard.find((o, i) => {
    if (o && o.id === id) {
      updatedLeaderboard.splice(i, 1)
    }
  })

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
      return deleteFromLeaderboard(state, action)
    case ADD_PLAYER_SUCCESS:
      return addToLeaderboard(state, action)
    case EDIT_PLAYER_SUCCESS:
      return {
        ...state,
        player: action.payload,
        formMode: Constants.EDIT,
      }
    case CANCEL_EDIT_PLAYER_SUCCESS:
      return { ...state, formMode: Constants.ADD }
    default:
      return state
  }
}
