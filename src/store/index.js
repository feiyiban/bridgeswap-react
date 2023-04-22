/**
 * 创建store
 */
import { configureStore } from "@reduxjs/toolkit";
import test from './reducer/test'
import home from "./reducer/home";
export default configureStore({
    reducer: {
        test,
        home
    }
})