import Cookies from 'js-cookie'

const TokenKey = 't_nk'
const SwitchTenantKey = 's_t_k'

export function getToken() {
    return Cookies.get(TokenKey)
}
export function getSwitch() {
    return Cookies.get(SwitchTenantKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}
export function setSwitch(token) {
    return Cookies.set(SwitchTenantKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
export function removeSwitch() {
    return Cookies.remove(SwitchTenantKey)
}
