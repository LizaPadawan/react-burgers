import { FC, useEffect } from "react";
import OrderList from "../../components/order-list/order-list";
import styles from "./feed-page.module.css";
import { wsSelector } from "../../services/selectors";
import OrderListInfo from "../../components/order-list-info/order-list-info";
import commonStyles from "../common.module.css";
import {
  wsConnectionStart,
  wsConnectionClosed,
} from "../../services/actions/ws-actions-creator";
import { WS_BASE_URL } from "../../utils/const";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

const Feed = () => {
  const dispatch = useAppDispatch();
  const feed = useAppSelector(wsSelector);
  console.log("feed=", feed);
  const wsUrl = WS_BASE_URL + "/all";

  useEffect(() => {
    dispatch(wsConnectionStart(wsUrl));

    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  return (
    <div className={commonStyles.content_panel}>
      {feed.orders.length > 0 ? (
        <div className={styles.feed}>
          <section className={styles.list}>
            <p className="text text_type_main-large mb-4">Лента заказов</p>
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
