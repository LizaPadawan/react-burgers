import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import AppHeader from '../app-header/app-header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
// import { actionCreators } from './services/action-creator';
import { fetchIngredientsSelector } from '../../services/selectors';
import { ingredientsSelector } from '../../services/selectors';
import { fetchData } from '../../services/thunk';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import Main from '../../pages/main/main-page';
import Login from '../../pages/login/login-page';
import Register from '../../pages/register/register-page';
import ForgotPassword from '../../pages/forgot-password/forgot-password-page';
import ResetPassword from '../../pages/reset-password/reset-password-page';
import Profile from '../../pages/profile/profile-page';

function App() {

  return (
    <>
    
    <main>
    <BrowserRouter>
      <AppHeader/>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> 
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} /> 
            <Route path="/profile" element={<Profile />} /> 
          </Routes>
    </BrowserRouter>
    </main>

    <div id="portal"></div>
    
    </>
  );

}



export default App;
