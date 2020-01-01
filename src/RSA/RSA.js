import React from 'react';
import reqwest from 'reqwest';
import ReactDOM from 'react-dom';
import {Steps, Button, message,Row} from 'antd';
import { Upload, Icon,Table,Modal} from 'antd';
import axios from 'axios';
import "./RSA.css"
const columns = [
  {
    title: '信息',
    dataIndex: 'name',
    width: '15%',
  },
  {
    title: '数据',
    dataIndex: 'data',
    width: '40%',
  },
  {
    title: '说明',
    dataIndex: 'function',
  },
];
const results = [
  {
    name: 'p',
    data: '',
    function: 'The big random prime p',
  },
  {
    name: 'q',
    data: '',
    function: 'The big random prime q',
  },
  {
    name: 'Euler(n)',
    data: '',
    function: 'The euler number of n((p-1)*(q-1))',
  },
  {
    name: 'e',
    data: '',
    function: 'The random prime e',
  },
  {
    name: 'd',
    data: '',
    function: 'The inverse element of e',
  },
];

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
    title: 'First',
    content: '更新数据【可选】',
  },
  {
    title: 'Second',
    content: '生成密钥',
  },
  {
    title: 'Third',
    content: '生成密文',
  },
  {
    title: 'Last',
    content: '生成明文',
  },
];

export default class RSA extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          current: 0,
          isShow:0,//0代表都不显示，1代表加密密文，2代表解密明文
          loading:false,
          mingwen:'',
          miwen:'',
          data0:[],
        };
    }
      next() {
        const current = this.state.current + 1;
        this.setState({ current });
      }
    
      prev() {
        const current = this.state.current - 1;
        this.setState({ current });
      }
      fetchData = () => {
        fetch("http://127.0.0.1:5000/rsa_p", { method: "GET" })
          .then(res => res.json())
          .then(data => {
            results[0].data=data;
            console.log(results[0].data);
          });
        fetch("http://127.0.0.1:5000/rsa_q", { method: "GET" })
        .then(res => res.json())
        .then(data => {
          results[1].data=data;
        });
        fetch("http://127.0.0.1:5000/rsa_en", { method: "GET" })
          .then(res => res.json())
          .then(data => {
            results[2].data=data;
          });
        fetch("http://127.0.0.1:5000/rsa_e", { method: "GET" })
          .then(res => res.json())
          .then(data => {
            results[3].data=data;
          });
        fetch("http://127.0.0.1:5000/rsa_d", { method: "GET" })
          .then(res => res.json())
          .then(data => {
            results[4].data=data;
          });
          message.success('读入密钥成功!');
        }
      handleClick() {
        ReactDOM.render(
        <div>
          <br/>
        <h4>Info Table</h4>
        <Table columns={columns} dataSource={results} />
        </div>,
        document.getElementById('container'));
        message.success('显示密钥成功!');
      }
      showSecret = () => {
        this.setState({
            isShow:1,
        });
        var url='http://127.0.0.1:5000/RSAsec';
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
        var url='http://127.0.0.1:5000/RSAobv1';
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
      render() {
        const { current,isShow,miwen,mingwen } = this.state;
        return (
          <div>
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
                {current===1&&(
                    <Row>
                    <Button type="primary" size='large' className='nbutton' onClick={this.fetchData}>
                        读入密钥</Button>   
                    <br />   
                    <br />
                    <Button type="primary" size='large' className='nbutton' onClick={this.handleClick}>
                        显示密钥</Button>
                    <div id="container"></div>   
                    <br />
                    <br />
                    </Row>
                )}
                {current===2&&(
                    <Row>
                    <Button type="primary" size='large' className='nbutton'onClick={this.showSecret}>
                      加密
                    </Button>
                    <br /><br /><br />
                    <Modal
                      title="加密密文"
                      visible={isShow===1}
                      onOk={this.Secret}
                      onCancel={this.handleCancel}
                  >
                      <h2>{miwen}</h2>
                    </Modal>
                    </Row>
                )}
                {current===3&&(
                    <Row>
                    <Button type="primary" size='large' className='nbutton'onClick={this.showMing}>
                      解密
                    </Button>
                    <br /><br /><br />
                    <Modal
                      title="解密明文"
                      visible={isShow===2}
                      onOk={this.Ming}
                      onCancel={this.handleCancel}
                  >
                      <h2>{mingwen}</h2>
                    </Modal>
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