import Axios from "./axios-config";

//获取登录 or 注册的验证码
export const getCaptcha = () => Axios.post('/base/captcha');
//登录
export const loginXFS = data => Axios.post('/base/login', data);
//注册
export const registerXFS = data => Axios.post('/user/register', data);

export const test = data => Axios.post('/', data);

//transferout
export const transferout = data => {
    let config = {
        "jsonrpc": "2.0",
        "method": "XFSBridge.BridgePreTransferOut",
        "id": 1,
        "params": {
            "blockchain": "XFS_TESTNET",
            "fromaddr": data.addr,
            "toaddr": data.toaddr,
            "amount": data.amount,
            "tochainid": data.tochainid
        }
    }
    return Axios.post('/', config);
}

//SingedTx
export const SingedTx = data => {
    let config = {
        "jsonrpc": "2.0",
        "method": "Chain.SignedTx",
        "id": 1,
        "params": {
            "blockchain": "XFS_TESTNET",
            "version": "0",
            "from": data.addr,
            "to": data.bridge || '',
            "value": "",
            "data": data.data,
            "gas_limit": "",
            "gas_price": "",
            "signature": "",
            "none": ""
        }
    }
    return Axios.post('/', config);
}


//sendRawTransaction_create
export const sendRawTransaction_create = data => {
    let config = {
        "jsonrpc": "2.0",
        "method": "Chain.SendRawTransaction",
        "id": 1,
        "params": {
            "blockchain": "XFS_TESTNET",
            "data": data.data
        }
    }
    return Axios.post('/', config)
}


export const pre_approve = data => {  
    let config = {
        "jsonrpc": "2.0",
        "method": "XFSToken.PreApprove",
        "id": 1,  
        "params": {
            "blockchain": "XFS_TESTNET",
            "spender_address": data.bridge,
            "amount": "9000"
        }
    }
    return Axios.post('/', config);
}
