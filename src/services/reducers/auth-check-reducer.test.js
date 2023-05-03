import { TinitialState } from "../initial-state" ;
import { AUTH_CHECKED } from "../action-types";
import { TActions } from "../action-types";
import { IAuthCheckAction } from "../actions/auth-check-actions-creator";
import { authCheckReducer } from "./auth-check-reducer";

const initialState = {
    isAuthChecked: false
};

describe("authCheckReducer", () => {

    it("should return the initial state", () => {
      expect(
        authCheckReducer(undefined, {type: undefined})
      ).toEqual(initialState);
    });

    it("should set true", () => {
        expect(
          authCheckReducer(initialState, {type: AUTH_CHECKED})
        ).toEqual(
            {
                ...initialState,
                isAuthChecked: true
            });
      });

});