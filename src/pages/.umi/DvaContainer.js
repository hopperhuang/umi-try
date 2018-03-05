import { Component } from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';

const app = dva({
  history: window.g_history,
});
window.g_app = app;
app.use(createLoading());

app.model({ ...(require('../../models/global.js').default) });
app.model({ ...(require('../../pages/catalog/models/index.js').default) });
app.model({ ...(require('../../pages/index/models/index.js').default) });
app.model({ ...(require('../../pages/readbooks/models/index.js').default) });

class DvaContainer extends Component {
  render() {
    app.router(() => this.props.children);
    return app.start()();
  }
}

export default DvaContainer;
