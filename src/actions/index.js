import {
  ADD_PLAYER_SUCCESS,
  DELETE_PLAYER_SUCCESS,
  EDIT_PLAYER_SUCCESS,
  UPDATE_PLAYER_SUCCESS,
} from './types'

export function addPlayer(newPlayer) {
  console.log(`action  addPlayer(${JSON.stringify(newPlayer)})`)
  return {
    type: ADD_PLAYER_SUCCESS,
    payload: newPlayer,
  }
}

export function editPlayer(player) {
  console.log(`action  editPlayer(${JSON.stringify(player)})`)
  return {
    type: EDIT_PLAYER_SUCCESS,
    payload: player,
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
