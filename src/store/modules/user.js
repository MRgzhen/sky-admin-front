import ajax from '@/utils/ajax'
import { getToken, removeToken } from '@/utils/auth'
import api from '@/api/api'
const initUser = () => {
    return {
        user: null,
        token: getToken()
    }
}
const user = {
    namespaced: true,
    state: initUser(),
    mutations: {
        SET_USER(state, data) {
            state.user = data
        },
        SET_TOKEN(state, data) {
            state.token = data
        },
        REST_USER(state) {
            Object.assign(state, initUser())
        }
    },
    actions: {
        getUserInfo({ commit }) {
            return new Promise((resolve, reject) => {
                ajax.get(api.sys.user.userMe, {}, true).then(result => {
                    commit('SET_USER', result.bean)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        cleanUser({ commit, state }) {
            removeToken()
            commit('REST_USER')
        }
    }
}

export default user
