import {
    FC,
    memo,
    useCallback,
    useEffect,
    useMemo
} from 'react';
import { useParams } from 'react-router-dom';
import { logout } from "../../services/thunk";

//import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
//import { logout } from '../../services/slices/UserSlice';

import { Link, useLocation } from 'react-router-dom';

import styles from './profile-orders.module.css';

import Order from '../../components/order/order';
//import { getItemLocalStorage } from '../../utils/localStorage';
//import { websocketDisconnecting, websocketStartConnecting } from '../../services/slices/socketSlice';
//import { WS_BURGER_API_URL } from '../../utils/burger-api';
//import { clearOrders } from '../../services/slices/OrderSlice';
//import Loader from '../../components/Loader/Loader';
import { feedSelector, isAuthSelector } from '../../services/selectors';
import { useDispatch, useSelector } from "react-redux";
import commonStyles from "../common.module.css";


function ProfileOrders() {
    const pageParams = useParams();
    //console.log("params=", pageParams.orders);
    
    const dispatch = useDispatch(); 
    const isAuthChecked = useSelector(isAuthSelector);
    const orders = useSelector(feedSelector).orders;
  
    return (
      <div className={commonStyles.center_orders}>
  
        { (isAuthChecked) ?
  
        <div className={commonStyles.rowstart}>
          <div className={commonStyles.columnstart + " mr-15 pt-20"}>
            <p className="pb-4">
              <Link
                to="/profile"
                className={commonStyles.profilelink + ' ' + (pageParams.orders ? "text text_type_main-medium text_color_inactive" : commonStyles.white + " text text_type_main-medium")}
              >
                Профиль
              </Link>
            </p>
            <p className="pb-4">
              <Link
                to="/profile/orders"
                className={commonStyles.profilelink + ' ' + (pageParams.orders ? commonStyles.white + " text text_type_main-medium" : "text text_type_main-medium text_color_inactive")}
              >
                История заказов
              </Link>
            </p>
            <p className="pb-4">
              <Link
                to="/login"
                className={commonStyles.profilelink + ' ' + "text text_type_main-medium text_color_inactive"}
                onClick={() => {dispatch(logout());}}
              >
                Выход
              </Link>
            </p>
            <p
              className={
                commonStyles.fixwidth +
                " text text_type_main-default text_color_inactive mt-10"
              }
            >
              {pageParams.orders ? "В этом разделе вы можете просматривать историю заказов" : "В этом разделе вы можете изменить свои персональные данные"}
            </p>
          </div>
          
          <div className={commonStyles.columnstart + " pt-20"}>
          {(pageParams.orders) && 
            //<div style={{width: '485px'}}>
            <div>
                <section className={styles.OrderList}>
                            {orders && orders.map(order => (
                                <Order
                                    withStatus
                                    key={order._id}
                                    order={order}
                                    extraClass={styles.OrderItem}
                                />
                            ))}
                </section>
            
            </div>}
          </div>
        </div> :
            <div>Идет загрузка ...</div>
          }
      </div>
      
    );
  }




export default ProfileOrders;

