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

import { fetchOrderData } from "../../services/thunk";
import { GET_CONSTRUCTOR } from "../../services/action-types";
import { useDrop } from "react-dnd";
import uuid from 'react-uuid';

import { constructorActions } from "../../services/actions/constructor-actions-creator";

const OrderDetails = () => {
    const orderData = useSelector(currentOrderSelector);
    console.log("orderData=", orderData);

    return (
        <Modal modalId="portal" overflow="visible" caption="" >
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

                {/* <div className={'p-12 ' + burgerConstructorStyles.colored}>
                    <p className='p-15' style={{ transform: 'scale(2)' }}>
                        <CheckMarkIcon style={{ width: '120px', height: '120px' }} type='primary' />
                    </p>
                </div> */}

                {/* <div className={'p-12 ' + burgerConstructorStyles.colored}>
                <svg width="107" height="102" viewBox="0 0 107 102" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.36637 37.3873C2.54454 45.5044 2.54455 56.4957 8.36637 64.6127L28.3336 92.4518C34.1554 100.569 44.4748 103.965 53.8947 100.865L86.2023 90.2313C95.6223 87.1309 102 78.2387 102 68.2055V33.7945C102 23.7612 95.6222 14.8691 86.2023 11.7687L53.8947 1.13508C44.4748 -1.96536 34.1554 1.43114 28.3336 9.54819L8.36637 37.3873Z" fill="url(#paint0_radial_724_425)" fill-opacity="0.25"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M103.944 39.453C108.019 46.5983 108.019 55.4017 103.944 62.547L88.5996 89.453C84.5247 96.5983 76.994 101 68.8442 101H38.1558C30.006 101 22.4753 96.5983 18.4004 89.453L3.05617 62.547C-1.01872 55.4017 -1.01872 46.5983 3.05617 39.453L18.4004 12.547C22.4753 5.40169 30.006 1 38.1558 1L68.8442 1C76.994 1 84.5247 5.40169 88.5996 12.547L103.944 39.453Z" fill="url(#paint1_radial_724_425)" fill-opacity="0.25"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M43.9249 20.9109C49.3362 17.0297 56.6638 17.0297 62.0751 20.9109L80.6345 34.2224C86.0459 38.1036 88.3102 44.9832 86.2433 51.2632L79.1542 72.8016C77.0873 79.0815 71.1592 83.3333 64.4703 83.3333H41.5296C34.8408 83.3333 28.9127 79.0815 26.8458 72.8016L19.7567 51.2632C17.6898 44.9832 19.9541 38.1036 25.3655 34.2224L43.9249 20.9109Z" fill="url(#paint2_radial_724_425)" fill-opacity="0.25"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M73.3122 37.5959C74.1999 38.4172 74.2327 39.7806 73.3852 40.641L50.0519 64.3333C49.6272 64.7646 49.0371 65.0059 48.422 64.9999C47.8069 64.9939 47.222 64.741 46.8063 64.3016L34.5841 51.3785C33.7548 50.5016 33.8159 49.1392 34.7206 48.3354C35.6253 47.5316 37.031 47.5908 37.8604 48.4677L48.4773 59.6934L70.1703 37.6667C71.0177 36.8062 72.4244 36.7745 73.3122 37.5959Z" fill="#F2F2F3"/>
<defs>
<radialGradient id="paint0_radial_724_425" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(53 51) rotate(-46.1458) scale(70.7248 53.2019)">
<stop stop-color="#801AB3" stop-opacity="0"/>
<stop offset="1" stop-color="#4C4CFF"/>
</radialGradient>
<radialGradient id="paint1_radial_724_425" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(53.5 51) rotate(-43.0632) scale(73.2274 55.0025)">
<stop stop-color="#801AB3" stop-opacity="0"/>
<stop offset="1" stop-color="#4C4CFF"/>
</radialGradient>
<radialGradient id="paint2_radial_724_425" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(53 50.6667) rotate(136.146) scale(47.1499 35.4679)">
<stop stop-color="#801AB3" stop-opacity="0"/>
<stop offset="1" stop-color="#4C4CFF" stop-opacity="0.5"/>
</radialGradient>
</defs>
</svg>
                </div> */}





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
                dispatch(fetchOrderData(toFetchData));
                
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
