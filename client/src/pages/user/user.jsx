import React, { Component } from 'react';
import {Card,Button,Table,Modal,message} from 'antd'
import {formateDate} from '../../utils/dateUtils.js'
import LinkButton from '../../components/link-button/linkButton'
import UserForm from './user-form'
import {PAGE_SIZE} from '../../utils/constants'
import {reqUsers,reqAddOrUpdateUser, reqDeleteUser} from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'

/* 用户路由 */
class User extends Component {
    state={
        users:[],      //所有用户列表
        roles:[],       //所有角色的列表
        isShow:false,
    }

    initColumns = ()=>{
        this.columns = [
            {
                title:'用户名',
                dataIndex:'username'
            },
            {
                title:'邮箱',
                dataIndex:'email'
            },
            {
                title:'电话',
                dataIndex:'phone'
            },
            {
                title:'注册时间',
                dataIndex:'create_time',
                render:formateDate
            },
            {
                title:'所属角色',
                dataIndex:'role_id',
                render:(role_id)=>this.roleNames[role_id]
            },
            {
                title:'操作',
                render:(user) =>(
                    <span>
                        <LinkButton onClick={()=>this.showUpdate(user)}>修改</LinkButton>
                        <LinkButton onClick={()=>this.deleteUser(user)}>删除</LinkButton>
                    </span>
                )
            },
        ]
    }

    /* 显示更新用户界面 */
    showUpdate = (user)=>{
        this.user = user;
        this.setState({isShow:true});
    }

    /* 显示添加用户界面 */
    showAdd = ()=>{
        this.user = null;
        this.setState({isShow:true});
    }

    /* 根据roles的数组,生成包含所有角色名的对象(属性名用角色id值) */
    initRoleNames = (roles)=>{
        const roleNames = roles.reduce((pre,role)=>{
            pre[role._id] = role.name;
            return pre;
        },{});
        // 保存
        this.roleNames = roleNames;
    }
    /* 添加/更新用户 */
    addOrUpdateUser = ()=>{
        this.form.validateFields(async (err,values)=>{
            
            if (!err) {
                this.form.resetFields();
                this.setState({isShow:false});
                console.log(values);
                if (this.user) {
                    values._id = this.user._id;
                }
                const result = await reqAddOrUpdateUser(values);
                if (result.status===0) {
                    message.success(`${this.user?'修改':'添加'}用户成功`);
                    this.getUsers();
                }
            }
        });
    }

    /* 删除用户 */
    deleteUser = (user)=>{
        Modal.confirm({
            title:`确认删除${user.username}`,
            onOk: async ()=>{
                const result = await reqDeleteUser(user._id);
                if (result.status===0) {
                    message.success('删除用户成功');
                    this.getUsers();
                }
            }
        });
    }

    /* 获取所有用户列表 */
    getUsers = async ()=>{
        const id = memoryUtils.user._id;
        const result =  await reqUsers(id);
        if (result.status === 0) {
            const {users,roles} = result.data;
            this.initRoleNames(roles);
            this.setState({
                users,
                roles
            });
        }
    }

    componentWillMount(){
        this.initColumns();
    }

    componentDidMount(){
        this.getUsers();
    }

    render() {
        const {users,roles,isShow} = this.state;
        const user = this.user || {};
        const title = <Button type='primary' onClick={()=>this.showAdd()}>添加用户</Button>
        return (
            <Card title={title}>
                <Table
                rowKey='_id'
                // loading={loading}                     
                dataSource={users} 
                columns={this.columns}
                pagination={{defaultPageSize:PAGE_SIZE}}
              />
              <Modal
                title={user._id?'修改用户':'添加用户'}
                visible={isShow}
                onOk={this.addOrUpdateUser}
                onCancel={()=>{
                    this.form.resetFields();
                    this.setState({isShow:false})
                }}
              >
                  <UserForm 
                    setForm={form => this.form = form}
                    roles={roles}
                    user={user}
                  />
              </Modal>
            </Card>
        );
    }
}

export default User;