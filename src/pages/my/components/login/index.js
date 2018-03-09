import { Button, WhiteSpace } from 'antd-mobile';
import styles from './style.less';

export default function Login(props) {
    return (
        <div className={styles.loginContainer} >
        <WhiteSpace />
        <Button onClick={props.goToHistory} type="primary" >阅读历史</Button>
        <WhiteSpace />
        <Button onClick={props.logout} type="warning" >退出登录</Button>
        </div>
    );
}