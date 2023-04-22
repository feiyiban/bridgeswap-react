import { syncsub } from ".";


//定义异步action
export const asyncSub = obj => {
    return async (dispatch, getState) => {
        console.log('先调用');
        //模拟网络延迟
        setTimeout(() => {
            console.log('先调用');
            dispatch(syncsub(obj))
        }, 2000);
    }
}