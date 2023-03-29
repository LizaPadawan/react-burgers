import { useState, useContext, useEffect, useMemo } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import Modal from "../modal/modal";
import PropTypes from 'prop-types';
import ingredientPropTypes from "../ingredients-proptypes";
import { ingredientsSelector, openModalSelector, currentIngredientSelector, constructorSelector, currentOrderSelector } from '../../services/selectors';
import { modalActions } from "../../services/actions/modal-actions-creator";
import { fetchOrderData } from "../../services/thunk";
import { GET_CONSTRUCTOR } from "../../services/action-types";
import { useDrop } from "react-dnd";
import uuid from 'react-uuid';
import { useNavigate } from "react-router-dom";


import { constructorActions } from "../../services/actions/constructor-actions-creator";

const OrderDetails = () => {
    const dispatch = useDispatch();
    const orderData = useSelector(currentOrderSelector);
    //console.log("orderData=", orderData);
    const onClose = () => {dispatch(modalActions.closeModal())};

    return (
        <Modal modalId="portal" overflow="visible" caption="" onClose={onClose}>
            <div className={burgerConstructorStyles.in_modal}>
                <p className={'text text_type_digits-large p-4 ' + burgerConstructorStyles.colored}>
                    {orderData}
                </p>
                <p className={'text text_type_main-medium p-8 ' + burgerConstructorStyles.colored}>
                    идентификатор заказа
                </p>

                <div className={'p-12 ' + burgerConstructorStyles.colored}>
                 <div className={'p-12 ' + burgerConstructorStyles.check_img}/>
                 </div>

                <p className={burgerConstructorStyles.colored + ' text text_type_main-default'}>
                    Ваш заказ начали готовить
                </p>
                <p className={burgerConstructorStyles.colored + ' text text_type_main-default  text_color_inactive p-2'}>
                    Дождитесь готовности на орбитальной станции
                </p>
            </div>

        </Modal>
    );
}


const OrderInfo = () => {

    const dispatch = useDispatch();
    const data = useSelector(constructorSelector);
    const bun = data.find(item => item.type == 'bun');
    const bunPrice = (bun) ? bun.price : 0;
    const noBunIngredients = data.filter(item => item.type !== 'bun');
    const summ = (noBunIngredients.length > 0) ? bunPrice * 2 + data.filter(item => item.type !== 'bun').map((item) => item.price).reduce((a, b) => { return a + b; }): bunPrice * 2;
    const toFetchData = (bun) ? [bun, ...noBunIngredients, bun] : noBunIngredients;
    const navigate = useNavigate();

    return (

        <div className='p-4' style={{
            display: 'flex', justifyContent: 'center',
            alignItems: 'center',
            width: "600px"
        }}>

            <p className={`text text_type_digits-medium p-6`} style={{ gap: '10px' }}>
                {summ}
                <CurrencyIcon style={{ width: '22', height: '22' }} type='primary' />
            </p>

            <Button htmlType="button" type="primary" size="medium" onClick={e => { 
                dispatch(fetchOrderData(toFetchData, navigate));
                
                }}>
                Оформить заказ
            </Button>


        </div>

    );
}


function ConstructorBunElement(props) {
  
    const data = useSelector(constructorSelector);
    const type = props.type;
    const item = (data.length > 0) ? data.find(item => item.type == 'bun') : undefined;

    return (
        (item) ? <div className={"ml-5" + burgerConstructorStyles.burger_component}>
            <ConstructorElement
                type={type}
                isLocked={true}
                text={item.name + ((type == "top") ? " (верх)" : " (низ)")}
                price={item.price}
                thumbnail={item.image_mobile}
                extraClass='ml-6'
            />
        </div> : <></>
    );

}

ConstructorBunElement.propTypes = {
    type: PropTypes.string.isRequired,
}; 


function ConstructorIngredientsList() {
    const dispatch = useDispatch();
    const data = useSelector(constructorSelector);
    const ingredients = data.filter(item => item.type !== 'bun');
    const bun = data.find(item => item.type == 'bun');

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = ingredients[dragIndex];
        const newCards = [...ingredients];
        if (bun) newCards.push(bun);
        newCards.splice(dragIndex, 1)
        newCards.splice(hoverIndex, 0, dragCard)

        //dispatch(actionCreators.getConstructor(newCards))
        dispatch( constructorActions.setConstructor(newCards) )
    }, [ingredients, dispatch]);

    return (
        ingredients.map((item, index) => (
            <OrderedIngredient key={item.dragId} index={index} item={item} moveCard={moveCard} />
        ))
    )
}

function OrderedIngredient({ item, index, moveCard }) {
    const dispatch = useDispatch();
    const data = useSelector(constructorSelector);

    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: 'component',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
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

            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'component',
        item: () => ({ id: item.id, index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    const preventDefault = (e) => e.preventDefault();

    const close = (dragId) => {
        //dispatch(actionCreators.getConstructor(data.filter(item => item.dragId !== dragId)))
        dispatch(constructorActions.setConstructor(data.filter(item => item.dragId !== dragId)))
    }

    return (
        <div
            ref={ref}
            style={{ opacity }}
            onDrop={preventDefault}
            data-handler-id={handlerId}
        >
            <section className={burgerConstructorStyles.burger_component}>
                <DragIcon type='primary' />
                <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image_mobile}
                handleClose={() => close(item.dragId)}
                />
            </section>
        </div>
    )
}

OrderedIngredient.propTypes = {
    item: ingredientPropTypes.isRequired,
    index: PropTypes.number.isRequired,
    moveCard: PropTypes.func.isRequired,
}





const BurgerConstructor = () => {
    const isOpen = useSelector(openModalSelector);
    const data = useSelector(constructorSelector);
    const dispatch = useDispatch();

    const [{ isHover }, dropTargerRef] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),

        drop(item) {

            if (item.type !== 'bun'){
                //dispatch(actionCreators.getConstructor([...data, { ...item, dragId: uuid()}]))
                dispatch(constructorActions.setConstructor([...data, { ...item, dragId: uuid()}]))
            } else { // если перетаскивается булка, стираются все булки в списке
                const newData = data.filter(item => item.type !== 'bun');
                //dispatch(actionCreators.getConstructor([...newData, { ...item, dragId: uuid()}]))
                dispatch(constructorActions.setConstructor([...newData, { ...item, dragId: uuid()}]))
                
            }
        }
    });

    return (
        <div className={burgerConstructorStyles.burger_constructor_panel + ' ' + `${isHover ? burgerConstructorStyles.onHover : ''}`}  ref={dropTargerRef}>
            {(data.length > 0) ? 
            <div className={burgerConstructorStyles.burger_components}>

                <ConstructorBunElement type="top" />

                <div style={{
                    display: 'flex', flexDirection: 'column', overflowY: "scroll", gap: '10px',
                }}>
                    <ConstructorIngredientsList />

                </div>

                <ConstructorBunElement type="bottom" />

            </div>
            :           
            <div className={burgerConstructorStyles.burger_constructor_header}>
                <p className="text text_type_main-medium">
                    Перетащите элементы сюда
                </p>
            </div>}

            <>
                <div className={burgerConstructorStyles.burger_info_panel}>
                    <OrderInfo />
                </div>

                {(isOpen) &&
                    <OrderDetails />
                }
            </>

        </div>
    );
};


export default BurgerConstructor;
