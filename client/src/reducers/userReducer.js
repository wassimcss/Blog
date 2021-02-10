import { GET_ONE_USER } from "../actions/Types"

const initialState = {
    user:{}
}

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case GET_ONE_USER:
        return { ...state, user:payload }

    default:
        return state
    }
}
export default userReducer
