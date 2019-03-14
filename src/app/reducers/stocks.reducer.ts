export const stocks = (
  state: any = {
    stocks: [],
    stockShowing: [],
    fetchingStock: false
  },
  { type, payload }
) => {
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
        stockShowing: payload,
        fetchingStock: true
      };
    case "GET_STOCK_SUCCESS":
      return {
        ...state,
        stockShowing: payload,
        fetchingStock: false
      };
    case "ADD_STOCK":
      return {
        ...state,
        stocks: [...state.stocks, payload]
      };
    default:
      return state;
  }
};
