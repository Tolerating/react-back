/* 
能发送异步ajax请求的函数模块
*/
import axios from 'axios'
import {message} from 'antd'
export default function ajax(url='',data={},type='GET'){
    return new Promise((resolve,reject)=>{
        var promise;
        if(type === 'GET'){
            promise = axios.get(url,{
                params:data
            });
        }else{
            promise = axios.post(url,data);
        }
        promise.then(val=>{
            resolve(val.data);
        }).catch(err=>{
            // reject(err);
            message.error('请求出错了:'+err.message);
        })
    });
    
}
