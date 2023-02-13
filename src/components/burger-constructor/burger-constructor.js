import { useState } from "react";

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import Modal from "../modal/modal";
import PropTypes from 'prop-types';


const OrderInfo = (props) => {
    return (
        // <section className={'mt-10' + burgerConstructorStyles.burger_info}>
        <>
            <div className={'mt-10' + burgerConstructorStyles.burger_price}>
                <p className='text text_type_digits-medium'>
                    {props.summ}
                </p>
            </div>
                <CurrencyIcon type='primary' />
           
        <Button htmlType="button" type="primary" size="medium" onClick={e => { props.openModal(true) }}>
          Оформить заказ
        </Button>
            
            </>
        // </section>
    );
}

OrderInfo.propTypes = {
    openModal: PropTypes.func.isRequired,
    summ: PropTypes.number.isRequired
  }; 


const BurgerConstructor = (props) => {
    const { data } = props;
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className={burgerConstructorStyles.burger_constructor_panel}>
            <div className={burgerConstructorStyles.burger_components}>

                <div className={burgerConstructorStyles.burger_component + " pl-4"}>
                    
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={data.find(item => item.type === 'bun').name + ' (верх)'}
                        price={data.find(item => item.type === 'bun').price}
                        thumbnail={data.find(item => item.type === 'bun').image_mobile}
                    />
                </div>

                <div className={burgerConstructorStyles.burger_component}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        text={data[2].name}
                        price={data[2].price}
                        thumbnail={data[2].image_mobile}
                    />
                </div>

                <div className={burgerConstructorStyles.burger_component}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        text={data[4].name}
                        price={data[4].price}
                        thumbnail={data[4].image_mobile}
                    />
                </div>

                <div className={burgerConstructorStyles.burger_component}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        text={data[5].name}
                        price={data[5].price}
                        thumbnail={data[5].image_mobile}
                    />
                </div>

                <div className={burgerConstructorStyles.burger_component}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        text={data[6].name}
                        price={data[6].price}
                        thumbnail={data[6].image_mobile}
                    />
                </div>

                <div className={burgerConstructorStyles.burger_component}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        text={data[7].name}
                        price={data[7].price}
                        thumbnail={data[7].image_mobile}
                    />
                </div>

                <div className={burgerConstructorStyles.burger_component + " pl-4"} >
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={data.find(item => item.type === 'bun').name + ' (низ)'}
                        price={data.find(item => item.type === 'bun').price}
                        thumbnail={data.find(item => item.type === 'bun').image_mobile}
                    />
                </div>

            </div>

            <div className={burgerConstructorStyles.burger_info_panel}>
                <OrderInfo summ={610} openModal={setOpenModal}/>
            </div>

        {openModal  && 
            <Modal modalId="portal" overflow = "visible" caption="" close= {setOpenModal} >
                <div className={burgerConstructorStyles.in_modal}>
                <p className={'text text_type_digits-large p-4 ' + burgerConstructorStyles.colored}>
                    034536
                </p>
                <p className={'text text_type_main-medium p-8 ' + burgerConstructorStyles.colored}>
                    идентификатор заказа
                </p>
                <div className={'p-12 ' +  burgerConstructorStyles.colored}> 
                    <p className='p-15' style={{transform: 'scale(2)'}}> 
                    <CheckMarkIcon style={{width: '120px', height: '120px'}} type='primary' />
                    </p>
                </div>
                <p className={burgerConstructorStyles.colored + ' text text_type_main-default'}>
                    Ваш заказ начали готовить
                </p>
                <p className={burgerConstructorStyles.colored + ' text text_type_main-default  text_color_inactive p-2'}>
                    Дождитесь готовности на орбитальной станции
                </p>
                </div>
              
        </Modal>}
    

            
        </div>
    );
};

BurgerConstructor.propTypes = {
    data: PropTypes.array.isRequired,
  }; 



export default BurgerConstructor;