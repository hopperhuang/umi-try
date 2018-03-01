export default function check(success, fail) {
    return function* (result, sagaEffects) {
        let isSuccess = true;
        const isArray = Array.isArray(result)
        if (isArray) {
            for (let index = 0; index < result.length; index++) {
                const element = result[index];
                if (!element.data) {
                    isSuccess = false;
                }
            }
        }   else {
            isSuccess = !!result.data;
        }
        if (isSuccess) {
            yield success(result, sagaEffects)
        } else {
            yield fail(result, sagaEffects);
        }
    }
}