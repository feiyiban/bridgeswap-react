import { memo } from 'react'
import './notify.css'
const Message = props => {
    const { _dom: newDiv, type } = props;
    const Svgicon = () => {
        switch (type) {
            case 'success': return (<svg t="1658369389909" className="icon-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1053" width="200" height="200"><path d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#07C160" p-id="1054"></path><path d="M466.7 679.8c-8.5 0-16.6-3.4-22.6-9.4l-181-181.1c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l158.4 158.5 249-249c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L489.3 670.4c-6 6-14.1 9.4-22.6 9.4z" fill="#FFFFFF" p-id="1055"></path></svg>);
            case 'error': return (<svg t="1658369356687" className="icon-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="905" width="200" height="200"><path d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#FA5151" p-id="906"></path><path d="M557.3 512l113.1-113.1c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L512 466.7 398.9 353.6c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L466.7 512 353.6 625.1c-12.5 12.5-12.5 32.8 0 45.3 6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4L512 557.3l113.1 113.1c6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4c12.5-12.5 12.5-32.8 0-45.3L557.3 512z" fill="#FFFFFF" p-id="907"></path></svg>);
            case 'warning': return (<svg t="1658369399419" className="icon-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1201" width="200" height="200"><path d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#FFC300" p-id="1202"></path><path d="M512 620c-17.7 0-32-14.3-32-32V300c0-17.7 14.3-32 32-32s32 14.3 32 32v288c0 17.7-14.3 32-32 32z" fill="#FFFFFF" p-id="1203"></path><path d="M512 718m-38 0a38 38 0 1 0 76 0 38 38 0 1 0-76 0Z" fill="#FFFFFF" p-id="1204"></path></svg>);
            default: return (<svg t="1658369420901" className="icon-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1350" width="200" height="200"><path d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#10AEFF" p-id="1351"></path><path d="M610.2 324c22.6 20.5 33.8 49 33.8 85.2 0 26.6-7.5 50.2-22.4 70.7-5.6 6.9-22.2 22.4-49.6 46.5-12.5 10.5-21.8 21.4-27.8 32.6-7.7 12.9-11.5 27.8-11.5 44.7v13.9h-49v-13.9c0-20.1 3.8-37.7 11.5-52.6 7.3-17.3 27.6-40.7 61-70.1 8.1-8.1 14.9-15.3 20.5-21.8 11.7-15.3 17.5-31.2 17.5-47.7 0-24.2-6.6-42.9-19.9-56.2-14.1-14.1-34.1-21.2-59.8-21.2-29.8 0-52.2 9.9-67.1 29.6-12.9 17.3-19.3 40.5-19.3 69.5h-48.4c0-41.9 11.9-75.7 35.7-101.5 25-26.6 58.8-39.9 101.5-39.9 39.7 0.2 70.7 10.9 93.3 32.2z m-75.5 346.4c6.8 6.9 10.3 15.3 10.3 25.4 0 10.5-3.4 19.1-10.3 26-7.7 6.9-16.3 10.3-26 10.3-10.5 0-19.1-3.4-26-10.3-7.3-7.3-10.9-15.9-10.9-26 0-10.5 3.6-18.9 10.9-25.4 6.4-6.8 15.1-10.3 26-10.3 10.4 0 19.1 3.4 26 10.3z" fill="#FFFFFF" p-id="1352"></path></svg>)
        }
    }
    //消息类型
    switch (type) {
        case 'success': newDiv.classList.add('notify', 'notify-success'); break;
        case 'error': newDiv.classList.add('notify', 'notify-danger'); break;
        case 'warning': newDiv.classList.add('notify', 'notify-warning'); break;
        default: newDiv.classList.add('notify', 'notify-info');
    }

    return (
        <>
            <Svgicon />
            <span style={{ marginLeft: '10px' }}>
                {props.message}
            </span>
        </>
    )
}

export default memo(Message)