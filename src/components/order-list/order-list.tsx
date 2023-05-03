import { ingredientsSelector, wsSelector } from "../../services/selectors";
import styles from "./order-list.module.css";
import Order from "../order/order";
import { TWsData } from "../order-proptypes";
import { useAppSelector } from "../../utils/hooks";

const OrderList = () => {
  const orders: TWsData["orders"] = useAppSelector(wsSelector).orders;
  const ingredients = useAppSelector(ingredientsSelector);

  return (
    <>
      {" "}
      {ingredients.length > 0 ? (
        <div className={styles.list}>
          {orders &&
            orders.map((order) => <Order key={order._id} order={order} />)}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default OrderList;
