import * as React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import Tabbar from 'Components/Tabbar';
import Unlogin from './components/unlogin/index'
import Nav from 'Components/Navbar/index';
import api from 'Utis/api';
import styles from './page.css';



function App(props) {
  return (
    <div className={styles.my}>
      <Nav title="我的" onLeftClick={props.goBack} />
      {props.login ? 'login' :
        <Unlogin
          inputChane={props.setNumber}
          onButtonClick={props.getCode}
          codeInputChange={props.setCode}
          login={props.loginMethod}
        />}
      <Tabbar selectedKey="/my"/>
    </div>
  );
}

class My extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      code: ''
    }
    this.goBack = this.goBack.bind(this);
    this.setNumber = this.setNumber.bind(this);
    this.setCode = this.setCode.bind(this);
    this.getCode = this.getCode.bind(this);
    this.login = this.login.bind(this);
  }
  setNumber(number) {
    this.setState({
      number,
    });
  }
  setCode(code) {
    this.setState({
      code,
    })
  }
  getCode() {
    const { number } = this.state;
    api.login.getCode(number);
  }
  goBack() {
    router.push('/');
  }
  login() {
    const { number, code } = this.state;
    this.props.dispatch({
      type: 'global/login',
      number,
      code,
    });
  }
  render() {
    return (
      <App
        {...this.props} 
        goBack={this.goBack}
        setNumber={this.setNumber}
        setCode={this.setCode}
        number={this.state.number}
        code={this.state.code}
        getCode={this.getCode}
        loginMethod={this.login}
      />
    )
  }
}

export default connect((state) => {
  return {
    login: state.global.login,
  };
})(My);
