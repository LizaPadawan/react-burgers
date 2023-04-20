import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//import { websocketDisconnecting, websocketStartConnecting } from '../../services/slices/socketSlice';
//import { WS_BURGER_API_URL } from '../../utils/burger-api';

import OrderList from '../../components/order-list/order-list';

import styles from './feed-page.module.css';
//import { clearOrders } from '../../services/slices/OrderSlice';
//import OrderInfo from '../../components/OrderInfo/OrderInfo';
//import Loader from '../../components/Loader/Loader';
import { feedSelector } from '../../services/selectors';
import OrderListInfo from '../../components/order-list-info/order-list-info';

const Feed = () => {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(websocketStartConnecting(`${WS_BURGER_API_URL}/orders/all`));
        
    //     return () => {
    //         dispatch(clearOrders());
    //         dispatch(websocketDisconnecting());
    //     }
    // }, [dispatch]);
    
    const feed = useSelector(feedSelector);

    return (
        <>
            {feed.orders ? (
                <div className={styles.Feed}>
                    <section className={styles.OrderList}>
                        <p className='text text_type_main-large mb-4'>Лента заказов</p>
                        <OrderList />
                    </section>
                    <OrderListInfo />
                </div>
            ) : (
                <p> Идет загрузка... </p>
            )}
        </>
    );
};

export default Feed;