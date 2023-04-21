import { FC, memo, useMemo } from 'react';

import { useParams } from 'react-router-dom';

import styles from './order-ingredients.module.css';

//import { useAppSelector } from '../../../hooks/hooks';

//import { TIngredientItem, TOrder } from '../../../utils/types';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { feedSelector, ingredientsSelector, wsSelector} from '../../services/selectors';

//const OrderIngredients: FC = () => {
const OrderIngredients = () => {
    const { orderId } = useParams();
    console.log(orderId );

    //const ordersStore = useAppSelector(store => store.order);
    const ordersStore = useSelector(wsSelector);

    const order = useMemo(() => {
        //return ordersStore.orders.find(order => order._id === orderId) as TOrder;
        return ordersStore.orders.find(order => order._id === orderId);
    }, [ordersStore]);

    const status = ((order && order.status === 'done') && 'Выполнен') || ((order && order.status === 'pending') && 'Готовится') || ((order && order.status === 'created') && 'Создан');

    //const ingredientsStore = useAppSelector(store => store.ingredientsItems.items);
    const ingredientsStore = useSelector(ingredientsSelector);
    console.log(ingredientsStore);

    //const ingredients = useMemo<TIngredientItem[]>(() => {
    const ingredients = useMemo(() => {
        //const ingredients: TIngredientItem[] = [];
        const ingredients = [];
        //order?.ingredients.forEach((ingredientId: string) => {
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

    console.log(ingredients);

    const uniqueIngredients = useMemo(() => {
        //const table: any = {};
        const table = {};
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
                <div className={styles.OrderDetails}>
                    <p className='text text_type_digits-default mb-10'>
                        {`#${order.number}`}
                    </p>
                    <p className='text text_type_main-medium mb-3'>
                        {order.name}
                    </p>
                    <p className={`text text_type_main-default ${order.status === 'done' && styles.Done} mb-15`}>
                        {status}
                    </p>
                    <p className='text text_type_main-medium'>
                        Состав:
                    </p>
                    <section className={`${styles.Ingredients} mb-10 mt-6`}>
                        {uniqueIngredients.map((ingredient, index) => (
                            <div key={index} className={`${styles.IngredientInfo} mb-4`}>
                                <section className={styles.IngredientItem}>
                                    <section className={`${styles.IngredientImage} mr-4`}>
                                        <div className={styles.IngredientImageOverlay}>
                                            <img src={ingredient.image_mobile} alt='ingredient' />
                                        </div>
                                    </section>
                                    <p className={`text text_type_main-default`}>
                                        {ingredient.name}
                                    </p>
                                </section>
                                <section className={`${styles.Price}`}>
                                    <p className='text text_type_digits-default'>
                                        {`${ingredients.filter((i) => i._id === ingredient._id).length} x ${ingredient.price}`}
                                    </p>
                                    <CurrencyIcon type='primary' />
                                </section>
                            </div>
                        ))}
                    </section>
                    <section className={styles.TimeTotal}>
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