import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import logo from './logo.svg';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
// import { actionCreators } from './services/action-creator';
import { fetchIngredientsSelector } from './services/selectors';
import { ingredientsSelector } from './services/selectors';
import { fetchData } from './services/thunk';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {

  const fetchedIngredients = useSelector(ingredientsSelector);
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(fetchData());
    },
    []
  );

  return (
    <>
    <AppHeader/>
    
    <main>
      {(fetchedIngredients.length > 0) ? 
      <>
      <DndProvider backend={HTML5Backend}>
      <BurgerIngredients/>
      <BurgerConstructor/>
      </DndProvider>
      </>
       :
      <></>
      }
    </main>

    <div id="portal"></div>
    
    </>
  );

}



export default App;
