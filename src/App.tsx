import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import { Modal } from './components/modal/modal';

//import data from '../src/utils/data.json';

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
  const [isOpen, setIsOpen] = useState(true);
  const [modal, setModal] = useState(<></>);
  const [modalTitle, setModalTitle] = useState("");

  const handleClose = () => {setIsOpen(false);};
  const handleOpen = () => {setIsOpen(true);};

  const url = 'https://norma.nomoreparties.space/api/ingredients';

  // let modal ;


  useEffect(
    () => {
      console.log("useEffect");
      getDataJson(url, setFetchedData);

   const modalEl = <Modal title={modalTitle} isClose={handleClose} isOpen={isOpen}>
  <div>12345</div>
    </Modal>;

    setModal(modalEl);

    },
    []
  );

  return (
    <>
    <AppHeader/>
    <div id="portal"></div>
    <BurgerIngredients data={fetchedData.data}/>
    {/* <BurgerConstructor data={fetchedData.data}/> */}
    {isOpen && modal}
    
    </>
  );

}



export default App;
