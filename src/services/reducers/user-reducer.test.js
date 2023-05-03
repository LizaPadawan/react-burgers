import { userReducer } from "./user-reducer";
import { FETCH_USER_ERROR, FETCH_USER_SUCCESS, FETCH_USER_REQUEST } from "../action-types";

const initialState = {	
    user: {
        email: "",
        name: ""
      }
};

const mockedData = {
    user: {
    email: "lizaPadawan@yandex.ru",
    name: "lizaPadawan"
  }
};

describe("userReducer", () => {

    it("should return the initial state", () => {
      expect(
        userReducer(undefined, {type: undefined})
      ).toEqual(initialState);
    });

    it("should return data set with FETCH_USER_SUCCESS", () => {
        expect(
            userReducer(initialState, {type: FETCH_USER_SUCCESS, payload: mockedData})
        ).toEqual( {
            ...initialState,
            user: mockedData
        });
      });

    it("should return the initial state with FETCH_USER_ERROR", () => {
        expect(
            userReducer({
            ...initialState,
            user: mockedData
          }, {type: FETCH_USER_ERROR})
        ).toEqual( {
            ...initialState
        });
      });

    it("should return the current state with FETCH_USER_REQUEST", () => {
        expect(
            userReducer({
            ...initialState,
            user: mockedData
          }, {type: FETCH_USER_REQUEST})
        ).toEqual(
            {
                ...initialState,
                user: mockedData
              }
        );
      });
});