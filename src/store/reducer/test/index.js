import { createSlice } from "@reduxjs/toolkit";

const test = createSlice({
    //类似于命名空间，name值会作为action type的前缀
    name: 'test',
    //初始化状态
    initialState: {
        count: 0,
        list: []
    },
    //序列化数据监测开关，关闭
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    //定义reducer更新状态函数，组件中dispatch使用的action函数
    reducers: {
        add(state, action) {
            console.log(state, action);
            //内置immutable.js插件，像vue的proxy，数据劫持，小状态更改监听，不需要解构合并赋值
            state.count++
        },
        syncsub(state, action) {
            console.log('异步传递过来的值', action, action.payload);
            state.count--;
        },
        pus(state) {
            state.list.push(Math.floor(Math.random() * 100))
        },
        del(state, action) {
            console.log('删除传递过来的action', action);
            state.list.splice(action.payload, 1)
        }
    },

})

//导出Action函数
export const { add, syncsub, pus, del } = test.actions

//导出reducer，创建store
export default test.reducer