import { connect } from 'dva';
import Load from 'Components/Load';



function ReadBooks(props) {
    console.log(props)
    return (
        <div>这里是阅读书本</div>
    )
}

const AppWithLoad = Load(ReadBooks);

export default connect((state) => {
    return {
      loading: state.readbooks.loading,
      model: state.readbooks
    };
  })(AppWithLoad);