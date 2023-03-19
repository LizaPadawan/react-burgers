import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import commonStyles from "../common.module.css";
import { userSelector } from "../../services/selectors";

function Profile() {
  const [form, setForm] = useState({ password: "", email: "", name:"" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  return (
    <div className={commonStyles.center}>
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
      </div>
    </div>
    </div>
  );
}

export default Profile;
