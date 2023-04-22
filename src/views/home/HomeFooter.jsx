import React, { memo } from 'react'

const HomeFooter = props => {
  return (
    <div className="footer">
        {/* <img src="https://app.chainhop.exchange/static/media/footerBgIcon.5287635f.png" alt="" style={{width:'100%',height:'20vh',borderRadius:'0'}}/> */}
        {/* <div>
          &copy;2022-7-2
        </div> */}
        <ul>
          <li>
            <img src="https://app.chainhop.exchange/static/media/twitter.42386cba.svg" alt="" />
          </li>
          <li>
            <img src="https://app.chainhop.exchange/static/media/discord.da865ab2.svg" alt="" />
          </li>
          <li>
            <img src="https://app.chainhop.exchange/static/media/docs.f5709064.svg" alt="" />
          </li>
          <li>
            <img src="https://app.chainhop.exchange/static/media/github.cb915615.svg" alt="" />
          </li>
        </ul>
      </div>
  )
}

export default memo(HomeFooter)