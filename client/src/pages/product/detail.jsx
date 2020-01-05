import React, { Component } from 'react';
import {Card,Icon,List} from 'antd'
import LinkButton from '../../components/link-button/linkButton'
const Item = List.Item;
/* Product的详情子路由组件 */
class ProductDetail extends Component {
    render() {
        const {product} = this.props.location.state;
        console.log(product);
        const title = (
            <span>
                <LinkButton>
                    <Icon type='arrow-left' style={{marginRight:15,fontSize:20}}
                        onClick={()=>this.props.history.goBack()}></Icon>
                </LinkButton>
                <span>商品详情</span>
            </span>
        );
        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <span className='left'>商品名称:</span>
                        <span>联想ThinkPad 翼480</span>
                    </Item>
                    <Item>
                        <span className='left'>商品描述:</span>
                        <span>联想ThinkPad 翼480</span>
                    </Item>
                    <Item>
                        <span className='left'>商品价格:</span>
                        <span>联想ThinkPad 翼480</span>
                    </Item>
                    <Item>
                        <span className='left'>所属分类:</span>
                        <span>电脑 --> 笔记本</span>
                    </Item>
                    <Item>
                        <span className='left'>商品图片:</span>
                        <span>
                            <img src="" alt="" className='product-img'/>
                            <img src="" alt="" className='product-img'/>
                        </span>
                    </Item>
                </List>
            </Card>
        );
    }
}

export default ProductDetail;