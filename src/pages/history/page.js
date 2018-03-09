import * as React from 'react';
import { connect } from 'dva';
import Load from 'Components/Load';

function History(props) {
    return (
        <div>这里时历史记录</div>
    )
}

const AppWithLoad = Load(History);

export default connect((state) => {
    return {
      history: state.history,
    };
  })(AppWithLoad);