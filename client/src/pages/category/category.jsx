import React, { Component } from 'react';
import { Card,Table,Button,Icon } from 'antd';
import LinkButton from '../../components/link-button/linkButton'

/* 
分类的路由
*/
class Category extends Component {
    render() {
        const title = '一级分类列表';
        const extra = (
            <Button type='primary'>
                <Icon type='plus'/>
                添加
            </Button>
        );
        const dataSource = [
            {
              parentId: '10',
              id: '1',
              name: '电视',
              __v: 0,
            },
            {
                parentId: '11',
                id: '2',
                name: '洗衣机',
                __v: 0,
              },
              {
                parentId: '12',
                id: '3',
                name: '空调',
                __v: 0,
              },
          ];
          
          const columns = [
            {
              title: '分类的名称',
              dataIndex: 'name',
            },
            {
              title: '操作',
              width:300,
              render:()=>(
                <span>
                    <LinkButton>修改分类</LinkButton>
                    <LinkButton>查看子分类</LinkButton>
                </span>
              )
            }
          ];
          
        return (  

            <Card title={title} extra={extra}>
                <Table
                    rowKey='id'                     
                    dataSource={dataSource} 
                    columns={columns}/>
            </Card>
        );
    }
}

export default Category;