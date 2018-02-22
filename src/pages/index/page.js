// eslint-disable-next-line
import Link from 'umi/link';
import { connect } from 'dva';
import Tabbar from 'Components/Tabbar';
import Load from 'Components/Load';
import styles from './page.css';
import Vconsole from 'vconsole'

/* eslint-disable */
const Vcon = new Vconsole()
/* eslint-enable */

function App(props) {
  console.log(props)
  const { location } = props
  const { pathname } = location;
  return (
    <div className={styles.normal}>
      <div>这里是首页</div>
      <Tabbar
        selectedKey={pathname}
      />
    </div>
  );
}
const AppWithLoad = Load(App);

export default connect((state) => {
  return {
    loading: state.index.loading,
    model: state.index
  };
})(AppWithLoad);
