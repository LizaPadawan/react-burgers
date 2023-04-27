import { FC, memo, useEffect, useMemo } from 'react';
import { wsSelector } from '../../services/selectors';
import commonStyles from "../common.module.css";
import styles from './order-page.module.css';
import { TWsData } from '../../components/order-proptypes';
import { wsConnectionClosed, wsConnectionStart } from '../../services/actions/ws-actions-creator';
import { useLocation } from 'react-router';
import { getCookie } from '../../utils/cookie';

import OrderIngredients from '../../components/order-ingredients/order-ingredients';
import { WS_BASE_URL } from '../../utils/const';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

const OrderPage: FC = () => {

    const accessToken = getCookie('accessToken');
    const tokenUrl = WS_BASE_URL + `?token=${accessToken ? accessToken.substr(7) : ""}`;

    const { pathname } = useLocation();
    const orders : TWsData["orders"] = useAppSelector(wsSelector).orders;
    const dispatch = useAppDispatch();
    const wsUrl = pathname.includes('/list') ? WS_BASE_URL + "/all" : tokenUrl;

    useEffect(() => {
        dispatch(wsConnectionStart(wsUrl));
        
        return () => {
            dispatch(wsConnectionClosed());
        }
    }, [dispatch]);

    return (
        <div className={`${commonStyles.content_panel} mt-10`}>
            <div  className={styles.order}>
                {orders ? <OrderIngredients /> : <p>Идет загрузка . . . </p>}
            </div>
        </div>
    );
};

export default OrderPage;