import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import {Menu,Icon} from 'antd'
import menuList from '../../config/menuConfig'
import './left-nav.less'

const SubMenu = Menu.SubMenu;
/* 
左侧导航的组件
*/
class LeftNav extends Component {

    /* 
    根据menu的数据数组生成对应的标签数组
    使用map() + 递归调用
    */
    getMenuNOdes_map = (menuList)=>{
        return menuList.map(item =>{
            if(!item.children){
                return(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>首页</span>
                        </Link>                        
                    </Menu.Item>
                );
            }else {
               return(
                    <SubMenu
                        key={item.key}
                        title={
                        <span>
                            <Icon type={item.icon} />
                        <span>{item.title}</span>
                        </span>
                        }>
                            {this.getMenuNOdes_map(item.children)}
                    </SubMenu>
               );
            }
        });
    }
    /* 
    根据menu的数据数组生成对应的标签数组
    使用reduce() + 递归调用
    */
    getMenuNOdes = (menuList) =>{
        const path = this.props.location.pathname;
        return menuList.reduce((pre,item) => {
            if(!item.children){
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>                        
                    </Menu.Item>
                ));
            }else{
                const cItem = item.children.find(cItem =>path.indexOf(cItem.key) ===0);
                if(cItem){
                    this.openKey = item.key;
                }                
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                        <span>
                            <Icon type={item.icon} />
                        <span>{item.title}</span>
                        </span>
                        }>
                            {this.getMenuNOdes(item.children)}
                    </SubMenu>
                ));
            }
            return pre;
        },[]);
    }

    /* 
    在第一次render()之前执行一次
    为第一次render()准备数据(同步的)
    */
   componentWillMount(){
       this.menuNodes = this.getMenuNOdes(menuList);
   }
    render() {
        let path = this.props.location.pathname;
        const openKey = this.openKey;
        if(path.indexOf('/product') === 0){
            path = '/product';
        }
        return (
            <div className="left-nav">
                <Link to='#' className="left-nav-header">
                    <h1>硅谷后台</h1>
                </Link>
                <Menu
                mode="inline"
                theme="dark"
                selectedKeys={[path]}
                defaultOpenKeys={[openKey]}
                >
                {this.menuNodes}
                
                </Menu>
            </div>
        );
    }
}
/* 
withRotuer高阶组件:
包装非路由㢟,返回一个新的组件
新的组件向非路由组件传递3个属性:history/location/match
*/
export default withRouter(LeftNav);