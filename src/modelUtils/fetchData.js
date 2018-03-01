export default function fetchData(next) {
    return function* (action, sagaEffects) {
        const { put } = sagaEffects;
        yield put({ type: 'changeLoading' });
        yield next(action, sagaEffects);
        yield put({ type: 'changeLoading' });
    }
}