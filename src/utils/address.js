
import {binary_to_base58, base58_to_binary} from 'base58-js';

class Address {
  static decode(addr){
    const buf = base58_to_binary(addr);
    return new Address(buf);
  }
  constructor(buffer){
    this.buffer = buffer;
  }
  toString(){
    return binary_to_base58(this.buffer);
  }
  toArray(){
    return this.buffer;
  }
}
export default Address;
