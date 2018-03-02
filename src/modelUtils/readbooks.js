import router from 'umi/router';
import { Toast } from 'antd-mobile';
import subscriptions from 'ModelUtils/subscriptions'
import fetchShell from './fetchData';
import compose from './compose';
import api from 'Utis/api';
import check from './check';

const { detail } = api;
const { allChapter, chapterContent } = detail;

const readbooksModel = {
    // 获取书本所有内容
    fetchBookChapter(next) {
        return function* (action, sagaEffects) {
            const { id } = action;
            const { call, select } = sagaEffects;
            // 检查全局缓存，是否有章节信息
            const global = yield select(state => state.global);
            const { books } = global;
            const content = books[id];
            let allChapterContent
            if (content) {
                allChapterContent = content
            }   else {
                allChapterContent = yield call(allChapter, id);
            }
            allChapterContent.data.data.id = id
            yield next(allChapterContent, sagaEffects);
        }
    },
    // 检测内容
    fetchBookChapterChecker: check(compose([allChapterContentSuccess, getFirstChapter]), networkFail),
    // 获取特定章节
    fetchChapter(next) {
        return function* (bookId, chapterId, sagaEffects) {
            const { call } = sagaEffects;
            const chapter = yield call(chapterContent, bookId, 'current', chapterId);
            yield next(chapter, sagaEffects);
        }
    },
    // 检测书本章节
    fetchChapterChecker: check(chapterContentSuccess, networkFail),
}

// 成功获取书本所有章节回调
function allChapterContentSuccess(next) {
    return function* (result, sagaEffects) {
        const { put } = sagaEffects
        const _data = result.data;
        const { data } = _data;
        const { chapters } = data;
        if (chapters.length > 0) {
            const { id } = data;
            yield put({ type: 'global/savebooks', id, chapters: result });
            yield next(chapters, sagaEffects);
        } else {
            router.push('/');
            Toast.info('该书本不存在', 2);
        }
    }
}
// 成功获取书本特定章节内容回调
function* chapterContentSuccess(chapter, sagaEffects) {
    const { put } = sagaEffects;
    const _data = chapter.data;
    const { data } = _data;
    yield put({ type: 'saveChapter', chapter: data });
}

// 获取第一个章节
function* getFirstChapter(chapters, sagaEffects) {
    const firstChapter = chapters[0]
    const { book_id, chapter_id } = firstChapter;
    yield compose([readbooksModel.fetchChapter, readbooksModel.fetchChapterChecker])(book_id, chapter_id, sagaEffects);
}

// 网络错误处理
function* networkFail() {
    yield console.log('network fail');
}
// logger
// function logger(a, b) {
//     console.log(a);
// }

export default {
    namespace: 'readbooks',
    subscriptions: {
        setup: subscriptions((dispatch, history, location) => {
            const { pathname, query } = location;
            if (pathname === '/readbooks') {
                const { id, cover } = query;
                if (!!id && !!cover) {
                    dispatch({
                        type: 'fetchData',
                        id,
                    });
                }
            }
        }),
    },
    reducers: {
        saveChapter(state, action) {
            const { chapter } = action
            return { ...state, chapter };
        },
    },
    effects: {
        fetchData: compose([
            fetchShell,
            readbooksModel.fetchBookChapter,
            readbooksModel.fetchBookChapterChecker,
        ]),
    }
}