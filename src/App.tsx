import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';

import data1 from '../src/utils/data.json';

async function getDataJson(url : string, callback : any) {
  //console.log("getDataJson",url);
  const response = await fetch(url); 
      if (response.ok) {  //   если HTTP-статус в диапазоне 200-299
        //  получаем тело ответа (см. про этот метод ниже)
        // console.log("url",url);
        const json = await response.json();
        //console.log("json",json);
        //  console.log("resJson",json);
        console.log("json=", json);
        callback(json);
      } else {
        alert(`Ошибка HTTP: ${response.status}`);
        //callback(default);
      }
}

//export default getDataJson;


function App() {

  console.log("App");

  const [fetchedData, setFetchedData] = useState({success: false, data: []});
  const url = 'https://norma.nomoreparties.space/api/ingredients';

  // let modal ;


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
    
    {/* <BurgerIngredients data={fetchedData.data}/> */}
    <main>
    <BurgerIngredients data={fetchedData.data}/>
    <BurgerConstructor data={fetchedData.data}/>
    </main>

    <div id="portal"></div>
    
    </>
  );

}



export default App;
