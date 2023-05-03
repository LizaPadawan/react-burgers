import { useState, useContext, useEffect, useMemo, FC } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useDrag } from "react-dnd";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import PropTypes from "prop-types";
import ingredientPropTypes from "../ingredients-proptypes";
import {
  ingredientsSelector,
  openModalSelector,
  constructorSelector,
  currentOrderSelector,
} from "../../services/selectors";
import { modalActions } from "../../services/actions/modal-actions-creator";
import { fetchOrderData } from "../../services/thunk";
import { useDrop } from "react-dnd";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";

import { constructorActions } from "../../services/actions/constructor-actions-creator";
import { TIngredient } from "../ingredients-proptypes";
import { Identifier, XYCoord } from "dnd-core";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

const OrderDetails = () => {
  const dispatch = useAppDispatch();
  const orderData = useAppSelector(currentOrderSelector);
  //console.log("orderData=", orderData);
  const onClose = () => {
    dispatch(modalActions.closeModal());
  };

  return (
    <Modal modalId="portal" overflow="visible" caption="" onClose={onClose}>
      <div className={burgerConstructorStyles.in_modal}>
        <p
          className={
            "text text_type_digits-large p-4 " + burgerConstructorStyles.colored
          }
        >
          {orderData}
        </p>
        <p
          className={
            "text text_type_main-medium p-8 " + burgerConstructorStyles.colored
          }
        >
          идентификатор заказа
        </p>

        <div className={"p-12 " + burgerConstructorStyles.colored}>
          <div className={"p-12 " + burgerConstructorStyles.check_img} />
        </div>

        <p
          className={
            burgerConstructorStyles.colored + " text text_type_main-default"
          }
        >
          Ваш заказ начали готовить
        </p>
        <p
          className={
            burgerConstructorStyles.colored +
            " text text_type_main-default  text_color_inactive p-2"
          }
        >
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </Modal>
  );
};

const OrderInfo = () => {
  const dispatch = useAppDispatch();
  const data: Array<TIngredient> = useAppSelector(constructorSelector);
  const bun: TIngredient | undefined = data.find(
    (item: TIngredient): boolean => item.type == "bun"
  );
  const bunPrice: number = bun ? bun.price : 0;
  const noBunIngredients: Array<TIngredient> = data.filter(
    (item: TIngredient) => item.type !== "bun"
  );
  const summ =
    noBunIngredients.length > 0
      ? bunPrice * 2 +
        data
          .filter((item: TIngredient) => item.type !== "bun")
          .map((item: TIngredient) => item.price)
          .reduce((a: number, b: number) => {
            return a + b;
          })
      : bunPrice * 2;
  const toFetchData = bun ? [bun, ...noBunIngredients, bun] : noBunIngredients;
  const navigate = useNavigate();

  return (
    <div className={burgerConstructorStyles.orderInfoContainer + " p-4"}>
      <p
        className={
          burgerConstructorStyles.gap + ` text text_type_digits-medium p-6`
        }
      >
        {summ}
        <CurrencyIcon type="primary" />
      </p>

      <Button
        htmlType="button"
        type="primary"
        size="medium"
        onClick={(e) => {
          dispatch(fetchOrderData(toFetchData, navigate));
        }}
      >
        Оформить заказ
      </Button>
    </div>
  );
};

export type TConstructorBunElementProps = {
  type: "top" | "bottom" | undefined;
};

const ConstructorBunElement: FC<TConstructorBunElementProps> = ({ type }) => {
  const data: Array<TIngredient> = useAppSelector(constructorSelector);
  //const type = props.type;
  const item: TIngredient | undefined =
    data.length > 0 ? data.find((item) => item.type == "bun") : undefined;

  return item ? (
    <div className={"ml-5" + burgerConstructorStyles.burger_component}>
      <ConstructorElement
        type={type}
        isLocked={true}
        text={item.name + (type == "top" ? " (верх)" : " (низ)")}
        price={item.price}
        thumbnail={item.image_mobile}
        extraClass="ml-6"
      />
    </div>
  ) : (
    <></>
  );
};

