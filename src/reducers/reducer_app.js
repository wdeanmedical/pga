import {
  PROVIDER_RESPONSE_SUCCESS,
  AMBI_RESPONSE_SUCCESS,
} from '../actions/types'

const INITIAL_STATE = {
  providerResponse: null,
  ambiResponse: null,
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PROVIDER_RESPONSE_SUCCESS:
      return { ...state, providerResponse: action.payload }
    case AMBI_RESPONSE_SUCCESS:
      return { ...state, ambiResponse: action.payload }
    default:
      return state
  }
}
