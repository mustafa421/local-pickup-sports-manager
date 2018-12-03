import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const { token, userAccountData } = action.payload;
      return {
        token,
        userAccountData
      };
    }
    case LOGIN_FAIL: {
      return { token: null };
    }
    case LOGOUT: {
      return { token: null };
    }
    default:
      return state;
  }
}
