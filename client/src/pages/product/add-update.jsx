import React, { Component } from 'react'
import {Card,Icon,Form,Input,Cascader,Upload,Button} from 'antd'
import LinkButton from '../../components/link-button/linkButton'
const {Item} = Form;
const {TextArea} = Input;
/* product的添加和更新的子路由组件 */
class ProductAddUpdate extends Component {
    render() {
        const title = (
            <span>
                <LinkButton>
                    <Icon type='arrow-left' style={{marginRight:15,fontSize:20}}
                        onClick={()=>this.props.history.goBack()}></Icon>
                </LinkButton>
                <span>添加商品</span>
            </span>
        );
        return (
            <Card title={title} className='product-detail'>

            </Card>
        );
    }
}

export default ProductAddUpdate;