import jsonp from 'jsonp'
import {message} from 'antd'
import ajax from './ajax'

const BASE = '';
// 登录
export const reqLogin = (username,password)=> ajax(BASE+'/login',{username,password},'POST');

// 添加用户
export const reqAddUser = (user)=> ajax(BASE+'/manage/user/add',user,'POST');

// 获取一级/二级分类的列表 
export const reqCategorys = (parentId) =>ajax(BASE + '/manage/category/list',{parentId});

// 添加分类
export const reqAddCategorys = (parentId,categoryName) =>ajax(BASE + '/manage/category/add',{categoryName,parentId},"POST");

// 更新分类
export const reqUpdateCategory = (categoryId,categoryName) =>ajax(BASE + '/manage/category/update',{categoryId,categoryName},"POST");

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

