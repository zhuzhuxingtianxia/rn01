import {PublicKey} from './PublicKey'

//加密
function shEncrypt(content,key){

    return content;
}

//解密
function shDecrypt(encryptData,key) {

    return encryptData
}

export default {
    encrypt(pwd) {
        var encode = shDecrypt(pwd,PublicKey().key1)
        return encode
    },
    decrypt(encrypt) {
        var decode = shDecrypt(encrypt,PublicKey().key1)
        return decode
    }
}