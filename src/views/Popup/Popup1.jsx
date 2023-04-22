import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { handlerChangePop } from '../../store/reducer/home'
import XFS from '../../assets/icons/logo.svg'
import LINK from '../../assets/icons/LINK.svg'
import { ModalMask } from '../../compotents'
import './popup1.css'
const Popup1 = props => {
    //dispatch转发载荷信息给reducer修改
    const dispatch = useDispatch()
    const [search,setSearch] = useState('')
    const [chainList, setChainList] = useState([
        {
            imgUrl: 'https://chainhop.s3.us-west-2.amazonaws.com/icons/ETH.png',
            cname: 'Ethereum',
            isActive: false,
            cid: 1
        },
        {
            imgUrl: LINK,
            cname: 'TronLick',
            isActive: false,
            cid: 2
        },
        {
            imgUrl: XFS,
            cname: 'XFS',
            isActive: false,
            cid: 3
        }
    ])
    const [pop1Focus, setPop1Focus] = useState('0');
    document.addEventListener('click', (e) => {
        e.target !== document.querySelector('.pop1') && e.target !== document.querySelector('.input_search') && setPop1Focus('0');
    },false)
    const goChange = obj => {
        dispatch(handlerChangePop(props.isShow))
        if (obj.cid === 3 && sessionStorage.getItem('addr') === null) {
            //让用户登录
            props.openPullDown('login');
            return;
        }
        if (obj.cname === 'Ethereum') goMatemask();
        if (obj.cname === 'TronLick') goTornLick();
        props.changeTitle(obj, props.isShow);
        props.changePull();
    }
    //监听钱包切换
    ethereum.on("accountsChanged", function (accounts) {
        console.log('钱包切换')
        goMatemask();
    });
    //监听链网络改变
    ethereum.on("chainChanged", () => {
        console.log('链切换')
        goMatemask();
    });
    //调用matemask钱包
    const goMatemask = async () => {
        // window.ethereum.enable()
        if (typeof window.ethereum !== 'undefined') {
            let addr = await ethereum.request({ method: 'eth_requestAccounts' });
            props.changePull({ cid: 1, addr: addr[0] })
        } else {
            console.log('未安装钱包插件！');
        }
    }
    //调用波场的钱包
    const goTornLick = async () => {
        const test = await window.tronLink.request({ method: 'tron_requestAccounts' })
        const addr = window.tronWeb.defaultAddress.base58
        props.changePull({ cid: 2, addr: addr })
    }
    return (
        // <!-- one -->
        <div className={`xfs-modal-show ${props.isShow === 'popup1to' || props.isShow === 'popup1from' ? ' d-block' : ' d-none'}`}>
            <ModalMask changePull={props.changePull} title="TITLE">
                <div className="chainModal">
                        <div className={`xfs-input-affix-wrapper  searchinput pop1 ${pop1Focus === '1' ? ' load-search-focus' : ' '}`} onClick={e =>setPop1Focus('1')}>
                             <input className="input_search" placeholder="Search chain by name or chain ID" type="text" value={search} onChange={e=>setSearch(e.target.value)} /> 
                        </div>
                    <div className="chainModalContent">
                        {
                            chainList.map(item => (
                                <div style={{ width: '100%', maxWidth: '100%', marginBottom: '5px' }} onClick={() => goChange(item)} key={item.cname}>
                                    <div className={`activeItem ${props.isDot === item.cname ? ' is-active-item' : ' '}`}>
                                        <div className="litem">
                                            <div className="itemLeft">
                                                <img src={item.imgUrl}
                                                    alt="" />
                                                <div style={{ marginLeft: '24px' }}>
                                                    <div className="tokenName">{item.cname}</div>
                                                </div>
                                            </div>
                                            <div className="itemRight">
                                                <div className={`${props.isDot === item.cname ? ' dot' : ' '}`}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </ModalMask>
        </div>
    )
}

export default Popup1