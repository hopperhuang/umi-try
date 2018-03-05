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
    <Route exact path="/catalog" component={require('../catalog/page.js').default} />
    <Route exact path="/" component={require('../index/page.js').default} />
    <Route exact path="/list" component={require('../list/page.js').default} />
    <Route exact path="/readbooks" component={require('../readbooks/page.js').default} />
  </Switch>
</Router>
  );
}
