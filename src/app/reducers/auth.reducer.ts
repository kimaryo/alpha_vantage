export const auth = (
  state: any = {
    signedIn: false,
    signingIn: false,
    creatingAccount: false,
    user: {}
  },
  { type, payload }
) => {
  console.log(state);
  switch (type) {
    case "LOG_IN":
      return {
        ...state,
        signingIn: true
      };
    case "LOG_IN_SUCCESS":
      return {
        ...state,
        signedIn: true,
        signingIn: false,
        user: payload
      };
    case "LOG_IN_FAILED":
      return {
        ...state,
        signingIn: false
      };
    case "CREATE_ACCOUNT":
      return {
        ...state,
        creatingAccount: true
      };
    case "CREATE_ACCOUNT_SUCCESS":
      return {
        ...state,
        signedIn: true,
        creatingAccount: false
      };
    case "CREATE_ACCOUNT_FAILED":
      return {
        ...state,
        creatingAccount: false
      };
    default:
      return state;
  }
};
