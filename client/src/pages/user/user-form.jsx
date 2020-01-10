import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Form,Input,Select} from 'antd'

const Item = Form.Item;
const Option = Select.Option;
/* 添加/修改用户的form组件 */
class UserForm extends Component {
    static propTypes = {
        setForm:PropTypes.func.isRequired,
        roles:PropTypes.array.isRequired,
        user:PropTypes.object
    }
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render() {
        const {roles,user} = this.props;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span:4},
            wrapperCol: {span:15},
        };
        return (
            <Form {...formItemLayout}>
                <Item label='用户名称'>
                    {
                        getFieldDecorator('username',{
                            initialValue:user.username,
                            rules:[
                                {required:true,message:'用户名称必须输入'}
                            ]
                        })(<Input placeholder='请输入用户名称'></Input>)
                    }                    
                </Item>
                    {
                        user._id?null:(
                            <Item label='密码'>
                                {
                                    getFieldDecorator('password',{
                                        initialValue:user.password,
                                        rules:[
                                            {required:true,message:'密码必须输入'}
                                        ]
                                    })(<Input type='password' placeholder='请输入密码'></Input>)
                                }                    
                            </Item>
                        )
                    }
                
                <Item label='手机号'>
                    {
                        getFieldDecorator('phone',{
                            initialValue:user.phone,
                            rules:[
                                {required:true,message:'手机号必须输入'}
                            ]
                        })(<Input type='number' placeholder='请输入手机号'></Input>)
                    }                    
                </Item>
                <Item label='邮箱'>
                    {
                        getFieldDecorator('email',{
                            initialValue:user.email,
                            rules:[
                                {required:true,message:'邮箱必须输入'}
                            ]
                        })(<Input placeholder='请输入邮箱'></Input>)
                    }                    
                </Item>
                <Item label='角色'>
                    {
                        getFieldDecorator('role_id',{
                            initialValue:user.role_id,
                            rules:[
                                {required:true,message:'角色必须选择'}
                            ]
                        })(
                            <Select placeholder='请选择角色'>
                                {
                                    roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
                                }
                            </Select>
                        )
                    }                    
                </Item>
            </Form>
        );
    }
}

export default Form.create()(UserForm);