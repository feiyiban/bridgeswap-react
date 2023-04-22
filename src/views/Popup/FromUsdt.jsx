import React, { memo } from 'react'
import withUsdt from '../../hoc/withUsdt';
import { ModalMask } from '../../compotents';
const FromUsdt = props => {
    let ustd = [
        {
            uname: '',
            bridge: '',
            erc20: ''
        }
    ]
    if (props.from?.cname === 'Ethereum') {
        ustd = props?.usdt1
    }
    if (props.from?.cname === 'TronLick') {
        ustd = props?.usdt2
    }
    if (props.from?.cname === 'XFS') {
        ustd = props?.usdt_xfs
    }
    const goChange = obj => {
        props.getUsdt(obj)
        props.changePull()
    }
    return (
        //<!-- three --> 
        <div className={`xfs-modal-show ${props.isShow === 'popup3' ? ' d-block' : ' d-none'}`}>
            <ModalMask changePull={props.changePull}>
                <div className="chainModal">
                    <div style={{ padding: '0 10px' }}>
                        <span className="xfs-input-affix-wrapper searchinput">
                            {/* <!-- <input className="xfs-input" placeholder="Search chain by name or chain ID" type="text" value=""> --> */}
                        </span>
                    </div>
                    {/* <div className="tags" style={{padding:'0 10px'}}>
                                    <div className="tagitem">
                                        <img src="https://tokens.pancakeswap.finance/images/0x00e1656e45f18ec6747F5a8496Fd39B50b38396D.png"
                                            alt="" style={{width: '20px',height: '20px'}} />
                                        <span style={{fontWeight: 500}}>标签</span>
                                    </div>
                                   
                                </div> */}
                    <div className="chainModalContent myscroll">
                        {
                            ustd.map(item => (
                                <div style={{ width: '100%', maxWidth: '100%', marginBottom: '5px' }} key={item.uname} onClick={() => goChange(item)}>
                                    <div className="activeItem">
                                        <div className="litem">
                                            <div className="itemLeft">
                                                <img src={item.imgurl}
                                                    alt="" />
                                                <div style={{ marginLeft: '24px' }}>
                                                    <div className="tokenName">{item.uname}</div>
                                                </div>
                                            </div>
                                            <div className="itemRight">
                                                <div className="dot"></div>
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


export default withUsdt(memo(FromUsdt))