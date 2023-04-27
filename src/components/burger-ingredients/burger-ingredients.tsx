import React, { useState, useContext, useEffect, FC} from 'react';
import PropTypes from 'prop-types';
import { useAppSelector } from '../../utils/hooks';
import { useDrag } from 'react-dnd';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import ingredientPropTypes from '../ingredients-proptypes';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { ingredientsSelector, openModalSelector, constructorSelector } from '../../services/selectors';
import { InView } from 'react-intersection-observer';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { TIngredient } from '../ingredients-proptypes';

export type TIngredientsTabsProps = {
  currentGroup: string;
};

const IngredientsTabs  : FC<TIngredientsTabsProps> = ( { currentGroup } ) => {
    const current = currentGroup;
    
    return (
    <div className={burgerIngredientsStyles.burger_ingredients_tabs}>
      <Tab value="buns" active={current === "buns"} onClick={() => {}}>
        Булки
      </Tab>
      <Tab value="sauses" active={current === "sauses"} onClick={() => {}}>
        Соусы
      </Tab>
      <Tab value="fillings" active={current === "fillings"} onClick={() => {}}>
        Начинки
      </Tab>
    </div>
  )
} 

const IngredientCard: FC<TIngredient>  = (props) => {
  const constructorElements  : Array<TIngredient> = useAppSelector(constructorSelector);
  let count : number = constructorElements.filter(item => item._id == props._id).length;
  if (props.type == 'bun') count = count * 2;

  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient', 
    item: { ...props },
    collect: monitor => ({
        opacity: monitor.isDragging() ? 0.5 : 1
    })
})

  const location = useLocation();
  const ingredientId = props._id;

  return (
    <Link
          key={ingredientId}
          to={`/ingredients/${ingredientId}`}
          state={{ background: location }}
          className={burgerIngredientsStyles.burger_ingredient_card}
          ref={dragRef} 
          style={{ opacity }}
      >
        <div className={burgerIngredientsStyles.burger_ingredient_content}>
          <img src={props.image}  className={burgerIngredientsStyles.burger_ingredient_image} />
          <div className={burgerIngredientsStyles.burger_ingredient_count}>
            {
            //count > 0 && <Counter count={count} className={'m-1 ' + burgerIngredientsStyles.burger_ingredient_count} size='default'/>
            count > 0 && <Counter count={count} size='default'/>
            }
          </div>
          <p className={'text text_type_digits-default m-1 ' + burgerIngredientsStyles.burger_ingredient_price}>
              {props.price}
              <CurrencyIcon type='primary' />
          </p>
          <p className={'text text_type_main-default mb-4 ' + burgerIngredientsStyles.burger_ingredient_text}>
              {props.name}
          </p>
        </div>
      {/* </div> */}
    </Link>
  );
};

export type TIngredientGroupProps = {
  groupName: string,
  groupTitle: string,
  tab: string
};

const IngredientGroup : FC <TIngredientGroupProps> = (props) =>{

  const data   : Array<TIngredient> = useAppSelector(ingredientsSelector);
  const groupName = props.groupName;
  const groupTitle = props.groupTitle;

  return (
    <>
    <div id={props.tab} className={burgerIngredientsStyles.ingredient_group_title}>
      <p className="text text_type_main-medium">{groupTitle}</p>
      </div>
    {
      data.filter(item => item.type == groupName).map(jtem => <IngredientCard  
        key={jtem._id} {...jtem} />)
    }
    </>
  );
}


function BurgerIngredients() {

  const [currentGroup, setCurrentGroup] = useState('buns');
  const tabsArr = ["buns", "sauses", "fillings"];
  const min = (values : Array<number>)  => values.reduce((x, y) => Math.min(x, y));

  const scroll = () => {
    const scrolltop = document.getElementById("scrollbody")?.scrollTop;

    const tabDiffs = tabsArr.map((item) => (Math.abs((scrolltop ? scrolltop : 0) - Number(document.getElementById(item)?.offsetTop))));
    const minDiff = min(tabDiffs);
    const minIndex = tabDiffs.indexOf(minDiff);
    if (minIndex !== -1) setCurrentGroup(tabsArr[minIndex]);  
  }

  return (
    <>
      <div className={burgerIngredientsStyles.burger_ingredients_panel}>
          <div className={burgerIngredientsStyles.burger_ingredients_header}>
                  <p className="text text_type_main-large">
                      Соберите бургер
                  </p>
          </div>
          <IngredientsTabs currentGroup={currentGroup}/>
          <div className={burgerIngredientsStyles.burger_ingredients_body} onScroll={scroll} id="scrollbody">
            <IngredientGroup groupTitle = "Булки" groupName = "bun" tab="buns"/>
            <IngredientGroup groupTitle = "Соусы" groupName = "sauce" tab="sauses"/>
            <IngredientGroup groupTitle = "Начинки" groupName = "main" tab="fillings"/>
          </div>
      </div>
      </>
  );
}


export default BurgerIngredients;


