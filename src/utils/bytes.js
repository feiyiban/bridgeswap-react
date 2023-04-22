export function array2hex(arr, prefix=true){
  let hex = [...new Uint8Array(arr)]
          .map(x=>x.toString(16).padStart(2, '0'))
          .join('');
  if (hex !== '' && prefix){
    return '0x' + hex;
  }
  return hex===''?null:hex;
}

export function hex2arr(text){
  if (!text){
    return;
  }
  text = text.replace(/^0x/, '');
  if (text.length === 0 || text.length % 2 !== 0) {
    return;
  }
  const arr = text.match(/.{1,2}/g)
  .map(byte => parseInt(byte, 16));
  return new Uint8Array(arr);
}
