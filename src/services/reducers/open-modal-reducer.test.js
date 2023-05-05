import { modalReduser } from "./open-modal-reducer";
import { OPEN_MODAL, CLOSE_MODAL } from "../action-types";
import { initialState as init } from "../initial-state";

const initialState = init.modalReduser;

describe("modalReduser", () => {

    it("should return the initial state", () => {
      expect(
        modalReduser(undefined, {type: undefined})
      ).toEqual(initialState);
    });

    it("should set true", () => {
        expect(
            modalReduser(initialState, {type: OPEN_MODAL})
        ).toEqual(
            {
                ...initialState,
                isModalOpen: true
            });
      });

      it("should set false", () => {
        expect(
            modalReduser(initialState, {type: CLOSE_MODAL})
        ).toEqual(
            {
                ...initialState,
                isModalOpen: false
            });
      });
});