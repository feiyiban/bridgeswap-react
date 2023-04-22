import { createSlice } from "@reduxjs/toolkit";

const home = createSlice({
    name: 'home',
    //初始化状态
    initialState: {
        active_pop:' '
    },
    //序列化数据监测开关，关闭
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    //定义reducer更新状态函数，组件中dispatch使用的action函数
    reducers: {
        handlerChangePop(state, action) {
            state.active_pop = action.payload
        },
    },

})

//导出Action函数
export const { handlerChangePop } = home.actions

//导出reducer，创建store
export default home.reducer