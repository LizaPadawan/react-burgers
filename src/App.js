import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import logo from './logo.svg';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
// import { DataContext } from './services/data-context';
import { actionCreators } from './services/action-creator';
import { fetchIngredientsSelector } from './services/selectors';
import { fetchData } from './services/thunk';

function App() {

  const fetchDataState = useSelector(fetchIngredientsSelector);

  //const [fetchedData, setFetchedData] = useState({success: false, data: []});
  //const url = 'https://norma.nomoreparties.space/api/ingredients';

  const dispatch = useDispatch();

  useEffect(
    () => {
      console.log("useEffect");
      //getDataJson(url, setFetchedData);
      dispatch(fetchData());
    },
    []
  );

  return (
    <>
    <AppHeader/>
    
    <main>
      {(fetchDataState) ? 
      // <DataContext.Provider value={fetchedData.data}>
      //   <BurgerIngredients/>
      //   <BurgerConstructor/>
      // </DataContext.Provider>
      <BurgerIngredients/>
       :
      <></>
      }
    </main>

    <div id="portal"></div>
    
    </>
  );

}



export default App;
