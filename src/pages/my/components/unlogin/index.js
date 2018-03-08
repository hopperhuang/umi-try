import { InputItem, List, Button } from 'antd-mobile'
import styles from './style.less';

export default function Unlogin(props) {
    return (
        <div className={styles.unloginContainer} >
            <List>
                <InputItem type="phone" onChange={(value) => {props.inputChane(value)}} >输入电话号码</InputItem>
                <Button onClick={props.onButtonClick} type="primary" >获取验证码</Button>
                <InputItem maxLength="7" type="phone" onChange={(value) => {props.codeInputChange(value)}} >输入验证码</InputItem>
                <Button onClick={props.login} type="primary" >登录</Button>
            </List>
        </div>
    )
}