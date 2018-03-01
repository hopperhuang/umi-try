const model = {
    state: {
        loading: false,
        init: false,
    },
    namespace: 'proto',
    reducers: {
        changeLoading(state) {
            state.loading = !state.loading;
            return { ...state };
        },
        changeInit(state) {
            state.init = true;
            return { ...state }
        },
    }
}

export default model;