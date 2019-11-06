import React from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Main from './pages/main';
import Video from './pages/video';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path = "/" component = {Main}/>
            <Route path = "/video/:video_id" component = {Video}/>
        </Switch>
    </BrowserRouter>
)

export default Routes;