import { FC, memo, useEffect, useMemo } from 'react';

import { useLocation } from 'react-router-dom';


//import styles from './order-page.module.css';
//import OrderDetails from '../../components/Modal/OrderDetails/OrderDetails';
//import { websocketDisconnecting, websocketStartConnecting } from '../../services/slices/socketSlice';
//import { WS_BURGER_API_URL } from '../../utils/burger-api';
//import { clearOrders } from '../../services/slices/OrderSlice';
//import { getItemLocalStorage } from '../../utils/localStorage';
//import Loader from '../../components/Loader/Loader';
import { feedSelector } from '../../services/selectors';
import { useSelector } from 'react-redux';
import commonStyles from "../common.module.css";
import styles from './order-page.module.css';

import OrderIngredients from '../../components/order-ingredients/order-ingredients';

//const OrderDetailsPage: FC = () => {
const OrderPage = () => {
    const { pathname } = useLocation();

    //const dispatch = useAppDispatch();
    //const orders = useAppSelector(store => store.order.orders);
    const orders = useSelector(feedSelector).orders;

    // const endpoint = useMemo<string>(() => {
    //     if (pathname.includes('/feed')) {
    //         return '/orders/all';
    //     } else {
    //         return `/orders?token=${getItemLocalStorage('accessToken')}`;
    //     }
    // }, [pathname]);

    // useEffect(() => {
    //     console.log('я подключился')
    //     dispatch(websocketStartConnecting(`${WS_BURGER_API_URL}${endpoint}`));
        
    //     return () => {
    //         dispatch(clearOrders());
    //         dispatch(websocketDisconnecting());
    //     }
    // }, [dispatch]);

    return (
        <div className={`${commonStyles.content_panel} mt-10`}>
            <div  className={styles.Order}>
                {orders ? <OrderIngredients /> : <p>Идет загрузка . . . </p>}
            </div>
        </div>
    );
};

export default OrderPage;