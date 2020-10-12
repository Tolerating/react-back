哔哩哔哩视频看到`P105`
`P94-99`还需多次观看下<br>

`redux`尚未加入

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






### 使用富文本编辑器
安装依赖:`npm install --save react-draft-wysiwyg draft-js html-to-draftjs draftjs-to-html`
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

### componentWillReceiveProps
```javascript
/* 
当组件接收到新的属性时自动调用
*/
componentWillReceiveProps(nextProps){

}
```
 
    

## this.setState
### setState()更新状态的2种方式
1). setState(updater,[callback]), updater为返回stateChange对象的函数:`(state,props)=>stateChange`,接收的state和props被保证为最新的.
例如:
```jsx
click1 =()=>{
   this.setState((state,props)=>(count:state.count+1));
}  
```
2). setState(stateChange,[callback])
   stateChange为对象
   callback是可选的回调函数,在状态更新且界面更新后才执行。
例如：
```jsx
click2 =()=>{
   this.setState({count:3});
}  
```

总结:
* 对象方式是函数方式的简写形式
如果新状态不依赖于原状态  ===>  使用对象方式
如果新状态依赖于原状态   ===>   使用函数方式
如果需要在setState()后获取最新的状态数据,在第二个callback函数中读取

### setState()更新状态是异步还是同步的?
1). 执行setState()的位置?
   在react控制的回调函数中:生命周期钩子 / react事件监听回调
   非react控制的异步回调函数中:定时器回调 / 原生事件监听回调 / promise回调 / ....
2). 异步 OR 同步?
   react相关回调中:异步
   其它异步回调中: 同步

### 关于异步的setState()
1). 多次调用,如何处理
   setState({}):合并更新一次状态,只调用一次render()更新界面----> 状态更新和界面更新都合并了
   setState(fn):更新多次状态,但只调用一次render()更新界面   -----> 状态更新没有合并,但界面更新合并了
2). 如何得到异步更新后的状态数据?
   在setState()的callback回调函数中

`setState()`不能立即获取最新的状态,因为`setState()`是异步更新状态的的
```jsx
this.setState(Object,callback)
//Object为要更新的对象,callback是在状态更新且重新render()后执行的回调
```

## 组件间通信
props分为一般属性和函数属性
一般属性将值从父组件传递到子组件
函数属性将值从子组件传递到父组件
```jsx
//父组件
<Button setForm={(form)=>{this.form = from}}/>


//子组件
static propType = {
   categoryName:PropTypes.string.isRequired,
   setForm:PropTypes.func.isRequired
}
componentWillMount(){
   // 将form对象通过setForm()传递给父组件
   console.log(this.props.form);
   this.props.setForm(this.props.form)
}
```

子组件调用父组件的方法:将父组件的方法以函数属性的形式传递给子组件,子组件就可以调用<br>
父组件调用子组件的方法:在父组件中通过ref得到子组件标签对象(也就是组件对象),调用其方法 [使用教程](https://react.docschina.org/docs/refs-and-the-dom.html)<br>
例子:
```jsx
//父组件
class Example extends Component {
   constructor(props){
      super(props);
      //创建用来保存ref标识的标签对象的容器
      this.pw = React.createRef();
   }

   submit = ()=>{
      //通过this.pw.current访问子组件的属性
      this.pw.current.getImgs();
   }

   render() {
      return <Children ref={this.pw}/>
   }
}

//子组件
class Children extends Component {

   getImgs = ()=>{
      //.....
   }

   render() {
      return <div></div>
   }
}
```