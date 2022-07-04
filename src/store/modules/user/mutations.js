import {
  SET_MY_INFO,
  REMOVE_MY_INFO,
  SET_LOGIN_FORM_MODAL_VISIBLE,
  UPDATE_NICKNAME,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRE_TIME,
} from '@/constants'

const mutations = {
  [SET_MY_INFO](state, payload) {
    const {
      email,
      nickname,
      accessToken,
      accessTokenExpireTime,
      refreshToken,
      refreshTokenExpireTime,
    } = payload.data

    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN, refreshToken)
      localStorage.setItem(REFRESH_TOKEN_EXPIRE_TIME, refreshTokenExpireTime)
    }

    state.myInfo = {
      email,
      nickname,
      accessToken,
      accessTokenExpireTime,
    }
  },
  [REMOVE_MY_INFO](state) {
    state.myInfo = null
    localStorage.removeItem(REFRESH_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN_EXPIRE_TIME)
  },
  [SET_LOGIN_FORM_MODAL_VISIBLE](state, payload) {
    state.isLoginFormModalVisible = payload.visible
  },
  [UPDATE_NICKNAME](state, payload) {
    state.myInfo.nickname = payload.data.nickname
  },
}

export default mutations
