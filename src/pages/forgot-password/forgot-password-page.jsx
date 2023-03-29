import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import commonStyles from "../common.module.css";
import { forgotPasswordRequest } from "../../services/thunk";

function ForgotPassword() {
  const [form, setForm] = useState({ email: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <form 
      onSubmit={(e) => { e.preventDefault(); dispatch(forgotPasswordRequest(form, navigate)) }}
    >
    <div
      className={commonStyles.center + " " + commonStyles.column}
    >
      <>
        <p className="text text_type_main-medium pt-20">
          Восстановление пароля
        </p>
        <EmailInput
          onChange={(e) => {
            setForm({ ...form, email: e.target.value })}}
          value={form.email}
          name="email"
          isIcon={false}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          //onClick={() => {dispatch(forgotPasswordRequest(form, navigate))}}
        >
          Восстановить
        </Button>
      </>
      <p className="text text_type_main-default text_color_inactive pt-4 mt-10">
        Вспомнили пароль?{" "}
        <Link to="/login" className={commonStyles.link}>
          Войти
        </Link>
      </p>
    </div>
    </form>
  );
}

export default ForgotPassword;
