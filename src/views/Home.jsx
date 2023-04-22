import { useState } from 'react'
import './home/home.css'
import Header from './home/HomeHeader'
import HomeMain from './home/HomeMain'
import Footer from './home/HomeFooter'
import Login from './login/Login'
import Register from './regist/Register'
import PullDown1 from './Popup/Popup1'
import PullDown2 from './Popup/Popup2'
import FromUsdt from './Popup/FromUsdt'
import ToUsdt from './Popup/ToUsdt'
import Loding from './loding/Loding'
import BCH from '../assets/icons/BCH.svg'
import abi from './BridgeV1.abi.json'
import abiBridge from '../contract/bridge_abi.json'
import abiToken from '../contract/token_abi.json'
import { array2hex, hex2arr } from '../utils/bytes'
import { Notify } from '../compotents'
import { keccak256 } from "@ethersproject/keccak256";
import { toUtf8Bytes } from "@ethersproject/strings";
import { ethers } from 'ethers'
import { findMethods, toAddress, toUint256 } from '../utils/abiexport'
import { pre_approve, transferout, SingedTx, sendRawTransaction_create } from '../request'
function Home(props) {
  //改变active
  const [isShow, setIsShow] = useState('none');
  const [isDot, setDot] = useState('');
  const [isSudt, setIsSudt] = useState('');
  //对应的标题
  let [titleObj, setTitle] = useState({ imgUrl: BCH, cname: 'title' })
  let [titleObj2, setTitle2] = useState({ imgUrl: BCH, cname: 'title' })
  //保存的钱包地址
  const [addr, setAddr] = useState([{ cid: 1, cname: 'Source Chain', addr: '' }, { cid: 2, cname: 'Dest Chain', addr: '' }, { cid: 3, cname: 'XFS Chain', addr: sessionStorage.getItem('addr') || '' }])
  //对应的USDT
  let [toSudt, setToSudt] = useState({})
  let [fromSudt, setFromSudt] = useState({})
  //发送金额
  const [sendFrom, setSend] = useState('')
  document.addEventListener('click', (e) => {
    e.target === document.querySelector('.ratemodalwarp') && setIsShow('none');
  })
  /**
   * 改变当前模态框状态，对pop1的下拉状态进行特殊记录，用于usdt的选择判断
   * @param {*} order 
   */
  const openPullDown = (order) => {
    setIsShow(order);
    if (order === 'popup1from') {
      setIsSudt('popup1from')
      setDot(titleObj.cname)
    }
    if (order === 'popup1to') {
      setIsSudt('popup1to')
      setDot(titleObj2.cname)
    }
  }
  /**
   * 获取钱包的地址并存储
   * @param {*} obj 
   */
  const changePull = (obj = undefined) => {
    obj && setAddr(perState => {
      perState.forEach(item => {
        if (item.cid === obj.cid) item.addr = obj.addr;
      })
      return [...perState];
    })
    setIsShow('none')
  }
  /**
   * 改变当前交易的from和to的标志
   * @param {Object} obj 
   * @param {String} order 
   * @returns 
   */
  const changeTitle = (obj, order) => {
    if (obj?.cname === titleObj?.cname) return;
    if (order === 'popup1from') setTitle(obj)
    if (order === 'popup1to') setTitle2(obj)
  }
  /**
 * 接受返回来的usdt对象，存储在表单中
 * @param {子组件的值} usdt 
 */
  const getUsdt = usdt => {
    if (isSudt === 'popup1from') {
      setFromSudt({ ...usdt })
    }
    if (isSudt === 'popup1to') {
      setToSudt({ ...usdt })
    }
  }
  /**to=>from from=>to */
  const transf = () => {
    [titleObj, titleObj2] = [titleObj2, titleObj]
    setTitle(titleObj);
    setTitle2(titleObj2);
    [fromSudt, toSudt] = [toSudt, fromSudt]
    setFromSudt(fromSudt);
    setToSudt(toSudt);
  }
  /**
   * 发起transfer
   */
  const handlerTransfer = async () => {
    if (sendFrom === '' || sendFrom === undefined) {
      Notify({ type: 'error', message: '请输入转账金额' }); return;
    } else {
      switch (titleObj.cid) {
        case 1: {
          // console.log('小狐狸的addr=>', addr[0].addr);
          await handlerApprove(addr[0].addr);
          handlerTransferMatemask();
          break;
        }
        case 2: {
          // console.log('波场的addr=>', addr[1].addr);
          // await handlerApprove(addr[1].addr);
          handlerTransferTronlick();
          break;
        }
        case 3: {
          //签名Approve
          // handlerXFSApprove();
          // handlerTransferXFS();
          // handXFSApprove();
          handTransferXFS();
          break;
        }
      }
    }
  }
  /**from地址为matemsak */
  const handlerTransferMatemask = async () => {
    let obj = addr.find(item => titleObj2.cid === item.cid)
    const ethers = require('ethers');
    const provider = new ethers.providers.Web3Provider(web3.currentProvider);

    let gas_price = await provider.getGasPrice()
    let singer = provider.getSigner()
    let tx_count = await provider.getTransactionCount(addr[0].addr, "latest")
    let signature = keccak256(toUtf8Bytes("transferOut(address,string,uint256,uint256)"));
    let abi_coder = new ethers.utils.AbiCoder()
    let result = abi_coder.encode(["address", "string", "uint256", "uint256"], [fromSudt.erc20, obj.addr, sendFrom, obj.cid])
    let data = ethers.utils.hexConcat([ethers.utils.hexDataSlice(signature, 0, 4), result])

    let tx_req = {
      from: addr[0].addr,
      to: fromSudt.bridge,
      nonce: tx_count,
      gasLimit: ethers.utils.hexlify(1000000),
      gasPrice: 100000000,
      data: data
    }
    let tx_receipt = await singer.sendTransaction(tx_req);
  }
  /**from地址为tronlick */
  const handlerTransferTronlick = async () => {
    let obj = addr.find(item => titleObj2.cid === item.cid)
    let instance = await tronWeb.contract(abi, fromSudt.bridge);
    // console.log('fromSudt.erc20=>', fromSudt.erc20, " addr[1].addr=> ", addr[0].addr, "sendFrom=>", sendFrom, " addr[0].cid=>", addr[1].cid, 'addr[1].addr=>', addr[1].addr, "to=>", fromSudt.bridge);
    let transactionHash = await instance.transferOut(fromSudt.erc20, obj.addr, sendFrom, obj.cid).send({ from: addr[1].addr, to: fromSudt.bridge, gasPrice: '1000000' });

  }
  /**from地址为xfs */
  const handlerTransferXFS = async () => {
    const { key, methodsObj } = findMethods(abiBridge, 'TransferOut');
    //内置合约，固定参数属性
    let buffer = [0xd0, 0x23, 0x01];
    const xfs_addr = sessionStorage.getItem('addr');
    buffer = buffer.concat(...hex2arr(key), ...toAddress(xfs_addr), ...toUint256(sendFrom));
    const dataHex = array2hex(buffer);
    console.log('TransferOut', dataHex);
  }
  const handlerApprove = async (addr) => {
    const provider = new ethers.providers.Web3Provider(web3.currentProvider);

    // ERC20合约对象授权
    let gasPrice = await provider.getGasPrice()
    let singer = provider.getSigner()

    let txNonce = await provider.getTransactionCount(addr, "latest")
    let param = keccak256(toUtf8Bytes("approve(address,uint256)"));
    let abiCoder = new ethers.utils.AbiCoder()
    let paramInfo = abiCoder.encode(["address", "uint256"], [fromSudt.bridge, sendFrom])
    let dataInfo = ethers.utils.hexConcat([ethers.utils.hexDataSlice(param, 0, 4), paramInfo])
    let tx_req1 = {
      from: addr,
      to: fromSudt.erc20,
      nonce: txNonce,
      gasLimit: ethers.utils.hexlify(1000000),
      gasPrice,
      data: dataInfo
    }
    let tx_receipt1 = await singer.sendTransaction(tx_req1);
    return tx_receipt1;
  }
  //XFSApprove
  const handlerXFSApprove = () => {
    //通过方法获得对应的key，以及对应obj
    const { key, obj } = findMethods(abiToken, 'Approve');
    const { argc, args, name, return_type } = obj;
    //内置合约，固定参数属性
    let buffer = [0xd0, 0x23, 0x01];
    const xfs_addr = sessionStorage.getItem('addr');
    //转16进制数组
    buffer = buffer.concat(...hex2arr(key), ...toAddress(xfs_addr), ...toUint256(sendFrom));//拼接key,拼接钱包的addr,拼接用户输入的value值
    //转成十六进制字符串,最终将这个data通过接口返回给后端
    const dataHex = array2hex(buffer);
  }
  const handXFSApprove = async () => {
    //桥地址，授权
    try {
      //授权
      let result_code = await pre_approve({ bridge: fromSudt.bridge });
      if (!result_code.data.result.code) {
        Notify({ type: 'error', message: '出错，没有code' })
        return;
      }
      //签名
      let result_stx = await SingedTx({ addr: addr[2].addr, bridge: fromSudt.bridge, data: result_code.data.result.code });
      if (!result_stx.data.result.txhash) {
        Notify({ type: 'error', message: '签名出错' })
        return;
      }
      //交易
      let sendTx = await sendRawTransaction_create({ data: result_stx.data.result.txhash })
      if (!sendTx.data.result.txhash) Notify({ type: 'error', message: '签名出错' })
      else Notify({ type: 'success', message: '成功' })

    } catch (error) {
      Notify({ type: 'error', message: '错误消息，暂定' })
    }
  }
  const handTransferXFS = async () => {
    //桥地址，授权
    // try {
      let obj = addr.find(item => titleObj2.cid === item.cid)
      let result_code = await transferout({ addr: addr[2].addr, toaddr: obj.addr, amount: sendFrom, tochainid: String(obj.cid) });
      if (!result_code.data.result.code) {
        Notify({ type: 'error', message: '出错，没有code' })
        return;
      }
      //签名
      let result_stx = await SingedTx({ addr: addr[2].addr, bridge: fromSudt.bridge, data: result_code.data.result.code });
      if (!result_stx.data.result.txhash) {
        Notify({ type: 'error', message: '签名出错' })
        return;
      }
      //交易
      let sendTx = await sendRawTransaction_create({ data: result_stx.data.result.txhash })
      console.log(sendTx);
      if (!sendTx.data.result.txhash) Notify({ type: 'error', message: '签名出错' })
      else Notify({ type: 'success', message: '成功' })

    // } catch (error) {
    //   Notify({ type: 'error', message: '错误消息，暂定' })
    // }
  }
  return (
    <div className="app">
      <Header addr={addr} setAddr={setAddr} />

      <HomeMain transf={transf} openPullDown={openPullDown} setSend={setSend} handlerTransfer={handlerTransfer} sendFrom={sendFrom} isShow={isShow} titleObj={titleObj} titleObj2={titleObj2} toSudt={toSudt} fromSudt={fromSudt} />
      {isShow === 'popup1from' || isShow === 'popup1to' ? <PullDown1 isShow={isShow} changePull={changePull} changeTitle={changeTitle} isDot={isDot} openPullDown={openPullDown} /> : ''}
      {isShow === 'popup2' ? <PullDown2 isShow={isShow} changePull={changePull} /> : ''}
      {isShow === 'popup3' ? <FromUsdt isShow={isShow} changePull={changePull} getUsdt={getUsdt} from={titleObj} /> : ''}
      {isShow === 'popup4' ? <ToUsdt isShow={isShow} changePull={changePull} getUsdt={getUsdt} from={titleObj2} /> : ''}
      {isShow === 'login' ? <Login isShow={isShow} changePull={changePull} setIsShow={setIsShow} changeTitle={changeTitle} /> : ''}
      {isShow === 'register' ? <Register isShow={isShow} changePull={changePull} setIsShow={setIsShow} /> : ''}
      {/* {'loding' === 'loding' ? <Loding isShow={'loding'} changePull={changePull} setIsShow={setIsShow} /> : ''} */}
    </div>
  )

}


export default Home
