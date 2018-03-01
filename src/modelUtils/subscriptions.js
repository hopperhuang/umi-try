function fetchData(dispatch) {
    dispatch({ type: 'fetchData'});
}

// 订阅历史，具体判断自己写
export default function subscriptions(method) {
    return ({ dispatch, history }) => {
        return history.listen((location) => {
             method(dispatch, history, location);
        })
    }
}

// 订阅特定路径
export function subscribePath(targetPath, method) {
    return subscriptions((dispatch, history, location) => {
        const { pathname } = location;
        if (pathname === targetPath) {
            method(dispatch, history, location);
        }
    })
}
// 订阅特定路径并拉取数据

export function subscribeFetch(targetPath) {
    return subscribePath(targetPath, fetchData);
}
