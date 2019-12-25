export const PublicKey = ()=> {
    
    //用于加解密的公私钥
    var key1 = ''
    if(process.env.env == 'stg'){
        key1 = 'xx'
    }

    return {key1}
}

/*
//使用
import {PublicKey} from './PublicKey'

var key = PublicKey().key1
*/