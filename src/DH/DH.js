import React from 'react';
import ReactDOM from 'react-dom';
import { Input, InputNumber,Button,Row,Col,Modal ,notification } from 'antd';
import {Steps,message,Collapse, Icon} from 'antd';
import axios from 'axios';
import request from'request'
const { Panel } = Collapse;
const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0, 
    overflow: 'hidden',
  };

const close = () => {
    console.log(
        'Notification was closed. ',
    );
};

const { Step } =Steps;
const steps = [
    {
        title: 'First',
        content: 'Alice选取明文',//1.输入明文m给服务端加密
    },
    {
        title: 'Second',
        content: 'DH协商密钥',//1.展示默认参数a 2.接收服务端传来的大素数，3.最后密钥协商展示密钥
    },
    {
        title: 'Third',
        content: 'Alice生成密文并发送',//2.返回显示加密密文
    },
    {
        title: 'Last',
        content: 'Bob解密并验证',//3.发送密文给服务器进行解密
    },
];

export default class DH extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            disabled: true,
            current:0,
            show:0,
            Msg:'',
            data1:'',
            data2:'',
            data3:'',
            data4:'',
            data5:'',
            data6:'',
            KeyA:'未选取',
            KeyB:'未选取',
            KeyAll:'未生成',
            RC4mi:'',
            RC4ming:'未获取',
            Hash:'未获取',
            Sign:'未获取',
        };
        this.Submmit =this.Submmit.bind(this);
    }


    Receive=()=>{
        this.setState({
            show:1,
        });
    }
    showDH =()=>{
        this.setState(
            {
                show:2,
            }
        )
    }
    showData=()=>{
        this.setState(
            {
                show:3,
            }
        )
        var url='http://127.0.0.1:5000/DH_encry';
        var responseData = fetch(url);
        responseData.then((response)=>{
            var responseData2 = response.json();
            console.log(responseData2);
            responseData2.then((response)=>{
                console.log('response',response);
                this.setState({
                        RC4mi:response,
                    }
                )
            });
        },(error)=>{
            return error;
        });

    }
    showMing=()=>{
        var url='http://127.0.0.1:5000/DH_decry';
        var responseData = fetch(url);
        responseData.then((response)=>{
            var responseData2 = response.json();
            console.log(responseData2);
            responseData2.then((response)=>{
                console.log('response',response);
                this.setState({
                        data4:response,
                    }
                )
            });
        },(error)=>{
            return error;
        });
    }
    showSign=()=>{
        var url='http://127.0.0.1:5000/DH_hashre';
        var responseData = fetch(url);
        responseData.then((response)=>{
            var responseData2 = response.json();
            console.log(responseData2);
            responseData2.then((response)=>{
                console.log('response',response);
                this.setState({
                        data5:response,
                    }
                )
            });
        },(error)=>{
            return error;
        });
    }

    showHash =()=>{
        var url='http://127.0.0.1:5000/DH_hashre1';
        var responseData = fetch(url);
        responseData.then((response)=>{
            var responseData2 = response.json();
            console.log(responseData2);
            responseData2.then((response)=>{
                console.log('response',response);
                this.setState({
                        data6:response,
                    }
                )
            });
        },(error)=>{
            return error;
        });
    }

    BobShow=()=>{
        this.showMing();
        this.showSign();
        this.showHash();
        message.success('获取信息成功!');
    }

    
    Bobhandle=()=>{
        var temp1='';
        for(var i=0;i<this.state.data4.length;i++){
            temp1+=this.state.data4[i];
            if(i!=0 && i%90==0)temp1+='\n';
        }
        this.setState({
            RC4ming:temp1,
        })
        var temp2='';
        for(var i=0;i<this.state.data5.length;i++){
            temp2+=this.state.data5[i];
            if(i!=0 && i%90==0)temp2+='\n';
        }
        this.setState({
            Sign:temp2,
        })
        var temp3='';
        for(var i=0;i<this.state.data6.length;i++){
            temp3+=this.state.data6[i];
            if(i!=0 && i%90==0)temp3+='\n';
        }
        this.setState({
            Hash:temp3,
        })
    }

    handleCancel = () => {
        this.setState({
            show:0,
        });
    };

    Submmit(e){
        console.log(e.target.value)
        this.setState({
            Msg:e.target.value,
        });
    }
    ConfirmMsg =()=>{
        var msg=this.state.Msg;
        console.log('提交的明文：',msg)
        request.post('http://127.0.0.1:5000/registerP').form({Mingwen:msg})
        message.success('明文已提交成功!');
    }

    openNotification1 = () => {
        var url='http://127.0.0.1:5000/DH_Alice_pubkey';
        var responseData = fetch(url);
        responseData.then((response)=>{
            var responseData2 = response.json();
            console.log(responseData2);
            responseData2.then((response)=>{
                console.log('response',response);
                this.setState({
                    data1:response,
                })
            });
        },(error)=>{
            return error;
        });
    };
    openNotification2 = () => {
        var url='http://127.0.0.1:5000/DH_Bob_pubkey';
        var responseData = fetch(url);
        responseData.then((response)=>{
            var responseData2 = response.json();
            console.log(responseData2);
            responseData2.then((response)=>{
                console.log('response',response);
                this.setState({
                        data2:response,
                    }
                )
            });
        },(error)=>{
            return error;
        });
    };
    openNotification3 = () => {
        var url='http://127.0.0.1:5000/DH_Authen_key';
        var responseData = fetch(url);
        responseData.then((response)=>{
            var responseData2 = response.json();
            console.log(responseData2);
            responseData2.then((response)=>{
                console.log('response',response);
                this.setState({
                        data3:response,
                    }
                )
            });
        },(error)=>{
            return error;
        });

    };

    openNotification = () =>{
        this.openNotification1();
        this.openNotification2();
        this.openNotification3();
        message.success('获取信息成功!');
    }
    handle=()=>{
        var temp1='';
        for(var i=0;i<this.state.data1.length;i++){
            temp1+=this.state.data1[i];
            if(i!=0 && i%90==0)temp1+='\n';
        }
        this.setState({
            KeyA:temp1,
        })
        var temp2='';
        for(var i=0;i<this.state.data2.length;i++){
            temp2+=this.state.data2[i];
            if(i!=0 && i%90==0)temp2+='\n';
        }
        this.setState({
            KeyB:temp2,
        })
        var temp3='';
        for(var i=0;i<this.state.data3.length;i++){
            temp3+=this.state.data3[i];
            if(i!=0 && i%90==0)temp3+='\n';
        }
        this.setState({
            KeyAll:temp3,
        })
    }
    DHOK =()=>{
        this.setState({
            show:0,
        });
    }
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    render() {
        const { current,show ,Msg,KeyB,KeyA,KeyAll,RC4mi,RC4ming,Hash,Sign} = this.state;
        return (
            <div >
                <h2 className='DH'>交互过程展示</h2>

                <Modal
                    title="输入需加密明文"
                    visible={show===1}
                    onOk={this.handleCancel}
                    onCancel={this.handleCancel}
                >
                    <Input onChange={this.Submmit}/>
                    <br/>
                    <br/>
                    <Button onClick={this.ConfirmMsg}>确定</Button>
                </Modal>

                <Modal
                    title="接收密文"
                    visible={show===3}
                    onOk={this.handleCancel}
                    onCancel={this.handleCancel}
                >
                    {RC4mi}
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
                    {current===0&&(
                        <Row>
                            <Button type="primary" size='large' className='nbutton' onClick={this.Receive}>
                                输入明文</Button>
                            <br /><br /><br />
                        </Row>
                    )}
                    {current===1&&(
                        <Row>
                            <Button type="primary" onClick={this.openNotification}>获取交互信息</Button>
                            <br/><br/>
                            <Button type="primary" onClick={this.handle}>展示交互信息</Button>
                            <br/><br/>
                            <Collapse
                            bordered={false}
                            defaultActiveKey={['1']}
                            expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 180 : 0} />}
                            >
                            <Panel header="Alice的DH参数" key="1" style={customPanelStyle}>
                                <p>{KeyA}</p>
                            </Panel>
                            <Panel header="Bob的DH参数" key="2" style={customPanelStyle}>
                                <p>{KeyB}</p>
                            </Panel>
                            <Panel header="DH协商密钥" key="3" style={customPanelStyle}>
                                <p>{KeyAll}</p>
                            </Panel>
                            </Collapse>
                            <div id="container"></div>  
                            <br /><br /><br />
                        </Row>
                    )}
                    {current===2&&(
                        <Row>
                            <Button type="primary" size='large' className='nbutton' onClick={this.showData}>
                                显示密文</Button>
                            <br /><br /><br />
                        </Row>
                    )}
                    {current===3&&(
                        <Row>
                            <Button type="primary" onClick={this.BobShow}>获取交互信息</Button>
                            <br/><br/>
                            <Button type="primary" onClick={this.Bobhandle}>展示交互信息</Button>
                            <br/><br/>
                            <Collapse
                            bordered={false}
                            defaultActiveKey={['1']}
                            expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 180 : 0} />}
                            >
                            <Panel header="Bob的会话密钥解密" key="1" style={customPanelStyle}>
                                <p>{RC4ming}</p>
                            </Panel>
                            <Panel header="Bob获取的哈希结果" key="2" style={customPanelStyle}>
                                <p>{Sign}</p>
                            </Panel>
                            <Panel header="Bob生成的哈希结果" key="3" style={customPanelStyle}>
                                <p>{Hash}</p>
                            </Panel>
                            </Collapse>
                            <div id="container"></div>  
                            <br /><br /><br />
                        </Row>
                            // <Button type="primary" size='large' className='nbutton' onClick={this.showMing}>
                            //     解密</Button>
                            // <br /><br />
                            //  <Button type="primary" size='large' className='nbutton' onClick={this.showOrgin}>
                            //      原文</Button>
                            // <br /><br />
                            //  <Button type="primary" size='large' className='nbutton' onClick={this.showSign}>
                            //      数字签名</Button>
                            // <br />    <br /><br />  
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