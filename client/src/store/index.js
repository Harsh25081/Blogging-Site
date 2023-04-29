import {createStore , combineReducers} from "redux"
import { signupReducer } from "./reducers/SignupReducer"
import { loginReducer } from "./reducers/LoginReducer"
import { AllBlogsReducer } from "./reducers/AllBlogsReducer"
import { CreateBlogReducer } from "./reducers/CreateBlogReducer"

const combinedReducer = combineReducers({
    signup : signupReducer,
    login : loginReducer,
    allblogs : AllBlogsReducer,
    createblog : CreateBlogReducer
})


export const store = createStore(
    combinedReducer
)