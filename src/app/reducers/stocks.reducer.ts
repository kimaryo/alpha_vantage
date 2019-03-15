export const stocks = (
  state: Object = { stocks: [], stockShowing: [], fetchingStock: false },
  { type, payload }
) => {
  console.log(type);
  console.log(payload);
  switch (type) {
    case "GET_MY_STOCKS_SUCCESS":
      return {
        ...state,
        stocks: payload
      };
    case "GET_STOCK":
      return {
        ...state,
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
