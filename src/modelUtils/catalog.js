import router from 'umi/router';
import { Toast } from 'antd-mobile';
import { subscribePath } from './subscriptions';
import { readbooksModel, allChapterSuccess } from './readbooks';
import fetchShell from './fetchData';
import compose from './compose';
import check from './check';

// logger
// function logger(a, b) {
//     console.log(a);
// }

function* networkFail() {
    yield console.log('network fail');
}

function* saveData(chapters, sagaEffects) {
    const { put } = sagaEffects;
    yield put({ type: 'saveData', chapters })
}


export default {
    namespace: 'catalog',
    subscriptions: {
        setup: subscribePath('/catalog', (dispatch, history, location) => {
            const { query } = location;
            const { id } = query;
            if (!!id) {
                dispatch({ type: 'fetchData', id });
            }   else {
                router.push('/');
                Toast.info('参数错误');
            }
        })
    },
    reducers: {
        saveData(state, action) {
            const { chapters } = action;
            return { ...state, chapters };
        }
    },
    effects: {
        fetchData: compose([
            fetchShell,
            readbooksModel.fetchBookChapter,
            check(compose([allChapterSuccess, saveData]), networkFail)
        ])
    }
};