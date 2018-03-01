import Vconsole from 'vconsole'

function initVconsole() {
  const Vcon = new Vconsole()
  return Vcon;
}


export default {
  namespace: 'global',
  state: {
    text: 'hello umi+dva',
  },
  subscriptions: {
    setup() {
      initVconsole();
    }
  },
  reducers: {
    setText() {
      return {
        text: 'setted',
      };
    },
  },
};
