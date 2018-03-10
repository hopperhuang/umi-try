import router from 'umi/router'; 
import { Toast } from 'antd-mobile';
import api from 'Utis/api';
import { subscribePath } from './subscriptions';
import compose from './compose';
import check from './check';
import checkCode from './checkCode';
import fetchShell from './fetchData';


const { my } = api;
const { getReadHistory } = my;

function goBack() {
    router.push('/my');
    Toast.info('请先登录')
}

const model = {
    getHistory(next) {
        return function* (action, sagaEffects) {
            const { call, select } = sagaEffects;
            const token = localStorage.getItem('token');
            if (token) {
                const history = yield select(state => state.history);
                const { page } = history;
                const nextPage = page + 1;
                const result = yield call(getReadHistory, token, nextPage, 8);
                yield next(result, sagaEffects);
            }   else {
                goBack();
            }
        }
    },
    checkHistory: check(compose([
        checkCode,
        {
            success,
            *fail(result, sagaEffects) {
                yield goBack();
            },
        }
    ]), networkFail),
}

function* success(result, sagaEffects) {
    const { put } = sagaEffects;
    const { data } = result;
    const _data = data.data;
    const { ret } = _data;
    if (ret.length > 0) {
        yield put({ type: 'saveHistory', history: ret });
        yield put({ type: 'changeInit' });
    }   else {
        Toast.info('没有更多历史记录了', 0.5);
    }
}

// function logger(action, sagaEffects) {
//     console.log(action);
//     console.log(sagaEffects);
// }

function networkFail() {
    router.push('/');
    Toast.info('网络错误');
}

export default {
    namespace: 'history',
    state: {
        page: 0,
        history: [],
        refreshing: false,
    },
    subscriptions: {
        setup: subscribePath('/history', (dispatch, history, location) => {
            dispatch({
                type: 'getHistory',
            })
        })
    },
    reducers: {
        saveHistory(state, action) {
            const { history } = action;
            const { page } = state;
            const newPage = page + 1;
            const newHistory = state.history.concat(history);
            return { ...state, page: newPage, history: newHistory };
        },
        initHistory(state, action){
            return { ...state, page: 0, history: [] };
        }
    },
    effects: {
        getHistory: compose([
            (next) => {
                return function* (action, sagaEffects) {
                    const { select } = sagaEffects;
                    const history = yield select(state => state.history);
                    const { init } = history;
                    // 尚未初始化则获取数据
                    if (!init) {
                        yield next(action, sagaEffects);
                    }
                };
            },
            fetchShell,
            model.getHistory,
            model.checkHistory,
        ]),
        getMore: [
            compose([
            model.getHistory,
            model.checkHistory,
            ]),
            {
                type: 'takeLatest',
                ms: 2000,
            }
        ],
        refreshing: compose([
            (next) => {
                return function* (action, sagaEffects) {
                    const { put } = sagaEffects;
                    yield put({ type: 'changeRefreshing' });
                    yield put({ type: 'initHistory' });
                    yield next(action, sagaEffects);
                    yield put({ type: 'changeRefreshing' });
                }
            },
            model.getHistory,
            model.checkHistory,
        ])
    }
}