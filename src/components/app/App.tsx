import React, {useEffect, useState} from 'react';
import './App.css';
import AppHeader from '../app-header/app-header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchData } from '../../services/thunk';
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
import { useLocation } from 'react-router-dom';
import Modal from '../modal/modal';
import { useNavigate } from 'react-router-dom';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import Feed from '../../pages/feed/feed-page';
import OrderPage from '../../pages/order/order-page';
import OrderIngredients from '../order-ingredients/order-ingredients';
import styles from './app.module.css';
import ProfileOrders from '../../pages/profile-orders/profile-orders';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

function App() {

  const dispatch = useAppDispatch();

  useEffect(
    () => {
      dispatch(fetchData());
      dispatch(checkUserAuth());
    },
    []
  );

  const isAuthChecked = useAppSelector(isAuthSelector);

  const ModalSwitch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let background = location.state && location.state.background;
 
  const handleModalClose = () => {
    //dispatch(currentIngredientActions.cleanCurrentIngredient());
    navigate(-1);
  };
 
  return (
     <>
       <AppHeader />
       <Routes location={background || location}>
       <Route path="/" element={<Main />} />
            <Route path="/login" element={<ProtectedRoute element={<Login />}  onlyUnAuth={true}/>} />
            <Route path="/register" element={<ProtectedRoute element={<Register />} onlyUnAuth={true}/>} /> 
            <Route path="/forgot-password" element={<ProtectedRoute element={<ForgotPassword  />} onlyUnAuth={true}/>} />
            <Route path="/reset-password"  element={<ProtectedRoute element={<ResetPassword  />} onlyUnAuth={true}/>} /> 
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} onlyUnAuth={false}/>} /> 
            <Route path="/profile/:orders" element={<ProtectedRoute element={<ProfileOrders />} onlyUnAuth={false}/>} /> 
            <Route path="/profile/:orders/:orderId" element={<ProtectedRoute element={<OrderPage />}  onlyUnAuth={false}/>} /> 
            <Route path="/list" element={<Feed />} />
            <Route path="/list/:orderId" element={<OrderPage />} />
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
         />
         <Route
           path="/list/:orderId"
           element={
             <Modal onClose={handleModalClose} modalId="portal" overflow = "visible" >
              <div className={styles.MiddleModal}>
               <OrderIngredients />
               </div>
             </Modal>
           }
         />
         <Route path="/profile/:orders/:orderId" 
              element={<ProtectedRoute element={              
                <Modal onClose={handleModalClose} modalId="portal" overflow = "visible" >
                <div className={styles.MiddleModal}>
                 <OrderIngredients />
                 </div>
               </Modal>            
            }  onlyUnAuth={false}/>} 
          /> 


         </Routes>
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

     
    </>
  );
}

export default App;
