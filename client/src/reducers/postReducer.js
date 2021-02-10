import { ADD_POST, FOLLOWED_POST, GET_POSTS, MY_POSTS } from "../actions/Types"

const initialState = {
    posts:[],
    my_posts:[],
    followed_posts:[],
    isLoading:null
}

const postReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case  GET_POSTS:
        return { ...state,posts:payload,isLoading:false }
    case ADD_POST:
        return { ...state,posts:[...state.posts,payload],isLoading:false}
    case MY_POSTS:
        return { ...state,my_posts:payload,isLoading:false}
    case FOLLOWED_POST:
        return { ...state,folllowed_posts:payload,isLoading:false}

    default:
        return state
    }
}
export default postReducer