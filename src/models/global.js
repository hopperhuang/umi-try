import api from 'Utis/api';
import compose from 'ModelUtils/compose';
import { Toast } from 'antd-mobile';
import check from 'ModelUtils/check';
import fetchSell from 'ModelUtils/fetchData';
import Vconsole from 'vconsole'

const { login, my } = api;
const { telLogin } = login;
const { info } = my;



function initVconsole() {
  const Vcon = new Vconsole()
  return Vcon;
}

const checker = {
  '100': function* (result, sagaEffects) {
    yield Toast.info('该手机没有获取验证码');
  },
  '101': function* (result, sagaEffects) {
    yield Toast.info('短信验证码错误')
  },
  '200': function* (result, sagaEffects) {
    const { put } = sagaEffects;
    const { data } = result;
    const info = data.data;
    const { token, user } = info;
    localStorage.setItem('token', token);
    yield put({ type: 'changeLoginToTrue' });
    yield put({ type: 'saveLoginInfo', user });
  },
  '510': function* (result, sagaEffects) {
    const { put } = sagaEffects;
    localStorage.removeItem('token');
    yield put({ type: 'changeLoginTofalse'});
  },
  '500': function* (result, sagaEffects) {
    yield Toast.info('非法参数');
  },
};

function* checkCode (result, sagaEffects) {
    const { data } = result;
    const { code } = data;
    const checkMethod = checker[code];
    yield checkMethod(result, sagaEffects);
}

function networFail() {
  Toast.info('网络错误');
}

function checkLogin(next) {
  return function* (action, sagaEffects) {
    const { put, call } = sagaEffects
    const token = localStorage.getItem('token');
    if(token) {
      const result = yield call(info, token)
      yield next(result, sagaEffects);
    } else {
      yield put({ type: 'changeLoginTofalse' });
    }
    yield put({ type: 'changHasCheckLoginToTrue' });
  }
}

function* checkUserInfo(result, sagaEffects) {
  const { put } = sagaEffects;
  const { data } = result;
  const { code } = data;
  if (code === 200) {
    const _data = data.data;
    const { info } = _data;
    yield put({ type: 'changeLoginToTrue' });
    yield put({ type: 'saveLoginInfo', user: info });
    // yield put({ type: 'changHasCheckLoginToTrue' });
  } else {
    localStorage.removeItem('token');
    yield put({ type: 'changeLoginTofalse'});
    // yield put({ type: 'changHasCheckLoginToTrue' });
  }
  // yield put({ type: 'changHasCheckLoginToTrue' });
}


export default {
  namespace: 'global',
  state: {
    loading: false,
    login: false,
    books: {},
    detail: {},
  },
  subscriptions: {
    setup({ dispatch, history }) {
      if (process.env.NODE_ENV  === 'development') {
        initVconsole();
      }
      return history.listen((location) => {
        dispatch({
          type: 'checkLogin'
        });
      })
    }
  },
  reducers: {
    changeLoginToTrue(state, action) {
      return { ...state, login: true };
    },
    changeLoginTofalse(state, action) {
      return { ...state, login: false};
    },
    changHasCheckLoginToTrue(state, action) {
      return { ...state, hasCheckLogin: true };
    },
    changeLoading(state, action) {
      state.loading = !state.loading;
      return { ...state }
    },
    savebooks(state, action) {
      const { id, chapters } = action;
      state.books[id] = chapters;
      return { ...state };
    },
    saveDetail(state, action) {
      const { id, detail } = action;
      state.detail[id] = detail;
      return { ...state };
    },
    saveLoginInfo(state, action) {
      const { user } = action;
      return { ...state, user };
    }
  },
  effects: {
    *login(action, sagaEffects) {
      const { call }  = sagaEffects
      const { number, code } = action;
      const result = yield call(telLogin, number, code);
      yield check(checkCode, networFail)(result, sagaEffects);
    },
    checkLogin: compose([
      function (next) {
        return function* (action, sagaEffects) {
          const { select } = sagaEffects;
          const global = yield select(state => state.global);
          const { hasCheckLogin } = global;
          if (!hasCheckLogin) {
            yield next(action, sagaEffects);
          }
        }
      },
      fetchSell,
      checkLogin,
      check(checkUserInfo, networFail)
    ]),
    *logout(action, { put }) {
      localStorage.removeItem('token');
      yield put({ type: 'changeLoginTofalse' });
    }
  }
};
