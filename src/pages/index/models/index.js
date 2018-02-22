import api from 'Utis/api'

const { banner } = api;
const { indexBanner } = banner;

export default {
  namespace: 'index',
  state: {
    loading: false,
    banner: [],
  },
  reducers: {
    changeLoading(state) {
      state.loading = !state.loading;
      return { ...state };
    },
    saveBanner(state, action) {
      const { data } = action;
      state.banner = data;
      return { ...state };
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          console.log('now in index');
          dispatch({ type: 'fetchData' });
        }
      });
    },
  },
  effects: {
    *fetchData(action, { put, call }) {
      yield put({ type: 'changeLoading' });
      const requestResult = yield call(indexBanner, [3, 1]);
      const _data = requestResult.data;
      if (_data) { // 成功请求
        const { data } = _data;
        yield put({ type: 'saveBanner', data });
      } else {
        console.log(requestResult)
        console.log('错误处理方案')
      }
      yield put({ type: 'changeLoading' });
    }
  }
};
