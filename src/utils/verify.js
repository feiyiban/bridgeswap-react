import { Notify } from "../compotents"
const verify_phone = (e, phone) => {
    let order = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(phone)
    if (phone === null || phone === undefined || phone.length === 0) {
        e.target.classList.add('input_danger');
        Notify({ type: "error", message: '手机号不能为空' });
        return order;
    }
    if (!order) {
        e.target.classList.add('input_danger');
        Notify({ type: "error", message: '请输入正确的手机号' })
    }
    return order;
}
const verify_email = (e, email) => {
    let order = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    if (email === null || email === undefined || email.length === 0) {
        e.target.classList.add('input_danger');
        Notify({ type: "error", message: '邮箱不能为空' });
        return order;
    }
    if (!order) {
        e.target.classList.add('input_danger');
        Notify({ type: "error", message: '请输入正确的邮箱格式' })
    }
    return order;

}
const verify_username = (e, username) => {
    let order = /^[a-zA-Z0-9_-]{4,16}$/.test(username);
    if (username === null || username === undefined || username.length === 0) {
        e.target.classList.add('input_danger');
        Notify({ type: "error", message: '用户名不能为空' });
        return order;
    }
    if (!order) {
        e.target.classList.add('input_danger');
        Notify({ type: "error", message: '请以数字、字母或下划线开头' })
    }
    return order;
}
const verify_password = (e, password) => {
    let order = password.length !== 0;
    if (password === null || password === undefined || password.length === 0) {
        e.target.classList.add('input_danger');
        Notify({ type: "error", message: '密码不能为空' });
        return order;
    }
    return order;
}
const verify_ispass = (e, password, ispass) => {
    let order = password === ispass;
    if (!order) {
        e.target.classList.add('input_danger');
        Notify({ type: "error", message: '两次输入密码不一致' });
        return order;
    }
    return order;
}
export default {
    verify_phone,
    verify_email,
    verify_username,
    verify_password,
    verify_ispass,
}