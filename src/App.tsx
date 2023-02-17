import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import { DataContext } from './services/data-context';


async function getDataJson(url : string, callback : any) {
  const response = await fetch(url); 
      if (response.ok) {  
        const json = await response.json();
        callback(json);
      } else {
        alert(`Ошибка HTTP: ${response.status}`);
      }
}

function App() {

  const [fetchedData, setFetchedData] = useState({success: false, data: []});
  const url = 'https://norma.nomoreparties.space/api/ingredients';


  useEffect(
    () => {
      console.log("useEffect");
      getDataJson(url, setFetchedData);

    },
    []
  );

  return (
    <>
    <AppHeader/>
    
    <main>
      {(fetchedData.success) ? 
      <DataContext.Provider value={fetchedData.data}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </DataContext.Provider>
       :
      <></>
      }
    </main>

    <div id="portal"></div>
    
    </>
  );

}



export default App;
