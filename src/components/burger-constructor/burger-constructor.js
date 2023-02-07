import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import  burgerConstructorStyles  from './burger-constructor.module.css';

const BurgerConstructor = (props) => {
    const { data } = props;

    return (
        <div className={burgerConstructorStyles.burger_constructor_panel}>
            <div className={burgerConstructorStyles.burger_components}>
                
                <div className={burgerConstructorStyles.burger_component}>
                <DragIcon type="primary"/>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${data.find(item => item.type === 'bun').name} (верх)`}
                        price={data.find(item => item.type === 'bun').price}
                        thumbnail={data.find(item => item.type === 'bun').image_mobile}
                    />
                </div>

                <div className={burgerConstructorStyles.burger_component}>
                    <DragIcon type="primary"/>
                <ConstructorElement
                    text={data[2].name}
                    price={data[2].price}
                    thumbnail={data[2].image_mobile}
                />
                </div>

                <div className={burgerConstructorStyles.burger_component}>
                    <DragIcon type="primary"/>
                <ConstructorElement
                    text={data[4].name}
                    price={data[4].price}
                    thumbnail={data[4].image_mobile}
                />
                </div>

                <div className={burgerConstructorStyles.burger_component}>
                    <DragIcon type="primary"/>
                <ConstructorElement
                    text={data[5].name}
                    price={data[5].price}
                    thumbnail={data[5].image_mobile}
                />
                </div>

                <div className={burgerConstructorStyles.burger_component}>
                    <DragIcon type="primary"/>
                <ConstructorElement
                    text={data[7].name}
                    price={data[7].price}
                    thumbnail={data[7].image_mobile}
                />
                </div>

                <div className={burgerConstructorStyles.burger_component}>
                    <DragIcon type="primary"/>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${data.find(item => item.type === 'bun').name} (низ)`}
                    price={data.find(item => item.type === 'bun').price}
                    thumbnail={data.find(item => item.type === 'bun').image_mobile}
                />
                </div>

            </div>

            <div className={burgerConstructorStyles.burger_info}>
                <div className={burgerConstructorStyles.burger_price}>
                    610
                </div>

            </div>
        </div>
    );
};

export default BurgerConstructor;