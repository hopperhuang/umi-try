import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import { routerRedux } from 'dva/router';


let Router = DefaultRouter;
const { ConnectedRouter } = routerRedux;
Router = ConnectedRouter;


export default function() {
  return (
<Router history={window.g_history}>
  <Switch>
    <Route exact path="/catalog.html" component={require('../catalog/page.js').default} />
    <Route exact path="/history.html" component={() => React.createElement(require('/usr/local/lib/node_modules/umi/node_modules/_umi-build-dev@0.12.1@umi-build-dev/lib/Compiling.js').default, { route: '/history.html' })} />
    <Route exact path="/" component={require('../index/page.js').default} />
    <Route exact path="/my.html" component={() => React.createElement(require('/usr/local/lib/node_modules/umi/node_modules/_umi-build-dev@0.12.1@umi-build-dev/lib/Compiling.js').default, { route: '/my.html' })} />
    <Route exact path="/readbooks.html" component={require('../readbooks/page.js').default} />
    <Route exact path="/index.html" component={() => React.createElement(require('/usr/local/lib/node_modules/umi/node_modules/_umi-build-dev@0.12.1@umi-build-dev/lib/Compiling.js').default, { route: '/index.html' })} />
  </Switch>
</Router>
  );
}
