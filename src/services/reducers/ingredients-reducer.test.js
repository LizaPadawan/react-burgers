import { ingredientsReduser } from "./ingredients-reducer";
import { FETCH_INGREDIENTS_SUCCESS, FETCH_INGREDIENTS_ERROR, FETCH_ORDER_REQUEST, FETCH_INGREDIENTS_REQUEST } from "../action-types";

const initialState = {
    ingredients: [],
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

describe("ingredientsReduser", () => {

    it("should return the initial state", () => {
      expect(
        ingredientsReduser(undefined, {type: undefined})
      ).toEqual(initialState);
    });

    it("should return data set with FETCH_INGREDIENTS_SUCCESS", () => {
        expect(
            ingredientsReduser(initialState, {type: FETCH_INGREDIENTS_SUCCESS, payload: mockedData})
        ).toEqual( {
            ...initialState,
            ingredients: mockedData
        });
      });

    it("should return the initial state with FETCH_INGREDIENTS_ERROR", () => {
        expect(
            ingredientsReduser({
            ...initialState,
            ingredients: mockedData
          }, {type: FETCH_INGREDIENTS_ERROR})
        ).toEqual( {
            ...initialState
        });
      });

    it("should return the current state with FETCH_INGREDIENTS_REQUEST", () => {
        expect(
            ingredientsReduser({
            ...initialState,
            ingredients: mockedData
          }, {type: FETCH_INGREDIENTS_REQUEST})
        ).toEqual(
            {
                ...initialState,
                ingredients: mockedData
              }
        );
      });
      
});
