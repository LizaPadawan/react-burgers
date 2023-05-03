import { orderReduser } from "./order-reducer";
import { FETCH_ORDER_ERROR, FETCH_ORDER_SUCCESS, FETCH_ORDER_REQUEST } from "../action-types";

const initialState = {orderNumber: null};
const mockedData = 1024;

describe("orderReduser", () => {

    it("should return the initial state", () => {
      expect(
        orderReduser(undefined, {type: undefined})
      ).toEqual(initialState);
    });

    it("should return data set with FETCH_ORDER_SUCCESS", () => {
        expect(
            orderReduser(initialState, {type: FETCH_ORDER_SUCCESS, payload: mockedData})
        ).toEqual( {
            ...initialState,
            orderNumber: mockedData
        });
      });

    it("should return the initial state with FETCH_ORDER_ERROR", () => {
        expect(
            orderReduser({
            ...initialState,
            orderNumber: mockedData
          }, {type: FETCH_ORDER_ERROR})
        ).toEqual( {
            ...initialState
        });
      });

    it("should return the current state with FETCH_ORDER_REQUEST", () => {
        expect(
            orderReduser({
            ...initialState,
            orderNumber: mockedData
          }, {type: FETCH_ORDER_REQUEST})
        ).toEqual(
            {
                ...initialState,
                orderNumber: mockedData
              }
        );
      });
});