// ConstructorBunElement.propTypes = {
//     type: PropTypes.string.isRequired,
// };

const ConstructorIngredientsList: FC = () => {
  const dispatch = useAppDispatch();
  const data: Array<TIngredient> = useAppSelector(constructorSelector);
  const ingredients = data.filter((item) => item.type !== "bun");
  const bun = data.find((item) => item.type == "bun");

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = ingredients[dragIndex];
      const newCards = [...ingredients];
      if (bun) newCards.push(bun);
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);

      //dispatch(actionCreators.getConstructor(newCards))
      dispatch(constructorActions.setConstructor(newCards));
    },
    [ingredients, dispatch]
  );

  return (
    <>
      {ingredients.map((item, index) => (
        <OrderedIngredient
          key={item.dragId}
          index={index}
          item={item}
          moveCard={moveCard}
        />
      ))}
    </>
  );
};

export type TOrderedIngredientProps = {
  item: TIngredient;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
};

export type TDragItem = {
  id: string;
  type: string;
  left: number;
  top: number;
  index: number;
};

const OrderedIngredient: FC<TOrderedIngredientProps> = ({
  item,
  index,
  moveCard,
}) => {
  const dispatch = useAppDispatch();
  const data: Array<TIngredient> = useAppSelector(constructorSelector);

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    TDragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "component",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "component",
    //item: () => ({ id: item.id, index }),
    item: () => ({ id: item._id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const preventDefault = (e: Event) => e.preventDefault();

  const close = (dragId: string | undefined) => {
    dispatch(
      constructorActions.setConstructor(
        data.filter((item) => item.dragId !== dragId)
      )
    );
  };

  return (
    <div
      ref={ref}
      style={{ opacity }}
      onDrop={() => preventDefault}
      data-handler-id={handlerId}
    >
      <section className={burgerConstructorStyles.burger_component}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={item.name}
          price={item.price}
          thumbnail={item.image_mobile}
          handleClose={() => close(item.dragId)}
        />
      </section>
    </div>
  );
};

// OrderedIngredient.propTypes = {
//     item: ingredientPropTypes.isRequired,
//     index: PropTypes.number.isRequired,
//     moveCard: PropTypes.func.isRequired,
// }

const BurgerConstructor = () => {
  const isOpen = useAppSelector(openModalSelector);
  const data = useAppSelector(constructorSelector);
  const dataIngredients = useAppSelector(ingredientsSelector);
  const dispatch = useAppDispatch();

  const [{ isHover }, dropTargerRef] = useDrop<
    TIngredient,
    void,
    { isHover: boolean }
  >({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),

    drop(item) {
      console.log(item);

      if (item.type !== "bun") {
        dispatch(
          constructorActions.setConstructor([
            ...data,
            { ...item, dragId: uuid() },
          ])
        );
      } else {
        // если перетаскивается булка, стираются все булки в списке
        const newData = data.filter((item: TIngredient) => item.type !== "bun");
        dispatch(
          constructorActions.setConstructor([
            ...newData,
            { ...item, dragId: uuid() },
          ])
        );
      }
    },
  });

  return (
    <div
      className={
        burgerConstructorStyles.burger_constructor_panel +
        " " +
        `${isHover ? burgerConstructorStyles.onHover : ""}`
      }
      ref={dropTargerRef}
      test-id='constructor-spread'
    >
      {data.length > 0 ? (
        <div className={burgerConstructorStyles.burger_components} test-id='constructor'>
          <ConstructorBunElement type="top" />

          <div className={burgerConstructorStyles.list}>
            <ConstructorIngredientsList />
          </div>

          <ConstructorBunElement type="bottom" />
        </div>
      ) : (
        <div className={burgerConstructorStyles.burger_constructor_header} test-id='empty_constructor'>
          <p className="text text_type_main-medium">Перетащите элементы сюда</p>
        </div>
      )}

      <>
        <div className={burgerConstructorStyles.burger_info_panel}>
          <OrderInfo />
        </div>

        {isOpen && <OrderDetails />}
      </>
    </div>
  );
};

export default BurgerConstructor;
