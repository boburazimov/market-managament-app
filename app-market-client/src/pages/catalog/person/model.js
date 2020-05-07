import api from 'api'
import {toast} from "react-toastify";

const {addCompany, getCompanies, deleteCompany} = api;

export default ({

  namespace: 'companyModel',

  state: {
    companies: [],
    showModal: false,
    pathname: '',
    currentItem: '',
    path: '',
    id: '',
  },

  subscriptions: {},

  effects: {

    * addCompany({payload}, {call, put}) {
      const res = yield call(addCompany, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            showModal: false
          }
        });
        toast.success(payload.fullName + ' saqlandi!');
        yield put({
          type: 'getCompanies',
        })
      } else {
        toast.error(payload.fullName + ' saqlashda hatolik!')
      }
    },

    * getCompanies({}, {call, put}) {
      const res = yield call(getCompanies);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            companies: res.object
          }
        })
      }
    },

    * editCompany({payload}, {call, put}) {
      const res = yield call(addCompany, payload);
      if (res.success) {
        yield put({
          type: 'updateState',
          payload: {
            showModal: false,
            currentItem: '',
          }
        });
        toast.success(payload.fullName + ' tahrirlandi!');
        yield put({
          type: 'getCompanies'
        })
      } else {
        toast.error(payload.fullName + ' tahrirlashda hatolik!')
      }
    },

    * deleteCompany({payload}, {call, put}) {
      const res = yield call(deleteCompany, payload);
      if (res.success) {
        toast.success(res.message);
        yield put({
          type: 'getCompanies'
        })
      } else {
        toast.error(res.message)
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
