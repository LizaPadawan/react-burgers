import { useState, useContext, useEffect } from "react";

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


const OrderDetails = (props) => {

    const data = useContext(DataContext);

    const [orderData, setOrderData] = useState(0);

    const sendOrder = async (callback) => {
        const ingredients = data.map(item => item._id);

        const orderBurger = (ingredients) => {
            return fetch("https://norma.nomoreparties.space/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({
                    ingredients,
                }),
            });
        }

        const response = await orderBurger(ingredients);
        if (response.ok) { 
            const json = await response.json();
            console.log("json=", json);
            callback(json.order.number);
        } else {
            alert(`Ошибка HTTP: ${response.status}`);
        }
    }

    useEffect(
        () => {
            sendOrder(setOrderData);
        },
        []
    );

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

const OrderInfo = (props) => {
    const data = useContext(DataContext);
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

            <Button htmlType="button" type="primary" size="medium" onClick={e => { props.openModal(true) }}>
                Оформить заказ
            </Button>


        </div>

    );
}

OrderInfo.propTypes = {
    openModal: PropTypes.func.isRequired,
    //summ: PropTypes.number.isRequired
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
    //const { data } = props;

    const data = useContext(DataContext);
    const [openModal, setOpenModal] = useState(false);

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

            <div className={burgerConstructorStyles.burger_info_panel}>
                <OrderInfo openModal={setOpenModal} />
            </div>

            {openModal &&
                <OrderDetails setOpenModal={setOpenModal} />
            }

        </div>
    );
};

ConstructorElement.propTypes = {
    ...ingredientPropTypes.isRequired,
}

// BurgerConstructor.propTypes = {
//     data: PropTypes.array.isRequired,
// };



export default BurgerConstructor;
