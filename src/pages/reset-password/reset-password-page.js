import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import commonStyles from "../common.module.css";
import { resetPasswordRequest } from "../../services/thunk";

function ResetPassword() {
  const [form, setForm] = useState({ password: "", token: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div
      className={commonStyles.center + " " + commonStyles.column}
    >
      <>
        <p className="text text_type_main-medium pt-20">
          Восстановление пароля
        </p>
        <PasswordInput
          placeholder={"Введите новый пароль"}
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });}}
          value={form.password}
          error={false}
          size={"default"}
          extraClass="ml-1"
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          name={"name"}
          onChange={(e) => {
            setForm({ ...form, token: e.target.value });}}
          value={form.token}
          error={false}
          size={"default"}
          extraClass="ml-1"
        />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => dispatch(resetPasswordRequest(form, navigate))}
        >
          Сохранить
        </Button>
      </>
      <p className="text text_type_main-default text_color_inactive pt-4 mt-10">
        Вспомнили пароль?{" "}
        <Link to="/login" className={commonStyles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
}

export default ResetPassword;