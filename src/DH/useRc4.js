import React from 'react'
import {Button} from 'antd'
import CryptoJS from 'crypto-js';

const RC4KEY = 'secretKey';
let name = 'abc'
let name_encrypted = CryptoJS.RC4.encrypt(name, RC4KEY); //加密

let name_decrypted = CryptoJS.RC4.decrypt(name_encrypted,RC4KEY);//解密
let name_decrypted_utf8 = CryptoJS.enc.Utf8.stringify(name_decrypted);

export default class UseRc4 extends React.Component{

    onShow =()=>{
        console.log(name_encrypted.toString());
        console.log(name_decrypted_utf8);//abc
    }
    render(){
        return(
          <div>
              <Button onClick={this.onShow}>测试RC4加解密</Button>
          </div>
        );
    }
}