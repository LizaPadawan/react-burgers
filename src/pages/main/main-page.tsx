import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { ingredientsSelector } from '../../services/selectors';
import { fetchData } from '../../services/thunk';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppSelector } from '../../utils/hooks';

function Main() {

  const fetchedIngredients = useAppSelector(ingredientsSelector);

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