import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {Modal} from 'antd'
// import api from '../../api/index'
import {reqWeather} from '../../api/index'
import menuList from '../../config/menuConfig'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import LinkButton from '../link-button/linkButton'
import './header.less'
class Header extends Component {
    state = {
        currentTime:formateDate(Date.now()),
        dayPictureUrl:'',         //天气图片url
        weather:'',       //天气文本
    }
    getTime = () => {
        this.intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now());
            this.setState({currentTime});
        }, 1000);
    }
    getWeather = async () => {
        const {dayPictureUrl,weather} = await reqWeather('温州');
        this.setState({dayPictureUrl,weather});
    }
    getTitle = () => {
        // 得到当前请求路径
        const path = this.props.location.pathname;
        let title;
        menuList.forEach(item => {
            if(item.key === path){
                title = item.title;
            }else if(item.children){
                const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                if(cItem){
                    title = cItem.title;
                }
            }
        });
        return title;
    }
    logOut = () => {
        Modal.confirm({
            title: '确定退出?',
            onOk:() => {
            //   console.log('OK');
              memoryUtils.user = {};
              localStorage.clear();
              this.props.history.replace('/login');
            },
          });
    }
    /* 
    在第一次render之后执行
    一般在此执行异步操作: 发ajax请求/启动定时器
    */
    componentDidMount(){
        this.getTime();
        this.getWeather();
    }
    /* 
    当前组件卸载之前调用
    */
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }
    render() {
        const {currentTime,dayPictureUrl,weather} = this.state;
        const username = memoryUtils.user.username;
        const title = this.getTitle();
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎,{username}</span>
                    <LinkButton onClick={this.logOut}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="晴"/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);