import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button, EmailInput, PasswordInput, Preloader } from "@ya.praktikum/react-developer-burger-ui-components";
import commonStyles from "../common.module.css";
import { login } from "../../services/thunk";
import { useNavigate } from "react-router-dom";
import { isAuthSelector } from "../../services/selectors";

function Login() {
  const [form, setForm] = useState({ password: "", email: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthChecked = useSelector(isAuthSelector);

  return (
    //<form 
    //onSubmit={() => { dispatch(login(form, navigate)) }}
    //>
    <div className={commonStyles.center + ' ' + commonStyles.column}>
      {isAuthChecked ?
        <>
          <>
          
            <p className="text text_type_main-medium pt-20">Вход</p>

            <EmailInput
              placeholder={"E-mail"}
              onChange={(e) => { setForm({ ...form, email: e.target.value }); }}
              value={form.email}
              error={false}
              size={"default"}
              extraClass="ml-1"
            />

            <PasswordInput
              placeholder={"Password"}
              onChange={(e) => { setForm({ ...form, password: e.target.value }) }}
              value={form.password}
              error={false}
              size={"default"}
              extraClass="ml-1"
            />

            <Button
              //htmlType="button"
              htmlType="submit"
              type="primary"
              size="medium"
            
              onClick={() => { dispatch(login(form, navigate)) }}
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
        </>
        :
        <div>Идет загрузка ...</div>
      }
    </div>
    //</form>
  );
}

export default Login;