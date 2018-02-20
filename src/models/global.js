export default {
  namespace: 'global',
  state: {
    text: 'hello umi+dva',
  },
  reducers: {
    setText() {
      return {
        text: 'setted',
      };
    },
  },
};
