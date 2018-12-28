import {
  PROVIDER_RESPONSE_SUCCESS,
  AMBI_RESPONSE_SUCCESS,
  DELETE_PLAYER_SUCCESS,
  UPDATE_PLAYER_SUCCESS,
} from './types'

export function sendProviderResponse(response) {
  return {
    type: PROVIDER_RESPONSE_SUCCESS,
    payload: response,
  }
}

export function sendAmbiResponse(response) {
  return {
    type: AMBI_RESPONSE_SUCCESS,
    payload: response,
  }
}

export function updatePlayer(response) {
  return {
    type: UPDATE_PLAYER_SUCCESS,
    payload: response,
  }
}

export function deletePlayer(response) {
  return {
    type: DELETE_PLAYER_SUCCESS,
    payload: response,
  }
}
