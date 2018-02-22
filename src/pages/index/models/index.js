import { routerRedux } from 'dva/router'

export default {
  namespace: 'index',
  state: {
    loading: false,
    banner: []
  },
  reducers: {
    increase(state) {
      return state + 1;
    },
    decrease(state) {
      return state - 1;
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          console.log('i am in index page')
        }
      });
    },
  },
  effects: {
    *goToList(action, { put }) {
      yield put(routerRedux.push('/list'))
    }
  }
};
