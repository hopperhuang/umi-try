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
            *success(result, sagaEffects) {
                yield console.log(result);
                yield console.log('success');
                const { data } = result;
                const _data = data.data;
                const { ret } = _data;
                console.log(ret);
            },
            *fail(result, sagaEffects) {
                yield goBack();
            },
        }
    ]), networkFail),
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
    },
    subscriptions: {
        setup: subscribePath('/history', (dispatch, history, location) => {
            dispatch({
                type: 'getHistory',
            })
        })
    },
    effects: {
        getHistory: compose([
            fetchShell,
            model.getHistory,
            model.checkHistory,
        ]),
    }
}