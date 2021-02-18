import React from 'react';
import {Switch, Route} from 'react-router-dom'

import Home from '../pages/home';
import Repository from '../pages/repository'

const Routes: React.FC =() =>{
    return(
        <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/repository/:repository+" component={Repository}></Route>
        </Switch>
    );
}

export default Routes;