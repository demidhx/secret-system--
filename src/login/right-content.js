import React ,{ Component }from 'react'
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Admin from '../Admin/admin.js'
import Fangshe from '../fangshe/fangshe.js'
import LFSR from '../LFSR/LFSR.js'
import RC4 from '../RC4/RC4.js'
import RSA from '../RSA/RSA.js'
import DES from '../DES/DES.js'
import DH from '../DH/DH.js'
export default class Rightcontent extends Component{
    render()
    {
        return(
            <div>
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
            </div>
        );
    }
}