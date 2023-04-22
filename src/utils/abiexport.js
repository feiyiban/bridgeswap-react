import Address from "./address";
import { base2atto } from "./xfslibutil";
import { BN } from 'bn.js'
//找到abi中对应的方法名的key以及参数
export const findMethods = (abiToken,name) =>{
    // 合约交易data编码
    // bridge 合约
    const ms = Object.keys(abiToken.methods);
    let approveKey = undefined;
    //遍历找到Approve方法对应的obj，以及key
    for (let i=0; i<ms.length; i++){
      const k = ms[i];
      const item = abiToken.methods[k];
      if (item.name === name) {
        approveKey = {
          key: k,
          obj: item,
        };
      }
    }
    return approveKey;
}
/**
 * 将address转成16进制类型数组
 * @param {string} xfs_addr 
 * @returns 
 */
export const toAddress = (xfs_addr) => {
    const addr = Address.decode(xfs_addr); 
    const addrArray = addr.toArray();
    return addrArray;
}
/**
 * 转成大数数组
 * @param {string} value 
 * @returns 
 */
export const toUint256 = (value) => {
    const relValue = base2atto(value, 18);
    const rv = new BN(relValue);
    const ra = rv.toArray('BE');
    const raa = ser256(ra);
    return raa;
}

function ser256(n){
    const mBN = new BN(n);
    let nArr = mBN.toArray();
    nArr = nArr.concat(Array(32 - nArr.length).fill(0));
    return new Uint8Array(nArr);
  }