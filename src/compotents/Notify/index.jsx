import ReactDOM from 'react-dom/client';
import Message from './Message';
const index = notify => {
    let newDiv = document.createElement("div");
    newDiv.innerText = notify.message;
    document.querySelector('.app').appendChild(newDiv);
    //把render中的组件渲染到newDiv这个div元素上
    const root = ReactDOM.createRoot(newDiv);
    root.render(
        <Message type={notify.type} message={notify.message} _dom={newDiv}/>
    );
    setTimeout(() => {
        document.querySelector('.notify').remove()
    }, 3000)
}


export default index