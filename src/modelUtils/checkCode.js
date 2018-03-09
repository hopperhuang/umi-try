export default function checkCode({success, fail}) {
    return function* (result, sagaEffects) {
        const { data } = result;
        const { code } = data;
        if (code === 200) {
            yield success(result, sagaEffects);
        }   else {
            yield fail(result, sagaEffects);
        }
    }
}