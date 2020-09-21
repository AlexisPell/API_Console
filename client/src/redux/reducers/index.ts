import { combineReducers } from 'redux'
import auth from './auth'
import console from './console'

const rootReducer = combineReducers({ auth, console })

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
