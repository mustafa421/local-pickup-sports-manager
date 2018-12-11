import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_ACCOUNT
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const { token, userAccountData } = action.payload;
      return Object.assign({}, state, {
        token,
        userAccountData,
        logoutStatus: false
      });
    }
    case UPDATE_ACCOUNT: {
      const { userAccountData } = action.payload;
      return Object.assign({}, state, {
        userAccountData
      });
    }
    case LOGIN_FAIL: {
      // Not using object assign since we want to wipe state completely
      return { token: null };
    }
    case LOGOUT: {
      // Not using object assign since we want to wipe state completely
      return { token: null, logoutStatus: true };
    }
    default:
      return state;
  }
}
