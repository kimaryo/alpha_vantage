export const stocks = (
  state: any = { stocks: [], stockShowing: [], fetchingStock: false },
  { type, payload }
) => {
  switch (type) {
    case "GET_MY_STOCKS_SUCCESS":
      return {
        ...state,
        stocks: payload
      };
    case "GET_STOCK":
      return {
        ...state,
        stockShowing: payload,
        fetchingStock: true
      };
    case "GET_STOCK_SUCCESS":
      return {
        ...state,
        stockShowing: payload,
        fetchingStock: false
      };
    default:
      return state;
  }
};
