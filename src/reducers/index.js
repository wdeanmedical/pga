import { combineReducers } from 'redux'
import AppReducer from './reducer_app'

const rootReducer = combineReducers({
  app: AppReducer,
})

export default rootReducer
