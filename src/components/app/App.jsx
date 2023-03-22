import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import AppHeader from '../app-header/app-header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import ProtectedRoute from '../protected-route/protected-route';
import { checkUserAuth } from '../../services/thunk';
import { isAuthSelector } from '../../services/selectors';
import { List } from '../../pages/list/list-page';
import { Ingredient } from '../../pages/ingredient/ingredient-page';
import { Error } from '../../pages/error/error-page';
import { currentIngredientActions } from '../../services/actions/current-ingredient-actions-creator';
import { useLocation } from 'react-router-dom';
import Modal from '../modal/modal';
import { useNavigate } from 'react-router-dom';
import { IngredientDetails } from '../ingredient-details/ingredient-details';

function App() {

  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(fetchData());
      dispatch(checkUserAuth());
    },
    []
  );

  const isAuthChecked = useSelector(isAuthSelector);

  const ModalSwitch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let background = location.state && location.state.background;
 
  const handleModalClose = () => {
    dispatch(currentIngredientActions.cleanCurrentIngredient());
    navigate(-1);
  };
 
  return (
     <>
       <AppHeader />
       <Routes location={background || location}>
       <Route path="/" element={<Main />} />
            <Route path="/login" element={<ProtectedRoute element={<Login />}  onlyUnAuth={true}/>} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/register" element={<Register />}  onlyUnAuth={true}/> 
            <Route path="/forgot-password" element={<ForgotPassword />}  onlyUnAuth={true}/>
            <Route path="/reset-password" element={<ResetPassword />}  onlyUnAuth={true}/> 
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} onlyUnAuth={false}/>} /> 
            <Route path="/profile/:orders" element={<ProtectedRoute element={<Profile />} onlyUnAuth={false}/>} /> 
            <Route path="/profile/:orders/:id" element={<ProtectedRoute element={<Profile />} onlyUnAuth={false}/>} /> 
            <Route path="/list" element={<List />} />
            <Route path="/ingredients/:ingredientId" element={<Ingredient />}></Route>
            <Route path="*" element={<Error />} />
       </Routes>
   
       {background && (
        <Routes>
         <Route
           path='/ingredients/:ingredientId'
           element={
             <Modal onClose={handleModalClose} modalId="portal" overflow = "visible" caption="Детали ингредиента" >
               <IngredientDetails />
             </Modal>
           }
         /></Routes>
       )}
     </>
    );
   };

  return (
    <>

    <main>

    { isAuthChecked &&
    <BrowserRouter>
      <ModalSwitch/>
    </BrowserRouter>
  }
    </main>

    <div id="portal"></div>    
    </>
  );
}

export default App;
