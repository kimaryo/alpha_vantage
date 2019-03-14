export const auth = (state: any = { signedIn: false }, { type, payload }) => {
  switch (type) {
    case "LOG_IN_SUCCESS":
      return {
        ...state,
        signedIn: true
      };
    default:
      return state;
  }
};
