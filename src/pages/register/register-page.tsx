import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from '../../services/thunk';

import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import commonStyles from "../common.module.css";

function Register() {
  const [form, setForm] = useState({ password: "", email: "", name: "" });
  const dispatch = useDispatch() as any;
  const navigate = useNavigate();

  return (
    <div className={ commonStyles.center + ' ' + commonStyles.column }>
      <>
        <p className="text text_type_main-medium pt-20">Регистрация</p>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => {setForm({ ...form, name: e.target.value })}}
          value={form.name}
          error={false}
          size={"default"}
          extraClass="ml-1"
        />

        <EmailInput 
          placeholder={"E-mail"}
          onChange={(e) => {setForm({ ...form, email: e.target.value });}}
          value={form.email}
          //error={false}
          size={"default"}
          extraClass="ml-1"
        />

        <PasswordInput 
          placeholder={"Пароль"}
          onChange={(e) => {setForm({ ...form, password: e.target.value })}}
          value={form.password}
          //error={false}
          size={"default"}
          extraClass="ml-1"
        />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => {dispatch(register(form, navigate))}}
        >
          Зарегистрироваться
        </Button>
      </>
      <p className="text text_type_main-default text_color_inactive pt-4 mt-10">
        Уже зарегистрированы? <Link to='/login' className={commonStyles.link}>Войти</Link>
      </p>
    </div>
  );
}

export default Register;