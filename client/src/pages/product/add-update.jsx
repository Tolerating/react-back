import React, { Component } from 'react'
import {Card,Icon,Form,Input,Cascader,Upload,Button} from 'antd'
import LinkButton from '../../components/link-button/linkButton'
import {reqCategorys} from '../../api/index'
const {Item} = Form;
const {TextArea} = Input;
const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      isLeaf: false,
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      isLeaf: false,
    },
  ];
/* product的添加和更新的子路由组件 */
class ProductAddUpdate extends Component {
    state = {
        options:[],
    };
    // 验证价格的自定义验证函数
    validatePrice = (rule,value,callback)=>{
        if(value*1 > 0){
            callback(); //验证通过
        }else{
            callback('价格必须大于1');
        }
    }

    initOptions = (categorys)=>{
        //根据categorys生成options数组
        const options = categorys.map(c =>({
            value: c._id,
            label: c.name,
            isLeaf: false,  //不是叶子
        }));

        this.setState({
            options
        });
    }

    //异步获取一级/二级分类表并显示
    getCategorys = async (parentId)=>{
        const result = await reqCategorys(parentId);
        if(result.status === 0){
            const categorys = result.data;
            if(parentId === '0'){  //一级列表
                this.initOptions(categorys);
            }else{  //二级列表
                return categorys   //返回二级列表,  当前async函数返回的promise就会成功且value为categorys
            }
            this.initOptions(categorys);
        }
    }

    //用于加载下一级列表的回调函数
    loadData = async selectedOptions => {
        //得到选择的option对象
        const targetOption = selectedOptions[selectedOptions.length - 1];
        //显示loading
        targetOption.loading = true;
    
        //根据选中的分类,请求获取二级分类列表
        const subCategorys = await this.getCategorys(targetOption.value);
        targetOption.loading = false;
        if(subCategorys && subCategorys.length > 0){
            //生成当前一个二级列表的options
            const childOptions = subCategorys.map(c =>({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }));
            //关联到当前option上
            targetOption.children = childOptions;
        }else{
            targetOption.isLeaf = true;
        }
        
        this.setState({
        options: [...this.state.options],
        });
      };

    submit = ()=>{
        // 进行表单验证,如果通过了,才发送请求
        this.props.form.validateFields((error,values)=>{
            if(!error){
                alert("发送ajax请求");
            }
        });
    }


    componentDidMount(){
        this.getCategorys('0');
    }
    render() {
        const formItemLayout = {
            labelCol: {span:2},
            wrapperCol: {span:8},
          };
        const title = (
            <span>
                <LinkButton>
                    <Icon type='arrow-left' style={{marginRight:15,fontSize:20}}
                        onClick={()=>this.props.history.goBack()}></Icon>
                </LinkButton>
                <span>添加商品</span>
            </span>
        );
        const {getFieldDecorator} = this.props.form;
        return (
            <Card title={title} className='product-detail'>
                <Form {...formItemLayout}>
                    <Item label='商品名称'>
                        {
                            getFieldDecorator('name',{
                                initialValue:'',
                                rules:[
                                    {required:true,message:'必须输入商品名称'}
                                ]
                            })(<Input placeholder='商品名称'/>)
                        }                        
                    </Item>
                    <Item label='商品描述'>
                        {
                            getFieldDecorator('desc',{
                                initialValue:'',
                                rules:[
                                    {required:true,message:'必须输入商品描述'}
                                ]
                            })(<TextArea placeholder="请输入商品描述" autoSize={{ minRows: 2, maxRows: 6 }} />)
                        }
                        
                    </Item>
                    <Item label='商品价格'>
                        {
                            getFieldDecorator('price',{
                                initialValue:'',
                                rules:[
                                    {required:true,message:'必须输入商品价格'},
                                    {validator:this.validatePrice}
                                ]
                            })(<Input type='number' placeholder='商品价格' addonAfter='元'/>)
                        }
                        
                    </Item>
                    <Item label='商品分类'>
                    <Cascader
                        options={this.state.options}   //需要显示的列表数据数组
                        loadData={this.loadData}  //当选择某个列表项,加载下一级列表的监听回调
                    />
                    </Item>
                    <Item label='商品图片'>
                        <Input type='number' placeholder='商品名称' addonAfter='元'/>
                    </Item>
                    <Item label='商品详情'>
                        <Input type='number' placeholder='商品名称' addonAfter='元'/>
                    </Item>
                    <Item>
                        <Button type='primary' onClick={()=>this.submit()}>提交</Button>
                    </Item>
                </Form>
            </Card>
        );
    }
}

export default Form.create()(ProductAddUpdate);