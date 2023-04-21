import { useSelector } from 'react-redux';
import { ingredientsSelector, wsSelector} from '../../services/selectors';
import styles from './order-list.module.css';
import Order from '../order/order';
import { TWsData } from '../order-proptypes';

const OrderList = () => {
    const orders : TWsData["orders"]= useSelector(wsSelector).orders;
    const ingredients = useSelector(ingredientsSelector);
    console.log("order-list ingredients", ingredients);

    return (
        <> { (ingredients.length > 0) ?
        <div className={styles.OrderList}>
            {orders && orders.map((order) => (
                <Order key={order._id} order={order} />
            ))}
        </div> : <></>
        }
        </>
        
    );
};

export default OrderList;