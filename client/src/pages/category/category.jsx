import React, { Component } from 'react';
import { Card,Table,Button,Icon,Modal,message } from 'antd';
import LinkButton from '../../components/link-button/linkButton'
import AddForm from './add-form'
import UpdateForm from './update-form'
import {reqCategorys,reqUpdateCategory,reqAddCategorys} from '../../api/index'

/* 
分类的路由
*/
class Category extends Component {
    state = {
      loading:false,   //是否正在获取数据
      categorys:[],   //一级分类列表
      subCategorys:[],   //二级分类列表
      parentId:'0',   //当前需要显示的分类列表的父分类ID
      parentName:'',  //当前需要显示的分类列表的父分类名称
      showStatus:0, //标识添加/更新的确认框是否显示,0:都不显示,1:显示添加,2:显示更新
    }

    /* 显示添加的确认框 */
    showAdd=()=>{
      this.setState({
        showStatus:1
      });
    }

    /* 显示更新的确认框 */
    showUpdate = (category) => {
      this.category = category;
      this.setState({
        showStatus:2
      });
    }

    /* 响应点击取消:隐藏确定框 */
    handleCancel = ()=>{
      // 清除输入数据
      this.form.resetFields();
      this.setState({
        showStatus:0
      });
    }

    /* 更新分类 */
    updateCategory = ()=>{

      // 进行表单验证,只有通过了才处理
      this.form.validateFields(async (err,values)=>{
        if(!err){
          /* 隐藏确认框 */
          this.setState({
            showStatus:0
          });
          const categoryId = this.category._id;
          const {categoryName} = values;
          // 清除输入数据
          this.form.resetFields();
          const result = await reqUpdateCategory(categoryId,categoryName);
          if(result.status ===0){
            this.getCategorys();
          }
        }
      });
      
    }

    /* 添加分类 */
    addCategory = async ()=> {
      this.form.validateFields(async (err,values)=>{
        if(!err){
          /* 隐藏确认框 */
          this.setState({
            showStatus:0
          });
          const {parentId,categoryName} = values;
          // 清除输入数据
          this.form.resetFields();
          const result = await reqAddCategorys(parentId,categoryName);
          if(result.status == 0){
            if(parentId === this.state.parentId){
              this.getCategorys();
            }else{
              this.getCategorys('0');
            }        
          }
        }
      });
      
    }

    //初始化Table所有列的数组
    initColumns = ()=>{
      this.columns = [
        {
          title: '分类的名称',
          dataIndex: 'name',
        },
        {
          title: '操作',
          width:300,
          render:(category)=>(
            <span>
                <LinkButton onClick={() =>this.showUpdate(category)}>修改分类</LinkButton>
                {/* 如何定义事件回调函数传递参数:先定义一个匿名函数,在函数调用处理的函数并传递参数 */}
                {this.state.parentId ==='0'?<LinkButton onClick={() =>this.showSubCategorys(category)}>查看子分类</LinkButton>:null}
                
            </span>
          )
        }
      ];
    }

    /* 显示指定一级分类对象的二级子列表 */
    showSubCategorys = (category)=>{
      this.setState({
        parentId:category._id,
        parentName:category.name
      },()=>{
        this.getCategorys();
      });
    }

    /* 显示指定一级分类列表 */
    showCategorys = ()=>{
      this.setState({
        parentId:'0',
        parentName:'',
        subCategorys:[]

      });
    }

    /* 
    异步获取一级/二级分类列表显示 
    parentId:如果没有指定则根据状态中的parentId请求,如果指定了根据指定的请求
    */
    getCategorys = async (parentId)=>{
      //在发请求前,显示loading
      this.setState({loading:true});
      parentId = parentId || this.state.parentId;
      //发异步ajax请求,获取分类列表
      const result = await reqCategorys(parentId);
      //在请求完成后,隐藏loading
      this.setState({loading:false});

      if(result.status === 0){
        const categorys = result.data;
        if(parentId === '0'){
          this.setState({
            categorys
          });
        }else{
          //更新状态
          this.setState({
            subCategorys:categorys
          });
        }
        
      }else{
        message.error('获取分类列表失败');
      }
    }

    /* 为第一次render()准备数据 */
    componentWillMount(){
      this.initColumns();
    }
    /* 执行异步任务:发送异步ajax请求 */
    componentDidMount(){
      this.getCategorys();
    }

    render() {
      let {categorys,loading,subCategorys,parentId,parentName,showStatus} = this.state;
      const category = this.category || {};
      const title = parentId ==='0'?'一级分类列表':(
        <span>
          <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
          <Icon type="arrow-right" style={{marginRight:5}}></Icon>
          <span>{parentName}</span>
        </span>
      );
      const extra = (
          <Button type='primary' onClick={this.showAdd}>
              <Icon type='plus'/>
              添加
          </Button>
      );
      return (
          <Card title={title} extra={extra}>
              <Table
                rowKey='_id'
                loading={loading}                     
                dataSource={parentId==='0'?categorys:subCategorys} 
                columns={this.columns}
                pagination={{defaultPageSize:5,showQuickJumper:true}}
              />
              <Modal
                title="添加分类"
                visible={showStatus === 1}
                onOk={this.addCategory}
                onCancel={this.handleCancel}
              >
                <AddForm categorys={categorys} parentId={parentId} setForm = {(form)=>{this.form = form}}></AddForm>
              </Modal>

              <Modal
                title="更新分类"
                visible={showStatus === 2}
                onOk={this.updateCategory}
                onCancel={this.handleCancel}
              >
                <UpdateForm categoryName={category.name} setForm = {(form)=>{this.form = form}}></UpdateForm>
              </Modal>
          </Card>
          
      );
    }
}

export default Category;