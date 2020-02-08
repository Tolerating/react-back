import React, { Component } from 'react';
import {Card,Button,Table,Modal,message} from 'antd'
import {PAGE_SIZE} from '../../utils/constants.js'
import userStronge from '../../utils/storageUtils.js'
import {formateDate} from '../../utils/dateUtils.js'
import {reqRoles,reqAddRole,reqUpdateRole} from '../../api/index'
import AddForm from './add-form'
import JurisdictionForm from './jurisdiction-form'
import memoryUtils from '../../utils/memoryUtils.js';
import storageUtils from '../../utils/storageUtils.js';
/* 角色路由 */
class Role extends Component {
    state = {
        roles:[],         //所有角色的列表
        role:{},          // 选中的role
        isShowAdd:false,       //是否显示添加界面
        isShowJurisdiction:false,    //是否显示设置角色权限界面
    }

    constructor(props){
        super(props);
        this.jurisdiction = React.createRef();
    }
    /* 响应点击取消:隐藏确定框 */
    handleCancel = ()=>{
        // 清除输入数据
        // this.form.resetFields();
        
    }

    /* 添加角色 */
    addRole = ()=>{
        // 进行表单验证,只能通过了才向下处理
        this.form.validateFields(async (err,values)=>{
            console.log(this.form);
            
            if (!err) {
                this.setState({isShowAdd:false});
                // 收集输入数据
                const {roleName} = values;
                this.form.resetFields();

                // 请求添加
                const result = await reqAddRole(roleName);
                if (result.status === 0) {
                    message.success('添加成功');
                    // this.getRoles();
                    // 更新roles状态
                    const role = result.data;
                    // const roles = [...this.state.roles];
                    // roles.push(role);
                    // this.setState({
                    //     roles
                    // });
                    // 更新roles状态,基于原本状态数据更新
                    this.setState(state=>({
                        roles:[this.state.roles,role]
                    }))
                }else{
                    message.error('添加失败');
                }
                // 根据结果提示/更新列表显示
            }
        });
    }

    updateRole = async ()=>{
        this.setState({isShowJurisdiction:false});
        const authInfo = userStronge.getUser();
        const role = this.state.role;
        // 得到最新的menus
        const menus = this.jurisdiction.current.getMenus();
        role.menus = menus;
        role.auth_time = new Date().getTime();
        role.auth_name = authInfo.username;

        // 请求更新
        const result = await reqUpdateRole(role);
        if (result.status===0) {
            // 如果当前更新的是自己角色的权限,强制退出
            if (role._id === memoryUtils.user.role_id) {
                memoryUtils.user = {};
                storageUtils.removeUser();
                this.props.history.replace('/login');
                message.success('当前用户角色权限修改了,重新登录');
            }else{
                message.success('设置角色权限成功');
                this.setState({
                    roles:[...this.state.roles]
                });
            }
           
        }else{
            message.error('设置角色权限失败')
        }
    }

    initColumn = ()=>{
        this.columns = [
            {
                title:'角色名称',
                dataIndex:'name'
            },
            {
                title:'创建时间',
                dataIndex:'create_time',
                render:(create_time)=>formateDate(create_time)
            },
            {
                title:'授权时间',
                dataIndex:'auth_time',
                render:formateDate
            },
            {
                title:'授权人',
                dataIndex:'auth_name'
            },
        ]
    }

    // 获取所有角色列表
    getRoles = async ()=>{
        const result = await reqRoles();
        if (result.status === 0) {
            const roles = result.data;
            this.setState({
                roles
            })
        }
    }

    onRow = (role)=>{
        return {
            onClick:event =>{       //点击行
                console.log('row onClick',role);
                this.setState({
                    role
                })
            }
        }
    }

    componentWillMount(){
        this.initColumn();
    }

    componentDidMount(){
        this.getRoles();
    }

    render() {
        const {roles,role,isShowAdd,isShowJurisdiction} = this.state;
        const title = (
            <span>
                <Button type='primary' onClick={()=>this.setState({isShowAdd:true})}>创建角色</Button> &nbsp;&nbsp;
                <Button type='primary' onClick={()=>this.setState({isShowJurisdiction:true})} disabled={!role._id}>设置角色权限</Button>
            </span>
        )
        
        return (
            <Card title={title}>
                <Table
                    rowKey='_id'
                    // loading={loading}                     
                    dataSource={roles} 
                    columns={this.columns}
                    pagination={{defaultPageSize:PAGE_SIZE,showQuickJumper:true}}
                    rowSelection={{
                        type:'radio',
                        selectedRowKeys:[role._id],
                        onSelect:(role) =>{
                            this.setState({
                                role
                            });
                        }
                        
                    }}
                    onRow={this.onRow}
                />
                <Modal
                    title="添加角色"
                    visible={isShowAdd}
                    onOk={this.addRole}
                    onCancel={() => {
                        this.setState({isShowAdd:false})
                        this.form.resetFields();
                    }}
                >
                    <AddForm setForm={(form)=>{this.form = form}}></AddForm>
                </Modal>
                <Modal
                    title="设置权限"
                    visible={isShowJurisdiction}
                    onOk={this.updateRole}
                    onCancel={() => {
                        this.setState({isShowJurisdiction:false});
                    }}
                >
                    <JurisdictionForm ref={this.jurisdiction} role={role}></JurisdictionForm>
                </Modal>
            </Card>
        );
    }
}

export default Role;