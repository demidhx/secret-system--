import React from 'react'
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import './home.css'
class Home extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleUser =this.handleUser.bind(this);
        this.handlePass =this.handlePass.bind(this);

    }
    handleSubmit = (event) => {

        event.preventDefault()
        //对所有表单字段进行检验
        this.props.form.validateFields(async (err, values) => {
            const {username,password} =values
            console.log('提交登录的ajax请求', values);
            if(username==='admin')
            {
                if(password==='123')
                {
                    const  history = this.props.history;
                    history.push({pathname:'/home'})
                    message.success("登录成功！")

                }
            }
            /*if (!err) {
                //console.log('提交登录的ajax请求', values);
                const {username,password} =values
                const response = await reqLogin(username,password)
                //console.log('请求成功',response.data)
                const result = response.data
                if(result.status===0){
                    message.success('登录成功')

                    const user = result.data
                    memoryUtils.user = user

                    this.props.history.replace('/')

                }else{
                    message.error(result.msg)
                }

            }else{
                console.log('检验失败！')
            }*/
        });

    }


    validatePwd = (rule,value,callback) => {
        console.log('validatePwd()',rule,value)
        if(!value){
            callback('密码必须输入')
        }else if(value.length<4){
            callback('密码长度不能小于4位')
        }else if(value.length>12){
            callback('密码长度不能大于12位')
        }else if(!/^[a-zA-Z0-9]+$/.test(value)){
            callback('密码必须是英文，数字或下划线组成')
        }else{
            callback()//验证通过
        }
    }
    handleUser(e)
    {
        this.setState({
            username:e.target.value
        })
    }
    handlePass(e)
    {
        this.setState({
            username:e.target.value
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {username,password} = this.state;
        return (
        <div className='login'>
            <header className='login-header'>
                <h1>密码学系统</h1>
            </header>
            <section className='login-content'>

            <h2>&nbsp;  &nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;用户登陆</h2>
            <Form onSubmit={this.handleSubmit} className="login-form">

                <Form.Item>
                    &nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username" className="inputID" onChange={this.handleUser}

                        />
                    )}
                </Form.Item>
                <Form.Item>
                    &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                            className="inputPW"

                            onChange={this.handlePass}
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="logButton">
                        登录
                    </Button>
                </Form.Item>
            </Form>
            </section>
        </div>
        );
    }
}
const WrappedRegistrationForm = Form.create()(Home);
export default WrappedRegistrationForm;



