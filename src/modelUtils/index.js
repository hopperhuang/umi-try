import { Toast } from 'antd-mobile'
import compose from './compose';
import fetchShell from './fetchData';
import check from './check';
import api from 'Utis/api';
import { subscribeFetch } from 'ModelUtils/subscriptions'


const { banner, index } = api;
const { indexBanner } = banner;
const { indexDetail } = index

// 可以通过indexModel组成各种的effects
const indexModel = {
    // 进入首页拉数据
    fetch(next) {
        return function* (action, sagaEffects) {
            const { select, call, put } = sagaEffects
            const index = yield select(state => state.index);
            const { page, init } = index;
            if (!init) {
                const nextPage = page + 1;
                // 并行发送请求
                const detailRequest = indexDetail(1, nextPage, 6);
                const bannerRequest = indexBanner(3, 1);
                const result = yield call(() => {
                    return Promise.all([bannerRequest, detailRequest]);
                })
                // 判断请求是否全部成功。
                yield next(result, sagaEffects);
                yield put({ type: 'changeInit' });
            }
        }
    },
    checkFetchData: check(successFetchData, failFetchData),
    // 下拉数据
    requestDetail(next) {
        return function* (action, sagaEffects) {
            const { select, call } = sagaEffects
            const index = yield select(state => state.index);
            const { page } = index;
            const nextPage = page + 1;
            const detailRequest = yield call(indexDetail, 1, nextPage, 10);
            yield next(detailRequest, sagaEffects)
        }
    },
    checkPullData: check(successPull, failFetchData),
};

// 初始化数据判断
function* successFetchData(result, sagaEffects) {
    const { put } = sagaEffects;
    const banner = result[0];
    const detail = result[1];
    yield put({ type: 'saveBanner', data: banner.data.data });
    yield put({ type: 'savaDetail', data: detail.data.data.ret });
}

function* failFetchData(result, sagaEffects) {
    yield console.log('FETCHDATA ERROR!!!');
}

// 下拉刷新数据判断
function* successPull(result, sagaEffects) {
    const { put } = sagaEffects;
    const _data = result.data
    const { data } = _data;
    const { ret } = data
        // 判断数据是否取完
        if (ret.length > 0) {
          yield put({ type: 'savaDetail', data: ret });
        } else {
          Toast.info('你已经看完所有书本了，敬请期待！！', 1);
        }
}

export default {
    namespace: 'index',
    state: {
        banner: [],
        detail: [],
        page: 0,
    },
    reducers: {
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
        setup: subscribeFetch('/')
    },
    effects: {
        fetchData: compose([fetchShell, indexModel.fetch, indexModel.checkFetchData]),
        requestDetail: compose([indexModel.requestDetail, indexModel.checkPullData]),
    },
}