import * as React from 'react';
import { connect } from 'dva';
import Load from 'Components/Load';



function ReadBooks(props) {
    return (
        <div onClick={props.addContent} >这里是阅读书本</div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.addContent = this.addContent.bind(this);
    }
    addContent() {
        console.log(2333);
    }
    render() {
        console.log(this.props)
        return (
            <ReadBooks {...this.props} addContent={this.addContent} />
        )
    }
}

const AppWithLoad = Load(App);

export default connect((state) => {
    return {
      loading: state.readbooks.loading,
      model: state.readbooks
    };
  })(AppWithLoad);