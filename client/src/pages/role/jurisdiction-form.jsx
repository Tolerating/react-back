import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Form,Input,Tree} from 'antd'
import menuList from '../../config/menuConfig'

const Item = Form.Item;
const { TreeNode } = Tree;
/* 添加分类的form组件 */
export default class JurisdictionForm extends Component {
    static propTypes = {
        role:PropTypes.object
    }

    constructor(props){
        super(props);
        const {menus} = this.props.role;
        // 根据传入的角色的menus生成初始状态
        this.state = {
            checkedKeys:menus
        }
    }

    state = {
        checkedKeys:[]
    }

    /* 为父组件提交获取最新menus数据 */
    getMenus = ()=>this.state.checkedKeys;
    getTreeNodes = (menuList)=>{
        return menuList.reduce((pre,item)=>{
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children?this.getTreeNodes(item.children):null}
                </TreeNode>
            );
            return pre;
        },[])
    }

    onCheck = checkedKeys => {
        console.log("checkedKeys",checkedKeys);
        this.setState({checkedKeys});
    }
    /* 
    当组件接收到新的属性时自动调用
    */
    componentWillReceiveProps(nextProps){
        const menus = nextProps.role.menus;
        this.setState({
            checkedKeys:menus
        });
    }

    componentWillMount(){
        this.treeNodes = this.getTreeNodes(menuList);
    }
    render() {
        const formItemLayout = {
            labelCol: {span:4},
            wrapperCol: {span:15},
        };
        const {role} = this.props;
        const {checkedKeys} = this.state;
        return (
            <Form {...formItemLayout}>
                <Item label='角色名称'>
                   <Input value={role.name} disabled></Input>
                </Item>
                <Tree
                    checkable
                    defaultExpandAll={true}
                    checkedKeys={checkedKeys}
                    // defaultSelectedKeys={['0-0-0', '0-0-1']}
                    // defaultCheckedKeys={['0-0-0', '0-0-1']}
                    // onSelect={this.onSelect}
                    onCheck={this.onCheck}
                >
                    <TreeNode title="平台权限" key="all">
                        {this.treeNodes}
                    </TreeNode>
                </Tree>
            </Form>
        );
    }
}

// export default Form.create()(JurisdictionForm);