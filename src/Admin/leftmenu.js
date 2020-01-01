/*
左侧导航界面
 */
import React from 'react'
import {Icon, Menu,Switch} from 'antd'
import {Link,withRouter} from "react-router-dom";
import menuList from './menuList.js'
const {SubMenu} = Menu;

class Leftmenu extends React.Component{
    state={
        theme:'light',
        current:'1',
    }
    changeTheme = value =>{
        this.setState(
            {
                theme:value?'dark':'light'
            }
        );
    };
    handleClick = e =>{
        console.log("click",e);
        this.setState(
            {
                current:e.key,
            }
        )
    }
    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if(!item.children){
                return(
                    <Menu.Item key={item.key}>
                        <Link to={item.key} style={{color:'green' }}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else{
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>{item.title}</span>
                        }
                    >
                        {
                            this.getMenuNodes(item.children)
                        }
                    </SubMenu>
                )
            }
        })
    }
    
    render(){
        const path = this.props.location.pathname;
        return (
            <div>
                <Switch
                checked={this.state.theme==='dark'}
                onChange={this.changeTheme}
                checkedChildren='Dark'
                unCheckedChildren='Light'
                />
                <br/>
                <br/>

            <Menu
            theme={this.state.theme}
            onClick={this.handleClick}
            defaultSelectedKeys={[path]}
            selectedKeys={[this.state.current]}
            mode="inline"
            >
                {
                    this.getMenuNodes(menuList)
                }
            </Menu>
            </div>
        )
    }
}
export default withRouter(Leftmenu);