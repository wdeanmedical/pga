import * as Constants from '../constants/constants'
import {
  PROVIDER_RESPONSE_SUCCESS,
  AMBI_RESPONSE_SUCCESS,
  DELETE_PLAYER_SUCCESS,
  UPDATE_PLAYER_SUCCESS,
} from '../actions/types'

const INITIAL_STATE = {
  providerResponse: null,
  ambiResponse: {},
  leaderboard: [],
  sequenceNumber: 1,
  formMode: Constants.ADD,
}

const addToLeaderboard = (state, action) => {
  const { firstName, lastName, score } = action.payload
  const { leaderboard, sequenceNumber } = state
  const sortedLeaderboard = leaderboard
  sortedLeaderboard.push({ id: sequenceNumber, firstName, lastName, score })
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
  sortedLeaderboard.sort(scoreComparison)
  console.log('sortedLeaderboard', sortedLeaderboard)
  return {
    ...state,
    sequenceNumber: sequenceNumber + 1,
    leaderboard: sortedLeaderboard,
    providerResponse: { updateTime: new Date() },
  }
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_PLAYER_SUCCESS:
      return state
    case DELETE_PLAYER_SUCCESS:
      return state
    case PROVIDER_RESPONSE_SUCCESS:
      return addToLeaderboard(state, action)
    case AMBI_RESPONSE_SUCCESS:
      console.log('action payload', action.payload)
      return {
        ...state,
        ambiResponse: action.payload,
        formMode: Constants.EDIT,
      }
    default:
      return state
  }
}
