import {
  PROVIDER_RESPONSE_SUCCESS,
  AMBI_RESPONSE_SUCCESS,
} from '../actions/types'

const INITIAL_STATE = {
  providerResponse: null,
  ambiResponse: null,
  leaderboard: [],
}

const addToLeaderboard = (state, action) => {
  const { firstName, lastName, score } = action.payload
  const sortedLeaderboard = state.leaderboard
  sortedLeaderboard.push({ firstName, lastName, score })
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
    leaderboard: sortedLeaderboard,
    providerResponse: { updateTime: new Date() },
  }
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PROVIDER_RESPONSE_SUCCESS:
      return addToLeaderboard(state, action)
    case AMBI_RESPONSE_SUCCESS:
      return { ...state, ambiResponse: action.payload }
    default:
      return state
  }
}
