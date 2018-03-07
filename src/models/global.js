import api from 'Utis/api';

const { login } = api;
const { telLogin } = login;

// import Vconsole from 'vconsole'

// function initVconsole() {
//   const Vcon = new Vconsole()
//   return Vcon;
// }


export default {
  namespace: 'global',
  state: {
    login: false,
    books: {},
    detail: {},
  },
  subscriptions: {
    setup() {
      if (process.env.NODE_ENV  === 'development') {
        // initVconsole();
      }
    }
  },
  reducers: {
    setText() {
      return {
        text: 'setted',
      };
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
    }
  },
  effects: {
    *login(action, { call } ) {
      const { number, code } = action;
      const result = yield call(telLogin, number, code);
      console.log(result);
      yield console.log(number);
      yield console.log(code);
    }
  }
};
