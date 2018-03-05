import router from 'umi/router';
import { Toast } from 'antd-mobile';
import subscriptions from 'ModelUtils/subscriptions'
import fetchShell from './fetchData';
import compose from './compose';
import api from 'Utis/api';
import check from './check';

const { detail } = api;
const { allChapter, chapterContent, bookDetail } = detail;

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
    fetchBookChapterChecker: check(compose([allChapterSuccess, getFirstChapter]), networkFail),
    // 获取特定章节
    fetchChapter(next) {
        return function* (bookId, chapterId, type, sagaEffects) {
            const { call } = sagaEffects;
            const chapter = yield call(chapterContent, bookId, type, chapterId);
            yield next(chapter, sagaEffects);
        }
    },
    // 检测书本章节
    fetchChapterChecker: check(chapterContentSuccess, networkFail),
    getNext(next) {
        return function* (action, sagaEffects) {
            const { select } = sagaEffects;
            const readbooks = yield select(state => state.readbooks)
            const { chapter } = readbooks;
            const { ret } = chapter;
            const chapterInfo = ret.chapter;
            const { chapter_id, book_id } = chapterInfo;
            yield next(book_id, chapter_id, 'next', sagaEffects);
        }
    },
    nextChecker: check(compose([getNextSuccess, getNextDetail]), networkFail),
    getBookDeatil(next) {
        return function* (bookId, sagaEffects) {
            const { call } = sagaEffects;
            const detail = yield call(bookDetail, bookId);
            yield next(detail, sagaEffects);
        }
    },
    bookDetailChecker: check(bookDetailSuccess, networkFail),
}

// 成功获取书本所有章节回调
function allChapterSuccess(next) {
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
// 获取第一个章节
function* getFirstChapter(chapters, sagaEffects) {
    const firstChapter = chapters[0]
    const { book_id, chapter_id } = firstChapter;
    yield compose([readbooksModel.fetchChapter, readbooksModel.fetchChapterChecker])(book_id, chapter_id, 'current', sagaEffects);
}
// 成功获取书本特定章节内容回调
function* chapterContentSuccess(chapter, sagaEffects) {
    const { put } = sagaEffects;
    const _data = chapter.data;
    const { data } = _data;
    yield put({ type: 'saveChapter', chapter: data });
}

// 成功获取下一章节或书本回调
function getNextSuccess(next) {
    return function* (chapter, sagaEffects) {
        const _data = chapter.data;
        const { data } = _data;
        const { ret } = data;
        const chapterInfo = ret.chapter;
        const { book_id, chapter_id } = chapterInfo;
        yield next(book_id, chapter_id, sagaEffects);
    }
}

// 获取下一章节详细信息
function* getNextDetail(bookId, chapterId, sagaEffects) {
    const { put, select } = sagaEffects;
    yield compose([readbooksModel.getBookDeatil, readbooksModel.bookDetailChecker])(bookId, sagaEffects);
    const global = yield select(state => state.global);
    const { detail } = global;
    const targetDetail = detail[bookId];
    const _data = targetDetail.data;
    const { data } = _data;
    const { book_cover } = data;
    yield put({ type: 'saveNext', bookId, chapterId, bookCover: book_cover });
}

function* bookDetailSuccess(detail, sagaEffects) {
    yield console.log(detail);
    const { put } = sagaEffects;
    const _data = detail.data;
    const { data } = _data
    const { book_id } = data;
    yield put({ type: 'global/saveDetail', id: book_id, detail });
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
            // 从首页入口进入初始化
            if (pathname === '/readbooks') {
                const { id } = query;
                if (!!id) {
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
        saveNext(state, action) {
            const { chapterId, bookId, bookCover } = action;
            return { ...state, nextBookId: bookId, nextChapterId: chapterId, nextBookCover: bookCover };
        }
    },
    effects: {
        fetchData: compose([
            fetchShell,
            readbooksModel.fetchBookChapter,
            readbooksModel.fetchBookChapterChecker,
        ]),
        getNext:compose([
            readbooksModel.getNext,
            readbooksModel.fetchChapter,
            readbooksModel.nextChecker,
        ]),
    }
}