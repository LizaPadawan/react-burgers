import { FC, memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styles from './order-ingredients.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsSelector, wsSelector} from '../../services/selectors';
import { TWsData } from '../order-proptypes';
import { TIngredient } from '../ingredients-proptypes';
import { useAppSelector } from '../../utils/hooks';

const OrderIngredients: FC = () => {
    const { orderId } = useParams();
    console.log(orderId );
    const wsData : TWsData = useAppSelector(wsSelector);

    const order = useMemo(() => {
        return wsData.orders.find(order => order._id === orderId);
    }, [wsData]);

    const status = ((order && order.status === 'done') && 'Выполнен') || ((order && order.status === 'pending') && 'Готовится') || ((order && order.status === 'created') && 'Создан');
    const ingredientsStore : Array<TIngredient>  = useAppSelector(ingredientsSelector);

    const ingredients = useMemo(() => {
        const ingredients : Array<TIngredient>  = [];
        order?.ingredients.forEach((ingredientId) => {
            if (ingredientId !== null || ingredientId !== undefined) {
                const ingredientItem = ingredientsStore
                    .find(ingredient => ingredient._id === ingredientId);
                if (ingredientItem !== undefined) {
                    ingredients.push(ingredientItem);
                }
            }
        });
        return ingredients;
    }, [order, ingredientsStore]);

    const uniqueIngredients = useMemo(() => {
        const table : any = {};
        return ingredients.filter((ingredient) => (!table[ingredient._id] && (table[ingredient._id] = 1)));
    }, [ingredients]);

    const bun = useMemo(() => {
        if (uniqueIngredients) {
            return uniqueIngredients.find(item => item.type === 'bun');
        }
    }, [uniqueIngredients]);

    const totalPrice = useMemo(() => {
        if (bun) {
            return ingredients.reduce((acc, { price }) => acc + price, 0) + bun.price;
        }
        return 0;
    }, [ingredients, bun]);

    return (
        <>
            {order && (
                <div className={styles.details}>
                    <p className='text text_type_digits-default mb-10'>
                        {`#${order.number}`}
                    </p>
                    <p className='text text_type_main-medium mb-3'>
                        {order.name}
                    </p>
                    <p className={`text text_type_main-default ${order.status === 'done' && styles.finish} mb-15`}>
                        {status}
                    </p>
                    <p className='text text_type_main-medium'>
                        Состав:
                    </p>
                    <section className={`${styles.ingredients} mb-10 mt-6`}>
                        {uniqueIngredients.map((ingredient, index) => (
                            <div key={index} className={`${styles.info} mb-4`}>
                                <section className={styles.item}>
                                    <section className={`${styles.image} mr-4`}>
                                        <div className={styles.overlay}>
                                            <img src={ingredient.image_mobile} alt='ingredient' />
                                        </div>
                                    </section>
                                    <p className={`text text_type_main-default`}>
                                        {ingredient.name}
                                    </p>
                                </section>
                                <section className={`${styles.price}`}>
                                    <p className='text text_type_digits-default'>
                                        {`${ingredients.filter((i) => i._id === ingredient._id).length} x ${ingredient.price}`}
                                    </p>
                                    <CurrencyIcon type='primary' />
                                </section>
                            </div>
                        ))}
                    </section>
                    <section className={styles.time}>
                        <p className='text text_type_main-default text_color_inactive'>
                            <FormattedDate date={new Date(order.createdAt)} />
                        </p>
                        <section className={`${styles.Price} mb-8`}>
                            <p className='text text_type_digits-default'>
                                {totalPrice}
                            </p>
                            <CurrencyIcon type='primary' />
                        </section>
                    </section>
                </div>
            )}
        </>
    );
};

export default OrderIngredients;