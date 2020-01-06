哔哩哔哩视频看到`P69`

目录结构:
`src`
-- `api`		ajax相关<br>
-- assets		公共资源<br>
-- components		非路由组件<br>
-- config		配置<br>
-- pages		路由组件<br>
-- `utils`		工具模块<br>
`App.js`		应用根组件<br>
`index.js`		入口`js`<br>


当前项目暂无后台api可调用,所以只做了静态界面
后期会使用koa2+MongoDB完成后台服务


## 项目相关
### `antd`按需打包
安装`antd`

```
npm i antd -S
```



实现按需打包

1.安装 `react-app-rewired / customize-cra / babel-plugin-import` 开发依赖

```
npm i react-app-rewired customize-cra babel-plugin-import -D
```

2.项目根目录创建一个 **config-overrides.js** 用于修改默认配置。

```javascript
const { override, fixBabelImports } = require('customize-cra');
module.exports = override(
   fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',
     style: 'css',
   }),
);
```

3.修改`package.json`

```json
"scripts": {
   "start": "react-app-rewired start",
   "build": "react-app-rewired build",
   "test": "react-app-rewired test",
   "eject": "react-scripts eject"
}
```

> 执行`react-app-rewired`命令会加载`config-overrides.js`配置文件

修改`antd`主题
需要下载`less`和`less-loader`

```
npm install less less-loader -D
```

修改`config-overrides.js`

```javascript
const { override, fixBabelImports,addLessLoader } = require('customize-cra');
module.exports = override(
   fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',
     style: true,
   }),
   addLessLoader({
       javascriptEnabled:true,
       modifyVars:{'@primary-color':'#1da57a'}
   })
);

```
### 安装jsonp
`jsonp`可以用来解决跨域请求的问题,但是只能解决`get`请求
`jsonp`请求不是`ajax`请求,而是一般的`get`请求

安装:
```
npm install jsonp -S
```

原理:
`jsonp`需要浏览器端和服务器端的支持
浏览器端:
* 通过动态生成`<script>`标签发送请求(`src`就是接口的`url`)
  定义好用于接收响应数据的函数,并将函数名通过请求参数提交给后台(例如:callback=fn)

浏览器端:
* 收到响应自动执行函数调用的js代码,也就执行了提前定义好的回调函数,并得到了需要的结果数据






### 安装store
`store`是一个用来管理`localStorage`的库
使用:
```javascript
// Store current user
store.set('user', { name:'Marcus' })
 
// Get current user
store.get('user')
 
// Remove current user
store.remove('user')
 
// Clear all keys
store.clearAll()
 
// Loop over all stored values
store.each(function(value, key) {
    console.log(key, '==', value)
})
```

## vscode自动提示`react`代码
1.安装`Reactjs code snippets`插件
2.管理 --> 在线服务设置 --> 禁用自动类型获取勾上


安装路由
```
 npm i react-router react-router-dom -S
```

## react-router

`react-router-dom`中的`withRouter`
`withRotuer`高阶组件:
包装非路由㢟,返回一个新的组件
新的组件向非路由组件传递3个属性:`history/location/match`
用法:
```jsx
import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
class LeftNav extends Component{
   render(
      <h1>hello world</h1>
   )
}
export default withRouter(LeftNav);
```


## prop-types

## react声明周期

### componentWillMount
为第一次render()准备数据

### componentDidMount
执行异步任务:发送异步ajax请求

## this.setState
`setState()`不能立即获取最新的状态,因为`setState()`是异步更新状态的的
```jsx
this.setState(Object,callback)
//Object为要更新的对象,callback是在状态更新且重新render()后执行的回调
```

## 组件间通信
props分为一般属性和函数属性
一般属性将值从父组件传递到子组件
函数属性将值从子组件传递到父组件
```
<Button setForm={(form)=>{this.form = from}}/>
```