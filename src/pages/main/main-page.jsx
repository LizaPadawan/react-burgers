import {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { ingredientsSelector } from '../../services/selectors';
import { fetchData } from '../../services/thunk';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';

function Main() {

  const fetchedIngredients = useSelector(ingredientsSelector);
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(fetchData());
    },
    []
  );

  return (
    (fetchedIngredients.length > 0) ? 
      <>
      <DndProvider backend={HTML5Backend}>
      <BurgerIngredients/>
      <BurgerConstructor/>
      </DndProvider>
      </>
       :
      <></>
  );

}

export default Main;