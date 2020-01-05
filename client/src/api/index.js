import jsonp from 'jsonp'
import {message} from 'antd'

/* 
json请求的接口请求函数
*/
export const reqWeather = (city) =>{
    return new Promise((resolve,reject) =>{
        const url = `https://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
        jsonp(url,{},(err,data)=>{
            console.log('jsonp',err,data);
            if(!err && data.status === 'success'){
                const {dayPictureUrl,weather} = data.results[0].weather_data[0]
                resolve({dayPictureUrl,weather});
            }else{
                message.error('获取天气信息失败!');
            }
        });
    })
    
}
reqWeather('北京');

