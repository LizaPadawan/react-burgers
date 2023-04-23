import { FC, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './order.module.css';
import { TOrder } from '../order-proptypes';
import { TIngredient } from '../ingredients-proptypes';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsSelector } from '../../services/selectors';

interface OrderProps {
    order: TOrder;
    withStatus?: boolean;
    extraClass?: string | undefined;
}

const Order: FC<OrderProps> = ({ order, withStatus = false, extraClass = undefined }) => {
    const location = useLocation();
    const ingredientsList : Array<TIngredient> = useSelector(ingredientsSelector);

    const ingredients = useMemo<TIngredient[]>(() => {
        const ingredients: TIngredient[] = [];
        order.ingredients.forEach((ingredientId: string) => {
            if (ingredientId !== null || ingredientId !== undefined) {
                const ingredientItem = ingredientsList.find(ingredient => ingredient._id === ingredientId);
                if (ingredientItem !== undefined) {
                    ingredients.push(ingredientItem);
                }
            }
        });
        return ingredients;
    }, [order, ingredientsList]);

    const totalPrice = useMemo(() => {
        return ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
    }, [ingredients]);

    const maxIndex = 6;
    const nameStatus = ((order && order.status === 'done') && 'Выполнен') || ((order && order.status === 'pending') && 'Готовится') || ((order && order.status === 'created') && 'Создан');

    return (
        <Link
            to={`${location.pathname}/${order._id}`}
            className={`${styles.item} p-6 mb-4 mr-2 ${extraClass}`}
            state={{ background: location }}
        >
            <section className={`${styles.info} mb-6`}>
                <p className='text text_type_digits-default'>
                    {`#${order.number}`}
                </p>
                <p className='text text_type_main-default text_color_inactive'>
                    <FormattedDate date={new Date(order.createdAt)} />
                </p>
            </section>
            <p className='text text_type_main-medium mb-6'>
                {order.name}
            </p>
            {withStatus && (
                <p className={`text text_type_main-default ${order.status === 'done' && styles.ready} mb-15`}>
                    {nameStatus}
                </p>
            )}
            <section className={styles.ingredients}>
                <section className={styles.container}>
                    {ingredients.slice(0, 6).map((ingredient, index) => (
                        <div key={index} style={{ left: -(20 * index), zIndex: maxIndex - index }} className={styles.image}>
                            <div className={styles.overlay}>
                                {(order.ingredients.length > 6 && maxIndex - index === 1) && (
                                    <section className={styles.count}>
                                        <p className='text text_type_digits-default'>
                                            {`+${order.ingredients.length - 6}`}
                                        </p>
                                    </section>
                                )}
                                <img src={ingredient.image_mobile} alt='ingredient' />
                            </div>
                        </div>
                    ))}
                </section>
                <section className={styles.price}>
                    <p className='text text_type_digits-default'>
                        {totalPrice}
                    </p>
                    <CurrencyIcon type='primary' />
                </section>
            </section>
        </Link>
    );
};

export default Order;