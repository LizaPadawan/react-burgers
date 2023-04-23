import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OrderList from '../../components/order-list/order-list';
import styles from './feed-page.module.css';
import { wsSelector } from '../../services/selectors';
import OrderListInfo from '../../components/order-list-info/order-list-info';
import commonStyles from "../common.module.css";
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/ws-actions-creator';

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector(wsSelector);
    console.log("feed=", feed);
    const wsUrl = "wss://norma.nomoreparties.space/orders/all";

    useEffect(() => {
        dispatch(wsConnectionStart(wsUrl));
        
        return () => {
            dispatch(wsConnectionClosed());
        }
    }, [dispatch]);


    return (

        <div className={commonStyles.content_panel}>
            {(feed.orders.length > 0) ? (
                <div className={styles.feed}>
                    <section className={styles.list}>
                        <p className='text text_type_main-large mb-4'>Лента заказов</p>
                        <OrderList />
                    </section>
                    <OrderListInfo />
                </div>
            ) : (
                <p> Идет загрузка... </p>
            )}
        </div>
    );
};

export default Feed;