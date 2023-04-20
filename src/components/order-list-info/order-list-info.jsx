import { FC, memo, useMemo } from 'react';

//import { useAppSelector } from '../../hooks/hooks';
import { useSelector } from 'react-redux';
import { feedSelector } from '../../services/selectors';

import styles from './order-list-info.module.css';

//const OrderInfo: FC = () => {
const OrderListInfo = () => {
    const order = useSelector(feedSelector);

    //const ordersReady = useMemo<number[]>(() => {
    const ordersReady = useMemo(() => {
        return (
            order.orders.filter(order => order.status === 'done')
                .map(order => order.number)
        );
    }, [order]);

    //const ordersInWork = useMemo<number[]>(() => {
    const ordersInWork = useMemo(() => {
        return (
            order.orders.filter(order => order.status === 'pending')
                .map(order => order.number)
        );
    }, [order]);

    return (
        <div className={`${styles.OrderInfo} ml-15`}>
            <section className={`${styles.OrdersState} mb-15`}>
                <section className={`${styles.OrdersReady} mr-4`}>
                    <p className='text text_type_main-medium'>
                        Готовы:
                    </p>
                    <section className={styles.OrderNumbersContainer}>
                        <section className={`${styles.OrderNumbers} ${styles.Ready}`}>
                            {ordersReady && ordersReady.map((orderNumber, index) => (
                                <p key={index} className='text text_type_digits-default '>
                                    {orderNumber}
                                </p>
                            ))}
                        </section>
                    </section>
                </section>
                <section className={styles.OrdersInWork}>
                    <p className='text text_type_main-medium'>
                        В работе:
                    </p>
                    <section className={styles.OrderNumbersContainer}>
                        <section className={`${styles.OrderNumbers}`}>
                            {ordersInWork && ordersInWork.map((orderNumber, index) => (
                                <p key={index} className='text text_type_digits-default '>
                                    {orderNumber}
                                </p>
                            ))}
                        </section>
                    </section>
                </section>
            </section>
            <section className={`${styles.Total} mb-15`}>
                <p className='text text_type_main-medium'>
                    Выполнено за все время:
                </p>
                <p className={`text text_type_digits-large ${styles.TotalOrders}`}>
                    {order.total}
                </p>
            </section>
            <section className={styles.Total}>
                <p className='text text_type_main-medium'>
                    Выполнено за сегодня:
                </p>
                <p className={`text text_type_digits-large ${styles.TotalOrders}`}>
                    {order.totalToday}
                </p>
            </section>
        </div>
    );
};

export default OrderListInfo;