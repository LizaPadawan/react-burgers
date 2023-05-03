import { TinitialState } from "../initial-state" ;
import { SET_CONSTRUCTOR, CLEAN_CONSTRUCTOR } from "../action-types";
import { TActions } from "../action-types";
import { TConstructorActions } from "../actions/constructor-actions-creator";
import { constructorReduser } from "./constructor-reducer";

const initialState = {
    constructor: [],
};

const mockedData = [{
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    name: "Краторная булка N-200i",
    price: 1255,
    proteins: 80,
    type: "bun",
    __v: 0,
    _id: "60d3b41abdacab0026a733c6",
    customID: "60d3b41abdacab0026add"
  },
  {
    calories: 643,
    carbohydrates: 85,
    fat: 26,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    name: "Флюоресцентная булка R2-D3",
    price: 988,
    proteins: 44,
    type: "bun",
    __v: 0,
    _id: "60d3b41abdacab0026a733c7",
    customID: "63d3b44545gbdacab0026add"
  }]

describe("constructorReduser", () => {

    it("should return the initial state", () => {
      expect(
        constructorReduser(undefined, {type: undefined})
      ).toEqual(initialState);
    });

    it("should return data set with SET_CONSTRUCTOR", () => {
        expect(
          constructorReduser(initialState, {type: SET_CONSTRUCTOR, payload: mockedData})
        ).toEqual( {
            ...initialState,
            constructor: mockedData
        });
      });

    it("should return the initial state with CLEAN_CONSTRUCTOR", () => {
        expect(
          constructorReduser({
            ...initialState,
            constructor: mockedData
          }, {type: CLEAN_CONSTRUCTOR})
        ).toEqual( {
            ...initialState
        });
      });
      
});