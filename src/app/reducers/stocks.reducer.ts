export const stocks = (state: any = [], { type, payload }) => {
  switch (type) {
    case "GET_MY_STOCKS_SUCCESS":
      console.log(payload);
      return payload;
    case "ADD_STOCK":
      return payload;
    case "CREATE_STOCK":
      return [...state, payload];
    case "UPDATE_STOCK":
      return state.map(campaign => {
        return campaign.token === payload.token
          ? Object.assign({}, campaign, payload)
          : campaign;
      });
    case "DELETE_STOCK":
      return state.filter(campaign => {
        return campaign.token !== payload.token;
      });
    default:
      return state;
  }
};
