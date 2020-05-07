import api from 'api'
import {toast} from "react-toastify";
import router from "umi/router";

const {
  userMe, getCurrencies, getStatusEnums,
} = api;

let openPages = ['/login', '/register', '/'];
// let cashierPages = ['/input'];
// let adminPages = ['/input', '/catalog'];

export default ({

  namespace: 'app',

  state: {
    currentUser: '',
    currencies: [],
    statusEnums: [],
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname}) => {
        if (!openPages.includes(pathname)) {
          dispatch({
            type: 'userMe',
            payload: {
              pathname
            }
          })
        }
      })
    }
  },

  effects: {

    * userMe({payload}, {call, put}) {
      try {
        const res = yield call(userMe);
        if (!res.success) {
          yield put({type: 'updateState', payload: {currentUser: ''}});
          toast.success(res.message);
          router.push("/");
        } else {
          yield put({type: 'updateState', payload: {currentUser: res}})
        }
      } catch (e) {
        toast.error(e.message)
      }
    },

    * getCurrencies({payload}, {call, put}) {
      const res = yield call(getCurrencies);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            currencies: res._embedded.currencies
          }
        })
      }
    },

    * getStatusEnums({payload}, {call, put}) {
      const res = yield call(getStatusEnums);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            statusEnums: res.object
          }
        })
      }
    },


  },

  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    }
  }
})