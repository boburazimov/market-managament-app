import api from 'api'
import {toast} from "react-toastify";
import router from "umi/router";

const {
  userMe, getCurrencies, getStatusEnums, addMagazine, getMagazines, getUsers, deleteMagazine,
  addCurrency, deleteCurrency, addBalance, getBalances, deleteBalance, addPayType, getPayTypes,
  deletePayType, getPayMethodEnums, addCashBox, getCashBoxes, deleteCashBox, addCashDesk, getCashDesks, deleteCashDesk,
} = api;

let openPages = ['/login', '/register', '/'];
// let cashierPages = ['/input'];
// let adminPages = ['/input', '/catalog'];

export default ({

  namespace: 'app',

  state: {
    pathname: '',
    showModal: false,
    currentUser: '',
    magazines: [],
    currencies: [],
    statusEnums: [],
    users: [],
    balances: [],
    payTypes: [],
    methodEnums: [],
    cashBoxes: [],
    cashDesks: [],
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

    * getUsers({payload}, {call, put}) {
      const res = yield call(getUsers);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            users: res.object
          }
        })
      }
    },

    * addMagazine({payload}, {call, put}) {
      const res = yield call(addMagazine, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            showModal: false
          }
        });
        toast.success(res.message);
        yield put({type: 'getMagazines'});
      }
    },

    * getMagazines({payload}, {call, put}) {
      const res = yield call(getMagazines);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            magazines: res.object
          }
        })
      }
    },

    * deleteMagazine({payload}, {call, put}) {
      const res = yield call(deleteMagazine, payload);
      if (res.success) {
        toast.success(res.message);
        yield put({type: 'getMagazines'});
      } else {
        toast.error('Ошибка при удалении!');
        yield put({type: 'getMagazines'});
      }
    },

    * addCurrency({payload}, {call, put}) {
      const res = yield call(addCurrency, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            showModal: false
          }
        });
        if (payload.id) {
          toast.success("Валюта изменена");
        } else {
          toast.success("Добавлено валюта");
        }
        yield put({type: "getCurrencies"})
      } else {
        toast.error(res.message)
      }
    },

    * getCurrencies({payload}, {call, put}) {
      const res = yield call(getCurrencies);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            currencies: res._embedded.currency
          }
        })
      }
    },

    * deleteCurrency({payload}, {call, put}) {
      const res = yield call(deleteCurrency, payload);
      if (res.success) {
        toast.success('Валюта удалена!');
        yield put({type: 'getCurrencies'});
      } else {
        toast.error('Ошибка при удалении!');
        yield put({type: 'getCurrencies'});
      }
    },

    * addBalance({payload}, {call, put}) {
      // payload.balance = payload.balance.replace(/\s+/g, '');
      const res = yield call(addBalance, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            showModal: false
          }
        });
        if (payload.id) {
          toast.success("Баланс изменен");
        } else {
          toast.success("Баланс добавлен");
        }
        yield put({type: "getBalances"})
      } else {
        toast.error(res.message)
      }
    },

    * getBalances({payload}, {call, put}) {
      const res = yield call(getBalances);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            balances: res._embedded.mBalance
          }
        })
      }
    },

    * deleteBalance({payload}, {call, put}) {
      const res = yield call(deleteBalance, payload);
      if (res.success) {
        toast.success('Баланс удален!');
        yield put({type: 'getBalances'});
      } else {
        toast.error('Ошибка при удалении!');
        yield put({type: 'getBalances'});
      }

    },

    * addPayType({payload}, {call, put}) {
      const res = yield call(addPayType, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            showModal: false
          }
        });
        if (payload.id) {
          toast.success("Вид оплаты изменен");
        } else {
          toast.success("Вид оплаты добавлен");
        }
        yield put({type: "getPayTypes"})
      } else {
        toast.error(res.message)
      }
      yield put({
        type: 'updateState',
        payload: {
          currentItem: ''
        }
      })
    },

    * getPayTypes({payload}, {call, put}) {
      const res = yield call(getPayTypes);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            payTypes: res._embedded.payType
          }
        })
      }
    },

    * deletePayType({payload}, {call, put}) {
      const res = yield call(deletePayType, payload);
      if (res.success) {
        toast.success('Вид оплаты удален!');
        yield put({type: 'getPayTypes'});
      } else {
        toast.error('Ошибка при удалении!');
      }
    },

    * addCashBox({payload}, {call, put}) {
      const res = yield call(addCashBox, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            showModal: false
          }
        });
        if (payload.id) {
          toast.success("Касса изменена");
        } else {
          toast.success("Касса добавлен");
        }
        yield put({type: "getCashBoxes"})
      } else {
        toast.error(res.message)
      }
      yield put({
        type: 'updateState',
        payload: {
          currentItem: ''
        }
      })
    },

    * getCashBoxes({payload}, {call, put}) {
      const res = yield call(getCashBoxes);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            cashBoxes: res._embedded.cashBox
          }
        })
      }
    },

    * deleteCashBox({payload}, {call, put}) {
      const res = yield call(deleteCashBox, payload);
      if (res.success) {
        toast.success('Касса удалена!');
        yield put({type: 'getCashBoxes'});
      } else {
        toast.error('Ошибка при удалении!');
      }
    },

    * addCashDesk({payload}, {call, put}) {
      const res = yield call(addCashDesk, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            showModal: false,
            currentItem: ''
          }
        });
        toast.success(res.message);
        yield put({type: "getCashDesks"})
      } else {
        toast.error(res.message)
      }
    },

    * getCashDesks({payload}, {call, put}) {
      const res = yield call(getCashDesks);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            cashDesks: res.object
          }
        })
      }
    },

    * deleteCashDesk({payload}, {call, put}) {
      const res = yield call(deleteCashDesk, payload);
      if (res.success) {
        toast.success(res.message);
        yield put({type: 'getCashDesks'});
      } else {
        toast.error('Ошибка при удалении!');
      }
    },

    * getPayMethodEnums({payload}, {call, put}) {
      const res = yield call(getPayMethodEnums);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            methodEnums: res.object
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
