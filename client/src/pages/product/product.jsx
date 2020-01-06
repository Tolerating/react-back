import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
import ProductHome from './home'
import ProductAddUpdate from './add-update'
import ProductDetail from './detail'
import './product.less'

/* 商品路由 */
class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path='/admin/product' component={ProductHome} exact></Route>
                <Route path='/admin/product/addupate' component={ProductAddUpdate}></Route>
                <Route path='/admin/product/detail' component={ProductDetail}></Route>
                <Redirect to='/admin/product'/>
            </Switch>
        );
    }
}

export default Product;