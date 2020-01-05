import React, { Component } from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
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

const {Footer,Sider,Content} = Layout;
/* 后台管理的路由组件 */
class Admin extends Component {
    render() {
        return (
            <Layout style={{height:'100%'}}>
                <Sider>
                    <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Header>header</Header>
                    <Content style={{margin:20,backgroundColor:'#fff'}}>
                        <Switch>
                            <Route path='/home' component={Home}></Route>
                            <Route path='/category' component={Category}></Route>
                            <Route path='/product' component={Product}></Route>
                            <Route path='/role' component={Role}></Route>
                            <Route path='/user' component={User}></Route>
                            <Route path='/charts/bar' component={Bar}></Route>
                            <Route path='/charts/line' component={Line}></Route>
                            <Route path='/charts/pie' component={Pie}></Route>
                            <Redirect to='/home'></Redirect>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color:'#ccc'}}>推荐使用谷歌浏览器,可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Admin;