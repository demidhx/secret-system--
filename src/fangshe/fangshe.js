import React from 'react';
import {Icon,Button,Row,Col,Modal} from 'antd';
import {Steps, message,Upload} from 'antd';
const props = {
    name: 'file',
    action: 'http://127.0.0.1:5000/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
const { Step } = Steps;
const steps = [
    {
        title:'First',
        content:'更新数据【可选】'
    },
    {
        title: 'Second',
        content: '读入密钥',
    },
    {
        title: 'Third',
        content: '生成密文',
    },
    {
        title:'Last',
        content:'生成明文'
    },
];
export default class Fangshe extends React.Component{
    state = {
        size: 'large',
        isShow:0,//0代表都不显示，1代表加密密文，2代表解密明文
        current:0,
        mingwen:'',
        miwen:'',
    };

    showSecret = () => {
        this.setState({
           isShow:1,
        });
        var url='http://127.0.0.1:5000/Affine_sec';
        var responseData = fetch(url);
        responseData.then((response)=>{
            var responseData2 = response.json();
            console.log(responseData2);
            responseData2.then((response)=>{
                console.log(response);
                this.setState({
                        miwen:response,
                    }
                )
            });
        },(error)=>{
            return error;
        });
    };

    showMing = () => {
        this.setState({
            isShow:2,
        });
        var url='http://127.0.0.1:5000/Affine_obv';
        var responseData = fetch(url);
        responseData.then((response)=>{
            var responseData2 = response.json();
            console.log(responseData2);
            responseData2.then((response)=>{
                console.log(response);
                this.setState({
                        mingwen:response,
                    }
                )
            });
        },(error)=>{
            return error;
        });
    };

    handleCancel = () => {
        this.setState({
            isShow:0,
        });
    };
   Secret=()=>{
       this.setState({
           isShow:0,
       });

   }
   Ming=()=>{
       this.setState({
           isShow:0,
       });

   }
   readKey=()=>{
       message.success('读入密钥成功!');
   }
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    render()
    {
        const { size,isShow,miwen,mingwen ,current} = this.state;
        return (
            <div >
                <Modal
                    title="加密密文"
                    visible={isShow===1}
                    onOk={this.Secret}
                    onCancel={this.handleCancel}
                >
                    <h2>{miwen}</h2>
                </Modal>

                <Modal
                    title="解密明文"
                    visible={isShow===2}
                    onOk={this.Ming}
                    onCancel={this.handleCancel}
                >
                    <h2>{mingwen}</h2>
                </Modal>

                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content">
                    <br/>
                    <Row>
                        {steps[current].content}
                    </Row>
                    <br/>
                </div>

                <div className="steps-action">
                {current===0&&
                      (<div>
                          <Row>
                          <span style={{ color:'#5c5858',fontSize:'16px'}} >请上传xml数据文件:</span>
                          <br />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                          <Upload {...props}>
                          <br />
                          <Button>
                            <Icon type="upload" /> Upload
                          </Button>
                          </Upload>
                          </Row>
                          <br /><br /><br />
                      </div>)
                }
                    {current==1 &&(
                        <Row>
                            <Button type="primary" size='large' className='nbutton' onClick={this.readKey} >
                                读入密钥</Button>
                            <br /><br /><br />
                        </Row>
                    )

                    }

                    {current===2&&(
                        <Row>
                            <Button type="primary" size='large' className='nbutton' onClick={this.showSecret} >
                                加密</Button>
                            <br /><br /><br />
                        </Row>
                    )}
                    {current===3&&(
                        <Row>
                            <Button type="primary" size='large' className='nbutton' onClick={this.showMing}>
                                解密</Button>
                            <br /><br /><br />
                        </Row>
                    )}
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            Previous
                        </Button>
                    )}
                </div>



            </div>
        );
    }
}