const Header = props => {
  const loginout = () => {
    props.addr[2].addr = '';
    props.setAddr([...props.addr])
    sessionStorage.removeItem('addr');
  }
  return (
    <div className="header">
      <div className="header-left">
        <span className="test_matemask"></span>
      </div>
      <div className="header-right">
        {
          props.addr.map(item => (
            <div className="right-nav" key={item.cid}>
              <div className=" header-nav-btn" ><span style={{ fontSize: '1.3em', margin: '0 20px 0 10px' }}>{item.cname}:</span> {item.addr}</div>
            </div>
          ))
        }
        <span onClick={loginout}>退出XFS</span>
        <button className="phone-select">
          <img src="https://app.chainhop.exchange/static/media/mobileMenu.26ecfb94.svg" alt="" />
        </button>
      </div>
    </div>
  )
}
export default Header;
