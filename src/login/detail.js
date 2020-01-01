import React from 'react';
import {BrowserRouter, Route, Switch,Redirect} from 'react-router-dom';
import Rightcontent from './right-content'
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import Leftmenu from '../Admin/leftmenu'
import './detail.css'
import Admin from "../Admin/admin";
import Fangshe from "../fangshe/fangshe";
import LFSR from "../LFSR/LFSR";
import RC4 from "../RC4/RC4";
import RSA from "../RSA/RSA";
import DES from "../DES/DES";
import DH from "../DH/DH";
const {Header, Content, Footer, Sider } = Layout;
export default class Detail extends React.Component{
    state = {
        collapsed: false,
    };
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render()
    {
        return(

            <Layout  style={{ minHeight: '100vh' }}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                <Leftmenu/>
                </Sider>

                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} >
                    <Icon
                        className="trigger"
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                    />
                    </Header>

                    <Content  style={{
                        margin: '24px 16px',
                        padding: 50,
                        background: '#fff',
                        minHeight: 280,
                    }}>
                        {/*<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>*/}
                        <Switch>
                            <Route path='/home' component={Admin}/>
                            <Route path='/Fangshe' component={Fangshe}/>
                            <Route path='/LFSR' component={LFSR}/>
                            <Route path='/RC4' component={RC4}/>
                            <Route path='/RSA' component={RSA}/>
                            <Route path='/DES' component={DES}/>
                            <Route path='/DH' component={DH}/>
                            <Redirect to='/home'/>
                        </Switch>
                      </Content>
                    <Footer style={{ textAlign: 'center' }}>System Design ©2019 Created by Secret System</Footer>
                </Layout>
            </Layout>
        );
    }
}
