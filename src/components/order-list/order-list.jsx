import { useSelector } from 'react-redux';
import { feedSelector, ingredientsSelector } from '../../services/selectors';
import styles from './order-list.module.css';
import Order from '../order/order';

const OrderList = () => {
    const orders = useSelector(feedSelector).orders;
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