// import Vconsole from 'vconsole'

// function initVconsole() {
//   const Vcon = new Vconsole()
//   return Vcon;
// }


export default {
  namespace: 'global',
  state: {
    text: 'hello umi+dva',
    books: {}
  },
  subscriptions: {
    setup() {
      if (process.env.NODE_ENV  === 'development') {
        // initVconsole();
      }
    }
  },
  reducers: {
    setText() {
      return {
        text: 'setted',
      };
    },
    savebooks(state, action) {
      const { id, chapters } = action
      state.books[id] = chapters;
      return { ...state };
    }
  },
};
