import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { logout } from "../../services/thunk";
import { Link, useLocation } from "react-router-dom";
import styles from "./profile-orders.module.css";
import Order from "../../components/order/order";
import { isAuthSelector, wsSelector } from "../../services/selectors";
import commonStyles from "../common.module.css";
import { wsConnectionStart } from "../../services/actions/ws-actions-creator";
import { wsConnectionClosed } from "../../services/actions/ws-actions-creator";
import { getCookie } from "../../utils/cookie";
import { TOrder } from "../../components/order-proptypes";
import { WS_BASE_URL } from "../../utils/const";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

function ProfileOrders() {
  const pageParams = useParams();
  const dispatch = useAppDispatch();
  const isAuthChecked = useAppSelector(isAuthSelector);
  const orders: TOrder[] = useAppSelector(wsSelector).orders;

  const accessToken = getCookie("accessToken");
  const wsUrl =
    WS_BASE_URL + `?token=${accessToken ? accessToken.substr(7) : ""}`;

  useEffect(() => {
    dispatch(wsConnectionStart(wsUrl));

    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  return (
    <div className={commonStyles.center_orders}>
      {isAuthChecked ? (
        <div className={commonStyles.rowstart}>
          <div className={commonStyles.columnstart + " mr-15 pt-20"}>
            <p className="pb-4">
              <Link
                to="/profile"
                className={
                  commonStyles.profilelink +
                  " " +
                  (pageParams.orders
                    ? "text text_type_main-medium text_color_inactive"
                    : commonStyles.white + " text text_type_main-medium")
                }
              >
                Профиль
              </Link>
            </p>
            <p className="pb-4">
              <Link
                to="/profile/orders"
                className={
                  commonStyles.profilelink +
                  " " +
                  (pageParams.orders
                    ? commonStyles.white + " text text_type_main-medium"
                    : "text text_type_main-medium text_color_inactive")
                }
              >
                История заказов
              </Link>
            </p>
            <p className="pb-4">
              <Link
                to="/login"
                className={
                  commonStyles.profilelink +
                  " " +
                  "text text_type_main-medium text_color_inactive"
                }
                onClick={() => {
                  dispatch(logout());
                }}
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
              {pageParams.orders
                ? "В этом разделе вы можете просматривать историю заказов"
                : "В этом разделе вы можете изменить свои персональные данные"}
            </p>
          </div>

          <div className={commonStyles.columnstart + " pt-20"}>
            {pageParams.orders && (
              <div>
                <section className={styles.list}>
                  {orders &&
                    orders.map((order) => (
                      <Order
                        withStatus
                        key={order._id}
                        order={order}
                        extraClass={styles.item}
                      />
                    ))}
                </section>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>Идет загрузка ...</div>
      )}
    </div>
  );
}

export default ProfileOrders;
