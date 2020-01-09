import React, { Component } from 'react'
import { Upload, Icon, Modal,message } from 'antd';
import PropTypes from 'prop-types'
import {reqDeleteImg} from '../../api/index'
import {BASE_IMG_URL} from '../../utils/constants'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
/* 用于图片上传的组件 */
class PicturesWall extends Component {

  static propTypes={
    imgs:PropTypes.array
  }

  state = {
    previewVisible: false,  //标识是否显示大图预览Modal
    previewImage: '',       //大图的URL
    fileList: [],
  };

  constructor(props){
    super(props);
    let fileList = [];
    // 如果传入了imgs属性
    const {imgs} = this.props;
    if (imgs && imgs.length>0) {
      fileList = imgs.map((img,index)=>({
        uid:-index,
        name:img,
        status:'done',
        url:BASE_IMG_URL+img
      }));
    }
    //初始化状态
    this.state = {
      previewVisible:false,
      previewImage:'',
      fileList
    }
  }

  /* 隐藏Modal */
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
      /* 显示指定file对应的大图 */
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  /* 
  file:当前操作的图片文件(上传/删除)
  fileList:所有已上传图片文件对象的数组
  */
  handleChange = async ({ file,fileList }) =>{
    if(file.status === 'done'){
        const result = file.response;
        if(result.status === 0){
          message.success('上传图片成功');
          const {name,url} = result.data;
          file = fileList[fileList.length-1];
          file.name = name;
          file.url = url;
        }else{
          message.success('图片上传失败');
        }
    }else if(file.status === 'removed'){   //删除图片
      const result = await reqDeleteImg(file.name);
      if (result.status ===0) {
        message.success("删除图片成功");
      }else{
        message.error("删除图片失败");
      }
    }
    this.setState({ fileList })
    console.log(fileList);
  };

  /* 获取所有已上传图片文件名的数组 */
  getImgs = ()=>{
    return this.state.fileList.map(file => file.name)
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          action="/manage/img/upload" /* 上传图片的接口地址 */
          accept='image/*'    /* 只接收图片格式 */
          name='image'       /* 请求参数名 */
          listType="picture-card"   /* 卡片样式 */
          fileList={fileList}        /* 所有已上传图片文件对象的数组 */
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
export default PicturesWall;