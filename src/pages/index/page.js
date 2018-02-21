import Link from 'umi/link';
import { connect } from 'dva';
import { Button } from 'antd-mobile';
import Count from './components/Count';
import Tabbar from 'Components/Tabbar';
import styles from './page.css';

function App(props) {
  const { location } = props
  const { pathname } = location;
  return (
    <div className={styles.normal}>
      <h2>{props.text}</h2>
      <Count />
      <br />
      <Button
        onClick={() => {
          props.dispatch({
            type: 'global/setText',
          });
        }}
      >
        Set Title
      </Button>
      <br />
      <div>
        <Link to="/list">Go to list.html</Link>
      </div>
      <div
        onClick={() => {
          props.dispatch({
            type: 'count/goToList'
          })
        }}
        className={styles.rem}
      >
        click me to to list.html, too!!!
      </div>
      <Tabbar
        selectedKey={pathname}
      />
    </div>
  );
}

export default connect((state) => {
  return {
    text: state.global.text,
  };
})(App);
