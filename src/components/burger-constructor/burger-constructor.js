import { useState, useContext, useEffect, useMemo } from "react";

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import Modal from "../modal/modal";
import PropTypes from 'prop-types';
import ingredientPropTypes from "../ingredients-proptypes";
import { DataContext } from '../../services/data-context';
import { OrderContext } from '../../services/order-context';
import { sendOrder } from "./burger-constructor-service";


const OrderDetails = (props) => {
    const { orderData } = useContext(OrderContext); 

    return (
        <Modal modalId="portal" overflow="visible" caption="" close={props.setOpenModal} >
            <div className={burgerConstructorStyles.in_modal}>
                <p className={'text text_type_digits-large p-4 ' + burgerConstructorStyles.colored}>
                    {orderData}
                </p>
                <p className={'text text_type_main-medium p-8 ' + burgerConstructorStyles.colored}>
                    идентификатор заказа
                </p>
                <div className={'p-12 ' + burgerConstructorStyles.colored}>
                    <p className='p-15' style={{ transform: 'scale(2)' }}>
                        <CheckMarkIcon style={{ width: '120px', height: '120px' }} type='primary' />
                    </p>
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

OrderDetails.propTypes = {
    setOpenModal: PropTypes.func.isRequired,
};

const OrderInfo = (props) => {
    const data = useContext(DataContext);
    const { setOrderData } = useContext(OrderContext); 
    const summ = data.find(item => item.type == 'bun').price * 2 + data.filter(item => item.type !== 'bun').map((item) => item.price).reduce((a, b) => { return a + b; });

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

            <Button htmlType="button" type="primary" size="medium" onClick={e => { sendOrder(data, setOrderData); props.openModal(true) }}>
                Оформить заказ
            </Button>


        </div>

    );
}

OrderInfo.propTypes = {
    openModal: PropTypes.func.isRequired,
};

function ConstructorBunElement(props) {
    const data = useContext(DataContext);
    const type = props.type;
    const item = data.find(item => item.type == 'bun');

    return (
        <div className={"ml-5" + burgerConstructorStyles.burger_component}>


            <ConstructorElement
                type={type}
                isLocked={true}
                text={item.name + ((type == "top") ? " (верх)" : " (низ)")}
                price={item.price}
                thumbnail={item.image_mobile}
                extraClass='ml-6'
            />


        </div>
    );

}

ConstructorBunElement.propTypes = {
    type: PropTypes.string.isRequired
};


const BurgerConstructor = () => {

    const data = useContext(DataContext);
    const [openModal, setOpenModal] = useState(false);
    const [orderData, setOrderData] = useState(0);

    return (
        <div className={burgerConstructorStyles.burger_constructor_panel}>
            <div className={burgerConstructorStyles.burger_components}>

                <ConstructorBunElement type="top" />

                <div style={{
                    display: 'flex', flexDirection: 'column', overflowY: "scroll", gap: '10px',
                }}>

                    {
                        data.map(item => item.type !== 'bun' && (
                            <section key={data.indexOf(item)} className={burgerConstructorStyles.burger_component}>
                                <DragIcon type='primary' />
                                <ConstructorElement
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image_mobile}

                                />
                            </section>
                        ))
                    }

                </div>

                <ConstructorBunElement type="bottom" />

            </div>

            <OrderContext.Provider value={{orderData, setOrderData}}>
                <div className={burgerConstructorStyles.burger_info_panel}>
                    <OrderInfo openModal={setOpenModal} />
                </div>

                {((openModal) && (orderData > 0)) &&
                    <OrderDetails setOpenModal={setOpenModal} />
                }
            </OrderContext.Provider>

        </div>
    );
};

ConstructorElement.propTypes = {
    ...ingredientPropTypes.isRequired,
}



export default BurgerConstructor;
