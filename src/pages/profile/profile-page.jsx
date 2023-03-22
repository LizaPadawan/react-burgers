import React, { useCallback, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/thunk";

import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
  ConstructorElement
} from "@ya.praktikum/react-developer-burger-ui-components";
import commonStyles from "../common.module.css";
import { userSelector } from "../../services/selectors";
import { getProfileInfo, updateProfileInfo } from "../../services/thunk";
import { isAuthSelector } from "../../services/selectors";
import { useParams } from "react-router-dom";

function Profile() {
  const pageParams = useParams();
  //console.log("params=", pageParams.orders);
  
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const [form, setForm] = useState({ password: "", email: "", name:  ""});
  const [buttonsOpen, setButtonsOpen] = useState(false);

  const isAuthChecked = useSelector(isAuthSelector);

  useEffect(() => {
   dispatch(getProfileInfo());
  }, []);

  useEffect(() => {
    setForm({ password: "", email: user.email, name: user.name });
   }, [user]);


  useEffect(() => {
    setButtonsOpen(user ? !((form.password == "") && (form.email == user.email) && (form.name == user.name)) : false);
   }, [form]);

  const cancel = () => {
    setForm({ ...form, email: user.email, name: user.name, password: ""});
  }

  return (
    <form 
      onSubmit={(e) => { e.preventDefault(); dispatch(updateProfileInfo(form)) }}
      onReset={(e) => { e.preventDefault(); cancel() }}
    >
    <div className={commonStyles.center}>

      { (isAuthChecked && form.name !== "") ?

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
        {!(pageParams.orders) ?
        <>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
            }}
            value={form.name}
            error={false}
            size={"default"}
            extraClass="ml-1 pb-6"
          />
          <EmailInput
            placeholder={"Логин"}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
            }}
            value={form.email}
            error={false}
            size={"default"}
            extraClass="ml-1 pb-6"
          />
          <PasswordInput
            placeholder={"Пароль"}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
            }}
            value={form.password}
            error={false}
            size={"default"}
            extraClass="ml-1 pb-6"
          />
          { buttonsOpen &&
          <div className={commonStyles.centercontent}>
            <Button
              htmlType="reset"
              type="primary"
              size="medium"
              //onClick={cancel}
              extraClass="ml-10 mr-10"
            >
              Отменить
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              //onClick={() => {
              //  dispatch(updateProfileInfo(form))}}
            >
              Сохранить
            </Button>
          </div>
          }
        </> : <div style={{width: '485px'}}/>}
        </div>
      </div> :
          <div>Идет загрузка ...</div>
        }
    </div>
    </form>
  );
}

export default Profile;
