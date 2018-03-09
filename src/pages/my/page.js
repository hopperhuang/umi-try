import * as React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import Tabbar from 'Components/Tabbar';
import Unlogin from './components/unlogin/index'
import Login from './components/login/index'
import Nav from 'Components/Navbar/index';
import Load from 'Components/Load';
import api from 'Utis/api';
import styles from './page.css';



function App(props) {
  return (
    <div className={styles.my}>
      <Nav title="我的" onLeftClick={props.goBack} />
      {props.login ? <Login goToHistory={props.goToHistory} logout={props.logout} /> :
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
    this.logout = this.logout.bind(this);
    this.goToHistory = this.goToHistory.bind(this);
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
    const _number = number.split(' ').join('');
    api.login.getCode(_number);
  }
  goBack() {
    router.push('/');
  }
  goToHistory() {
    router.push('/history');
  }
  login() {
    const { number, code } = this.state;
    const _number = Number.parseInt(number.split(' ').join(''), 10);
    const _code =  Number.parseInt(code.split(' ').join(''), 10);
    this.props.dispatch({
      type: 'global/login',
      number: _number,
      code: _code
    });
  }
  logout() {
    this.props.dispatch({
      type: 'global/logout',
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
        logout={this.logout}
        goToHistory={this.goToHistory}
      />
    )
  }
}

const AppWithLoad = Load(My);

export default connect((state) => {
  return {
    login: state.global.login,
    globalLoading: state.global.loading,
  };
})(AppWithLoad);
