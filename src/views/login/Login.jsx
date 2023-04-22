import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import './login.css'
import XFS from '../../assets/icons/logo.svg'
import Username from '../../assets/icons/username.svg'
import Password from '../../assets/icons/password.svg'
import { ModalMask, Button, Notify } from '../../compotents'
import { getCaptcha, loginXFS } from '../../request/index'
const Login = props => {
  //获取redux中的状态
  const { active_pop } = useSelector(state => state.home)
  //ref
  const pasRef = useRef()
  //验证码
  const [captcha, setCaptcha] = useState('');
  const [CaptchaId, setCaptchaId] = useState('');
  //表单
  const [fromUser, setFrom] = useState(
    {
      Username: '',
      Password: '',
      Captcha: '',
      CaptchaId: ''
    }
  )
  //刷新验证码
  const handlerCaptcha = async () => {
    let data = await getCaptcha();
    setCaptcha(data.data.data.picPath);
    setCaptchaId(data.data.data.captchaId)
  }
  //修改表单
  const handlerFrom = e => {
    setFrom(preState => {
      return { ...preState, [e.target.name]: e.target.value, CaptchaId }
    })
  }
  //显示/隐藏密码
  const changeType = () => {
    if (pasRef.current.type === "password")
      pasRef.current.type = 'text';
    else if (pasRef.current.type === "text")
      pasRef.current.type = 'password';
  }
  //登录
  const login = async (e) => {
    e.preventDefault()
    if (fromUser.Username && fromUser.Password && fromUser.Captcha) {
      let result = await loginXFS(fromUser)
      if (result.status === 200 && Object.keys(result.data.data).length != 0) {
        Notify({ type: "success", message: "登陆成功" })
        props.changeTitle({
          imgUrl: XFS,
          cname: 'XFS',
          isActive: false,
          cid: 3
        }, active_pop);
        //保存到本地
        sessionStorage.setItem('addr', result.data.data.user.addr)
        //保存当前用户的addr
        props.changePull({ cid: 3, addr: result.data.data.user.addr })
      } else {
        Notify({ type: "error", message: result.data.msg || '登陆失败' });
        //刷新二维码
        handlerCaptcha()
      }
    } else Notify({ type: "error", message: "请填写完整用户名和密码" })
  }
  //初始化验证码
  useEffect(() => {
    handlerCaptcha()
    return () => {
      // console.log('销毁');
    }
  }, [])
  return (
    <div className={`xfs-modal-show ${props.isShow === 'login' ? ' d-block' : ' d-none'}`}>
      <ModalMask changePull={props.changePull}>
        <div className={`login-container`}>
          <div className="login-logo">
            <img src={XFS} alt="logo" style={{ height: '40px', width: '40px' }} />
            <div className="logo-welcome">XFS Welcome !!!</div>
          </div>
          <form onSubmit={e => login(e)} action="" className="login-from">
            <div className="from-input">
              <input type="text" className="login-input" name="Username" value={fromUser.Username} onChange={e => handlerFrom(e)} />
              <span className='input-icon'>
                <img src={Username} alt="" style={{ width: '15px', height: '15px' }} />
              </span>
            </div>
            <div className="from-input">
              <input type="password" className="login-input" name="Password" ref={pasRef} value={fromUser.Password} onChange={e => handlerFrom(e)} />
              <span className='input-icon'>
                <img src={Password} alt="" style={{ width: '15px', height: '15px', cursor: 'pointer' }} onClick={changeType} />
              </span>
            </div>
            <div className="from-input from-verify">
              <input type="text" className="login-input" placeholder="请输入验证码" name="Captcha" value={fromUser.Captcha} onChange={e => handlerFrom(e)} />
              <span className="verify" onClick={handlerCaptcha}><img src={captcha} alt="" style={{ width: '120px', height: '35px' }} /></span>
            </div>
            <Button center warning>登录</Button>
            <span onClick={e => props.setIsShow('register')} className="from-bottom">没有账号？去注册&gt;&gt;</span>
          </form>
        </div>
      </ModalMask>

    </div>
  )
}

export default Login