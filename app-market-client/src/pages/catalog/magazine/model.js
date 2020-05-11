export default {

  namespace: 'magazineModel',

  state: {},

  subscriptions: {},

  effects: {},

  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    }
  }
}
