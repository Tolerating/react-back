import React, { Component } from 'react'
import {Card,Select,Input,Button,Icon,Table} from 'antd'
import LinkButton from '../../components/link-button/linkButton'
const Option = Select.Option;
/* product的默认子路由组件 */
class ProductHome extends Component {
    state = {
        product:[
            {
                status:1,
                _id:1,
                name:'联想ThinkPad 翼480',
                desc:'年度重量级新品,X390、T490全新登场 更加轻薄机身设计',
                price:6600,
                pCategoryId:'12',
                categoryId:'10',
                // detail:'',
                __v:0
            },
            {
                status:1,
                _id:2,
                name:'联想ThinkPad 翼480',
                desc:'年度重量级新品,X390、T490全新登场 更加轻薄机身设计',
                price:6600,
                pCategoryId:'12',
                categoryId:'10',
                // detail:'',
                __v:0
            },
            {
                status:1,
                _id:3,
                name:'联想ThinkPad 翼480',
                desc:'年度重量级新品,X390、T490全新登场 更加轻薄机身设计',
                price:6600,
                pCategoryId:'12',
                categoryId:'10',
                // detail:'',
                __v:0
            },
            {
                status:1,
                _id:4,
                name:'联想ThinkPad 翼480',
                desc:'年度重量级新品,X390、T490全新登场 更加轻薄机身设计',
                price:6600,
                pCategoryId:'12',
                categoryId:'10',
                // detail:'',
                __v:0
            },
            
        ]
    }
    //初始化table的列的数组
    initColumns = ()=>{
        this.columns = [
            {
              title: '商品名称',
              dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render:(price)=>'￥'+price
            },
            {
                title: '状态',
                dataIndex: 'status',
                width:100,
                render:(status)=>{
                    return(
                        <span>
                            <Button type='primary'>下架</Button>
                            <span>在售</span>
                        </span>
                    )
                }
            },
            {
              title: '操作',
              width:100,
              render:(product)=>(
                <span>
                    <LinkButton onClick={()=> this.props.history.push('/admin/product/detail',{product})}>详情</LinkButton>
                    <LinkButton>修改</LinkButton>
                </span>
              )
            }
          ];
    }
    componentWillMount(){
        this.initColumns();
    }

    render() {
        const title = (
            <span>
                <Select value='1' style={{width:150}}>
                    <Option value='1'>按名称搜索</Option>
                    <Option value='2'>按描述搜索</Option>
                </Select>
                <Input placeholder='关键字' style={{width:200,margin:'0 15px'}}/>
                <Button type='primary'>搜索</Button>
            </span>
        );
        const extra = (
            <Button type='primary' onClick={()=>this.props.history.push('/admin/product/addupate')}>
                <Icon type='plus'/>
                添加商品
            </Button>
        );
        const products = this.state.product;
          
          
        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey='_id'                     
                    dataSource={products} 
                    columns={this.columns}/>
            </Card>
        );
    }
}

export default ProductHome;