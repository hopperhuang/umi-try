import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import { routerRedux } from 'dva/router';


const Router = window.g_CustomRouter || DefaultRouter;

export default function() {
  return (
<Router history={window.g_history}>
  <Switch>
    <Route exact path="/" component={require('../index/page.js').default}></Route>
    <Route exact path="/list" component={() => <div>Compiling...</div>}></Route>
  </Switch>
</Router>
  );
}
