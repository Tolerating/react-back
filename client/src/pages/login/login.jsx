import React, { Component } from 'react';
import { Form, Icon, Input, Button ,message} from 'antd';
import {reqLogin} from '../../api/index'
import storageUtils from '../../utils/storageUtils.js'
import md5 from 'md5'
import './login.less'
import memoryUtils from '../../utils/memoryUtils'
/* 登录的路由组件 */
class Login extends Component {
    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
            //   console.log('提交ajax请求', values);
                const {username,password} = values;
                const data = await reqLogin(username,password);
                // console.log(data);
                if(data.status === 0){
                    storageUtils.saveUser(data.data);
                    memoryUtils.user=data.data;
                    console.log(memoryUtils.user);
                    this.props.history.replace('/admin/home');  
                }else{
                    message.error(data.msg);
                }               
            }else{
                console.log("校验失败!!");
            }
          });
        // const form = this.props.form;
        // const value = form.getFieldsValue();
        // console.log(value);
    }
    // 对密码进行自定义验证
    validatorPwd = (rule,value,callback)=>{
        if(!value){
            callback('密码必须输入');
        }else if(value.length < 3){
            callback('密码长度不能小于3位');
        }else if(value.length > 12){
            callback('密码长度不能大于12位');
        }else if(!/^[a-zA-Z0-9]+$/.test(value)){
            callback('密码必须是英文、数字或下划线组成');
        }else{
            callback();
        }
    }
    render() {
        // 得到具有强大功能的form对象
        const form = this.props.form;
        const {getFieldDecorator} = form;

        return (
            <div className="login">
                <header className="login-header">
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                //声明式验证:直接使用别人定义好的规则进行验证
                                rules: [
                                    { required: true,whitespace:true, message: '用户名必须输入'},
                                    { min: 2, message: '用户名至少2位'},
                                    { max: 12, message: '用户名最多12位'},
                                    // { pattern: /^[a-zA-Z0-9]+$/, message: '用户名必须是英文、数字或下划线组成'},
                                ],
                            })(
                                <Input
                                prefix={<Icon type="user" />}
                                placeholder="用户名"
                                />
                            )}
                            
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator("password",{
                                    rules:[
                                        {
                                            validator:this.validatorPwd
                                        }
                                    ]
                                })(
                                    <Input
                                    prefix={<Icon type="lock"/>}
                                    type="password"
                                    placeholder="密码"
                                    />
                                )
                            }                            
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>                       
                        </Form.Item>
                    </Form>
                </section>
                
            </div>
        );
    }
}
/* 
1.高阶函数
    1).一类特别的函数
        a.接受函数类型的参数
        b.返回值是函数
    2)常见的高阶函数
        a.定时器:setTimeout()/setInterval()
        b.Promise: Promise(()=>{}).then(value=>{})
        c.数组遍历相关的方法:forEach()/filter()/map()
        d.函数对象的bind()
    3)高阶函数更加动态,更加具有扩展性

2.高阶组件
    1)本质就是一个函数
    2)接受一个组件(被包装组件),返回一个新的组件(包装组件),包装组件会向被包装组件传入特定属性
    3)作用:扩展组件的功能
    4)高阶组件也是高阶函数:接收一个组件函数,返回是一个新的组件函数

*/
/* 
包装Form组件生成一个新的组件 Form(Login)
新组建会向Form组件传递一个强大的对象属性:form
*/
const WrapLogin = Form.create()(Login);
export default WrapLogin;
/* 
1.前台表单验证
2.收集表单输入数据
*/
