import { GET_HISTORY_WITH_RESPONSE } from "@/graphql/queries";


export const historyWithResponseMock = {
  request: {
      query: GET_HISTORY_WITH_RESPONSE,
      variables: {
          historyWithResponseUrlId: "c7ecd9cf-1e12-4e0c-9a0f-acccd1395bbf",
      },
  },
  result: {
      data: {
          historyWithResponse: {
              response: "",
              id: "",
              status_code: 0,
          },
      },
  },
};