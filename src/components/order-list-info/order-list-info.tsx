import { FC, memo, useMemo } from "react";
import { wsSelector } from "../../services/selectors";

import styles from "./order-list-info.module.css";
import { TWsData } from "../order-proptypes";
import { useAppSelector } from "../../utils/hooks";

const OrderListInfo = () => {
  const order: TWsData = useAppSelector(wsSelector);

  const ordersReady = useMemo(() => {
    return order.orders
      .filter((order) => order.status === "done")
      .map((order) => order.number);
  }, [order]);

  const ordersInWork = useMemo(() => {
    return order.orders
      .filter((order) => order.status === "pending")
      .map((order) => order.number);
  }, [order]);

  return (
    <div className={`${styles.info} ml-15`}>
      <section className={`${styles.state} mb-15`}>
        <section className={`${styles.ready} mr-4`}>
          <p className="text text_type_main-medium">Готовы:</p>
          <section className={styles.container}>
            <section className={`${styles.numbers} ${styles.ok}`}>
              {ordersReady &&
                ordersReady.map((orderNumber, index) => (
                  <p key={index} className="text text_type_digits-default ">
                    {orderNumber}
                  </p>
                ))}
            </section>
          </section>
        </section>
        <section className={styles.work}>
          <p className="text text_type_main-medium">В работе:</p>
          <section className={styles.container}>
            <section className={`${styles.numbers}`}>
              {ordersInWork &&
                ordersInWork.map((orderNumber, index) => (
                  <p key={index} className="text text_type_digits-default ">
                    {orderNumber}
                  </p>
                ))}
            </section>
          </section>
        </section>
      </section>
      <section className={`${styles.all} mb-15`}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className={`text text_type_digits-large ${styles.allorders}`}>
          {order.total}
        </p>
      </section>
      <section className={styles.all}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={`text text_type_digits-large ${styles.allorders}`}>
          {order.totalToday}
        </p>
      </section>
    </div>
  );
};

export default OrderListInfo;
