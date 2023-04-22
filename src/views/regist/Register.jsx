import React, { useEffect, useState } from 'react'
import './register.css'
import XFS from '../../assets/icons/logo.svg'
import { ModalMask, Button, Notify } from '../../compotents'
import { getCaptcha, registerXFS } from '../../request/index'
import verify from '../../utils/verify'
const Register = props => {
    //验证码图片ID
    const [CaptchaId, setCaptchaId] = useState('');
    //记录验证码图片
    const [CaptchaImg, setCapImg] = useState('');
    //受控表单
    const [fromRegister, setFrom] = useState(
        {
            Username: '',
            Password: '',
            Phone: '',
            Email: '',
            Captcha: '',
            CaptchaId: ''
        }
    )
    //注册确认
    const [verifyFrom, setVerifyFrom] = useState({ email: false, phone: false, username: false, password: false, isPassword: false })
    const [isPassword, setIsPass] = useState('');
    const [verActive, setCerActive] = useState([])
    //修改表单
    const handlerFrom = e => {
        setFrom(preState => {
            return { ...preState, [e.target.name]: e.target.value, CaptchaId }
        })
    }
    //注册
    const register = async (e) => {
        let returntemp = undefined;
        //清空
        setCerActive([])
        e.preventDefault();
        //提交前最后一次校验
        for (const key in verifyFrom) {
            if (!verifyFrom[key]) {
                returntemp = true;
                setCerActive(perState => {
                    return [...perState, key]
                })
                continue;
            }
        }
        if (returntemp) {Notify({type:"error",message:'请检查表单'});return};

        if (fromRegister.Captcha === null || fromRegister.Captcha === undefined || fromRegister.Captcha === '') { Notify({ type: "error", message: "请填写验证码" }); return; }
        const result = await registerXFS(fromRegister);
        if (Object.keys(result.data.data).length === 0 || result.data.data.user.ID === 0) {
            Notify({ type: 'error', message: result.data.msg || '出错' });
        }
        else {
            Notify({type:'success',message:result.data.msg + ',即将前往登录界面'});
            setTimeout(() => {
                props.setIsShow('login')
            }, 2000);
        }
        //刷新验证码
        handlerCaptcha();
    }
    //刷新验证码
    const handlerCaptcha = async () => {
        let data = await getCaptcha();
        setCapImg(data.data.data.picPath);
        setCaptchaId(data.data.data.captchaId)
    }
    //确认密码+校验
    const handlerIsPass = e => {
        verifyFrom.isPassword = fromRegister.Password === e.target.value
        setIsPass(e.target.value);
    }
    //聚焦恢复默认
    const handlerFocus = e => {
        e.target.classList.remove("input_danger")
    }
    //失焦进行校验
    const handlerBulr = (e, order) => {
        let tempK = order, tempV = undefined;
        switch (order) {
            case 'email': tempV = verify.verify_email(e, fromRegister.Email); break;
            case 'phone': tempV = verify.verify_phone(e, fromRegister.Phone); break;
            case 'username': tempV = verify.verify_username(e, fromRegister.Username); break;
            case 'password': tempV = verify.verify_password(e, fromRegister.Password); break;
            case 'ispass': tempV = verify.verify_ispass(e, fromRegister.Password, isPassword); break;
        }
        setVerifyFrom(perState => {
            return { ...perState, [tempK]: tempV }
        })
    }
    //初始化
    useEffect(() => {
        //初始化之后加载验证码
        handlerCaptcha();
    }, [])
    return (
        <div className={`xfs-modal-show ${props.isShow === 'register' ? ' d-block' : ' d-none'}`}>
            <ModalMask changePull={props.changePull}>
                <div className={`login-container`}>
                    <div className="login-logo">
                        <img src={XFS} alt="logo" style={{ height: '40px', width: '40px' }} />
                        <div className="logo-welcome">XFS Welcome !!!</div>
                    </div>
                    {/* 后续需要这个板块，这里就封装个hoc将表单数据流下来直接渲染 */}
                    <form onSubmit={e => register(e)} action="" className="login-from">
                        <div className="from-input from-lable">
                            <label htmlFor="Username" className="input-lable">用户名：</label>
                            <input type="text" className={`login-input ${verActive.find(item => item === 'username') ? ' input_danger' : ' '}`} name="Username" id="Username" placeholder="请输入用户名" value={fromRegister.Username} onChange={e => handlerFrom(e)} onBlur={e => handlerBulr(e, 'username')} onFocus={e => handlerFocus(e)} />
                        </div>
                        <div className="from-input from-lable">
                            <label htmlFor="Phone" className="input-lable">手机号：</label>
                            <input type="text" className={`login-input ${verActive.find(item => item === 'phone') ? ' input_danger' : ' '}`} id="Phone" name="Phone" placeholder="请输入手机号" value={fromRegister.Phone} onChange={e => handlerFrom(e)} onBlur={e => handlerBulr(e, 'phone')} onFocus={e => handlerFocus(e)} />
                        </div>
                        <div className="from-input from-lable">
                            <label htmlFor="Email" className="input-lable">邮箱：</label>
                            <input type="text" className={`login-input ${verActive.find(item => item === 'email') ? ' input_danger' : ' '}`} id="Email" name="Email" placeholder="请输入邮箱" value={fromRegister.Email} onChange={e => handlerFrom(e)} onBlur={e => handlerBulr(e, 'email')} onFocus={e => handlerFocus(e)} />

                        </div>
                        <div className="from-input from-lable">
                            <label htmlFor="Password" className="input-lable">密码：</label>
                            <input type="password" className={`login-input ${verActive.find(item => item === 'password') ? ' input_danger' : ' '}`} id="Password" name="Password" placeholder="设置密码" value={fromRegister.Password} onChange={e => handlerFrom(e)} onBlur={e => handlerBulr(e, 'password')} onFocus={e => handlerFocus(e)} />

                        </div>
                        <div className="from-input from-lable">
                            <label htmlFor="isPass" className="input-lable">确认密码：</label>
                            <input type="password" className={`login-input ${verActive.find(item => item === 'isPassword') ? ' input_danger' : ' '}`} placeholder="确认密码" id="isPass" value={isPassword} onChange={e => handlerIsPass(e)} onBlur={e => handlerBulr(e, 'ispass')} onFocus={e => handlerFocus(e)} />
                        </div>
                        <div className="from-input from-verify">
                            <input type="text" className="login-input" placeholder="请输入验证码" name="Captcha" value={fromRegister.Captcha} onChange={e => handlerFrom(e)} />
                            <span className="verify" onClick={handlerCaptcha}><img src={CaptchaImg} alt="" style={{ width: '120px', height: '35px' }} /></span>
                        </div>
                        <Button center warning>注册</Button>
                        <span onClick={e => props.setIsShow('login')} className="from-bottom">已有账号！去登陆&gt;&gt;</span>
                    </form>
                </div>
            </ModalMask>

        </div>
    )
}

export default Register