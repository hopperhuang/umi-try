import api from 'Utis/api'
import { Toast } from 'antd-mobile'


const { banner, index } = api;
const { indexBanner } = banner;
const { indexDetail } = index

export default {
  namespace: 'index',
  state: {
    loading: false,
    banner: [],
    detail: [],
    page: 0,
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
    },
    savaDetail(state, action) {
      const { data } = action;
      const detail = state.detail.concat(data);
      state.page += 1;
      return { ...state, detail }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          dispatch({ type: 'fetchData' });
        }
      });
    },
  },
  effects: {
    *fetchData(action, { put, call, select }) {
      yield put({ type: 'changeLoading' });
      // 获取当前页面信息
      const index = yield select(state => state.index);
      const { page } = index
      const nextPage = page + 1;
      // 并行发送请求
      const detailRequest = indexDetail(1, nextPage, 6);
      const bannerRequest = indexBanner(3, 1);
      const result = yield call(() => {
        return Promise.all([bannerRequest, detailRequest]);
      })
      // 判断请求是否全部成功。
      let success = true
      for (let index = 0; index < result.length; index++) {
        const element = result[index];
        if (!element.data) {
          success = false;
        }
      }
      if (success) {
        const banner = result[0];
        const detail = result[1];
        yield put({ type: 'saveBanner', data: banner.data.data });
        yield put({ type: 'savaDetail', data: detail.data.data.ret });
      } else {
        console.log('FETCHDATA ERROR!!!');
      }
      yield put({ type: 'changeLoading' });
    },
    *requestDetail(action, { put, select, call }) {
      const index = yield select(state => state.index);
      const { page } = index;
      const nextPage = page + 1;
      const detailRequest = yield call(indexDetail, 1, nextPage, 10);
      const _data = detailRequest.data
      if (_data) {
        const { data } = _data;
        const { ret } = data
        // 判断数据是否取完
        if (ret.length > 0) {
          yield put({ type: 'savaDetail', data: ret });
        } else {
          Toast.info('你已经看完所有书本了，敬请期待！！', 1);
        }
      } else {
        console.log('request detail error!!')
      }
    }
  }
};
