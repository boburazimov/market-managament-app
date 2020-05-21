import api from 'api'
import {toast} from "react-toastify";
import router from "umi/router";

const {
  userMe, getCurrencies, getStatusEnums, addMagazine, getMagazines, getUsers, deleteMagazine, getMagazineByUser,
  addCurrency, deleteCurrency, addBalance, getBalances, deleteBalance, addPayType, getPayTypes,
  deletePayType, getPayMethodEnums, addCashBox, getCashBoxes, deleteCashBox,
  addCashDesk, getCashDesks, deleteCashDesk, getCashDeskByMagazineId,
} = api;

let openPages = ['/login', '/register', '/'];
// let userPages = ['/menu', '/register', '/', '/login', "/menu",
//   // '/catalog/magazine',
//   // '/catalog/balance',
//   // '/catalog/balance',
//   // '/catalog/payType',
//   // '/catalog/currency',
//   // '/catalog/cashDesk',
//   // '/catalog/cashBox',
// ];
// let adminPages = ['/input', '/catalog'];

export default ({

  namespace: 'app',

  state: {
    currentUser: {},
    pathname: '',
    showModal: false,
    magazines: [],
    currencies: [],
    statusEnums: [],
    users: [],
    balances: [],
    payTypes: [],
    methodEnums: [],
    cashBoxes: [],
    cashDesks: [],
    marketBalance: '',
    CurrentCashDesks: [],
    currentMagazine: '',
    isAdmin: false,
    isCashier: false,
    isDirector: false,
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname}) => {
        dispatch({
          type: 'userMe',
          payload: {
            pathname
          }
        })
      })
    }
  },

  effects: {

    * userMe({payload}, {call, put}) {
      try {
        const res = yield call(userMe);
        console.log(res);
        if (!res.success) {
          yield put({
            type: 'updateState',
            payload: {currentUser: {}}
          });
          if (!openPages.includes(payload.pathname)) {
            router.push("/login");
          }
        } else {
          yield put({
            type: 'updateState',
            payload: {
              currentUser: res.object,
              isAdmin: res.object.roles.length > 3,
              isDirector: res.object.roles.length > 2,
              isCashier: res.object.roles.length > 1,
            }
          });
          // if (res.object.roles.filter(item => item.name === 'ROLE_USER').length) {
          //   if (!userPages.includes(payload.pathname)) {
          //     router.push("/")
          //   }
          // }
          yield put({type: 'getMagazineByUser', payload: {id: res.object.id}});
        }
      } catch (e) {
        yield put({
          type: 'updateState',
          payload: {currentUser: {}}
        });
        if (!openPages.includes(payload.pathname)) {
          router.push("/login");
        }
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

    * getMagazineByUser({payload}, {call, put}) {
      const res = yield call(getMagazineByUser, payload);
      if (res.success) {
        console.log(res);
        yield put({
          type: 'updateState',
          payload: {
            currentMagazine: res.object
          }
        });
        yield put({
          type: 'getCashDeskByMagazineId',
          payload: {id: res.data.id}
          })
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

    * getCashDeskByMagazineId({payload}, {call, put}) {
      const res = yield call(getCashDeskByMagazineId, payload);
      if (res.success) {
        console.log(res);
        yield put({
          type: 'updateState',
          payload: {
            CurrentCashDesks: res.object
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
