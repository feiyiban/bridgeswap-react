import {useState} from 'react'
import { Button } from '../../compotents'
import pulldown from '../../assets/icons/PullDown.svg'
import REP from "../../assets/icons/REP.svg"
const HomeMain = props => {
  const [loadFocus, setLoadFocus] = useState('0');
  document.addEventListener('click', (e) => {
    e.target !== document.querySelector('input[type=number]') && e.target !== document.querySelector('.load-search') && setLoadFocus('0');
  })
  return (
    <div className="contanier">
      <div className="main-box">
        {/* TITLE-FROM*/}
        <div className="main-header">
          <img src="data:image/png;base64,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"
            alt="setting icon" className="open-select" style={{ width: '24px', height: '24px' }} onClick={e => props.openPullDown('load')} />
          {/* <!--load--> */}
          <div className="load" style={{ display: props.isShow === 'load' ? 'block' : 'none' }}>
            <div className="ratemodalwarp"></div>
            <div className="load-conten">
              <h4 style={{ marginRight: '20px', fontWeight: 600 }}>Slippage toLerarance</h4>
              <div className={`load-search${loadFocus === '1' ? ' load-search-focus' : ' '}`} onClick={e => setLoadFocus('1')}>
                <input type="number" min="1" max="100" defaultValue="3" style={{ height: '30px' }} /><span>%</span>
              </div>
            </div>
          </div>
          <span style={{ color: 'rgb(195,197,190)', fontWeight: 700 }}>From</span>
        </div>
        {/* CONTENT */}
        <div className="title" onClick={e => props.openPullDown('popup1from')}>
          <div className="title-letf-img">
            <img src={props.titleObj.imgUrl} style={{ width: '22px', height: '22px', margin: '0 6px 0 12px' }} alt="icon" />
            <h5 style={{ fontSize: '1em' }}>{props.titleObj.cname}</h5>
          </div>
          <img src={pulldown} alt="pulldown" style={{ width: '20px', height: '12px', marginRight: ' 8px' }} />
        </div>
        <div className="content">
          <div className="content-icontitle">
            <div className="content-left">
              <input type="number" min='0.0' className="input_none" placeholder="0.0" value={props.sendFrom} onChange={e => props.setSend(e.target.value)} />
            </div>
            <div className="content-right" onClick={e => props.openPullDown('popup3')}>
              <img src={props.fromSudt?.imgurl ? props.fromSudt.imgurl : REP} alt="icon" style={{ width: '24px', height: '24px' }} />
              <span style={{ fontsize: '14px', fontweight: 600, margin: '0 5px' }}>{props.fromSudt?.uname ? props.fromSudt.uname : '选择'}</span>
              <img src={pulldown} alt="pulldown" style={{ width: '20px', height: '12px' }} />
            </div>
          </div>
          <div className="content-blance">
            <span>Balance:--<i style={{ color: '#d4a24e' }}>Max</i></span>
          </div>
        </div>
        {/* TITLE-TO */}
        <div className="titleto">
          <span style={{ color: 'rgb(195,197,190)', fontWeight: 700 }}>To</span>
          {/* <img src="https://app.chainhop.exchange/static/media/arrowUpDownWhite.1a71ddaa.png" alt=""
            style={{ width: '42px', height: '42px', zIndex: 1 ,cursor:'pointer'}} onClick={props.transf}/> */}
        </div>
        {/* CONTENT2 */}
        <div className="title" onClick={e => props.openPullDown('popup1to')}>
          <div className="title-letf-img">
            <img src={props.titleObj2.imgUrl} style={{ width: '22px', height: '22px', margin: '0 6px 0 12px' }} alt="icon" />
            <h5 style={{ fontSize: '1em' }}>{props.titleObj2.cname}</h5>
          </div>
          <img src={pulldown} alt="pulldown" style={{ width: '20px', height: '12px', marginRight: ' 8px' }} />
        </div>
        <div className="content">
          <div className="content-icontitle">
            <div className="content-left">
              <span style={{margin:'0 12px',fontSize: '1.17em',fontWeight: '700',color:'rgb(117,117,117)'}}>0.0</span>
            </div>
            <div className="content-right" onClick={e => props.openPullDown('popup4')}>
              <img src={props.toSudt?.imgurl ? props.toSudt.imgurl : REP} alt="icon" style={{ width: '24px', height: '24px' }} />
              <span style={{ fontsize: '14px', fontweight: 600, margin: '0 5px' }}>{props.toSudt?.uname ? props.toSudt.uname : '选择'}</span>
              <img src={pulldown} alt="pulldown" style={{ width: '20px', height: '12px' }} />
            </div>
          </div>
          <div className="content-blance">
            <span>Balance:--<i style={{ color: '#d4a24e' }}>Max</i></span>
          </div>
        </div>
        {/* BUTTON */}
        <div className="main-button" onClick={props.handlerTransfer}>
          <Button center warning><span style={{ fontWeight: 700 }}>Transfer</span></Button>
        </div>
      </div>
    </div>
  )
}

export default HomeMain