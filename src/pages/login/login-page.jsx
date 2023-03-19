import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import commonStyles from "../common.module.css";
import { login } from "../../services/thunk";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ password: "", email: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={commonStyles.center + ' ' + commonStyles.column}>
      <>
        <p className="text text_type_main-medium pt-20">Вход</p>

        <PasswordInput
          placeholder={"E-mail"}
          onChange={(e) => {setForm({ ...form, email: e.target.value });}}
          value={form.email}
          error={false}
          size={"default"}
          extraClass="ml-1"
        />

        <EmailInput
          placeholder={"Password"}
          onChange={(e) => {setForm({ ...form, password: e.target.value })}}
          value={form.password}
          error={false}
          size={"default"}
          extraClass="ml-1"
        />

        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => {dispatch(login(form, navigate))}}
        >
          Войти
        </Button>
      </>
      <div className={commonStyles.column}>
        <p className="text text_type_main-default text_color_inactive pt-4 mt-10">
          Вы — новый пользователь? <Link to='/register' className={commonStyles.link}>Зарегистрироваться</Link>
        </p>
        <p className="text text_type_main-default text_color_inactive mt-4">
          Забыли пароль? <Link to='/forgot-password' className={commonStyles.link}>Восстановить пароль</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;