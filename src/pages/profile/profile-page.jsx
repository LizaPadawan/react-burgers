import React, { useCallback, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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

function Profile() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const [form, setForm] = useState({ password: "", email: "", name:  ""});
  const [buttonsOpen, setButtonsOpen] = useState(false);

  const isAuthChecked = useSelector(isAuthSelector);

  //useEffect(() => {
  //  dispatch(getProfileInfo());
  //}, []);

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
    <div className={commonStyles.center}>

      { (isAuthChecked && form.name !== "") ?

      <div className={commonStyles.rowstart}>
        <div className={commonStyles.columnstart + " mr-15 pt-20"}>
          <p className="pb-4">
            <Link
              to="/profile"
              className={commonStyles.profilelink + ' ' + commonStyles.white + " text text_type_main-medium"}
            >
              Профиль
            </Link>
          </p>
          <p className="pb-4">
            <Link
              to="/profile/orders"
              className={commonStyles.profilelink + ' ' + "text text_type_main-medium text_color_inactive"}
            >
              История заказов
            </Link>
          </p>
          <p className="pb-4">
            <Link
              to="/login"
              className={commonStyles.profilelink + ' ' + "text text_type_main-medium text_color_inactive"}
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
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <div className={commonStyles.columnstart + " pt-20"}>
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
              htmlType="button"
              type="primary"
              size="medium"
              onClick={cancel}
              extraClass="ml-10 mr-10"
            >
              Отменить
            </Button>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={() => {
                dispatch(updateProfileInfo(form))}}
            >
              Сохранить
            </Button>
          </div>
          }
        </div>
      </div> :
          <div>Идет загрузка ...</div>
        }
    </div>
  );
}

export default Profile;
