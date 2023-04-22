import { useDispatch, useSelector } from 'react-redux'
import { Notify,Button } from '../../compotents'
import { add, pus, del } from '../../store/reducer/test'
import { asyncSub } from '../../store/reducer/test/asyncAction'
const Index = () => {
  //dispatch转发载荷信息给reducer修改
  const dispatch = useDispatch()
  //获取redux中的状态
  const { count, list } = useSelector(state => state.test)
  const test = () => {
    Notify({message:'这是一条提示消息'})
  }
  return (
    <div className="app">
      <span>{count}</span>
      {
        list.map((item, index) => (
          <i key={index} onClick={() => { dispatch(del(index)) }}>{item}</i>
        ))
      }
      <button onClick={() => { dispatch(add()) }}>add</button>
      <button onClick={() => { dispatch(asyncSub({ name: '123', user: 'warm' })) }}>延迟，模拟网络请求</button>
      <button onClick={() => { dispatch(pus()) }}>新增</button>
      <button onClick={() => { Notify({type:'success',message:'成功提示'}) }} width={200}>成功提示</button>
      <Button center danger onClick={() => { Notify({type:'error',message:'这是一条失败的提示消息'}) }} width={200}>失败提示</Button>
      <Button center warning onClick={() => { Notify({type:'warning',message:'这是一条警告的提示消息'}) }} width={200}>警告提示</Button>
      <Button center onClick={test} style={{width:'200px'}}>消息提示</Button>
    </div>
  );
}

export default Index