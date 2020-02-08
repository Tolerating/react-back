import React, { Component } from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils.js'
// import {Route,Switch} from 'react-router-dom'
import {Layout} from 'antd'
import LeftNav from '../../components/left-nav/left-nav';
import Header from '../../components/header/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import NotFound from '../not-found/not-found'
const {Footer,Sider,Content} = Layout;
/* 后台管理的路由组件 */
class Admin extends Component {
    render() {
        const user = memoryUtils.user;
        console.log(user);
        if(!user || !user._id){
            return <Redirect to='/login'/>
        }
        return (
            <Layout style={{minHeight:'100%'}}>
                <Sider>
                    <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Header>header</Header>
                    <Content style={{margin:20,backgroundColor:'#fff'}}>
                        <Switch>
                            <Redirect exact={true} from='/' to='/admin/home'></Redirect>
                            <Route path='/admin/home' component={Home}></Route>
                            <Route path='/admin/category' component={Category}></Route>
                            <Route path='/admin/product' component={Product}></Route>
                            <Route path='/admin/role' component={Role}></Route>
                            <Route path='/admin/user' component={User}></Route>
                            <Route path='/admin/charts/bar' component={Bar}></Route>
                            <Route path='/admin/charts/line' component={Line}></Route>
                            <Route path='/admin/charts/pie' component={Pie}></Route>
                            <Route component={NotFound}></Route>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color:'#ccc'}}>推荐使用谷歌浏览器,可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Admin;