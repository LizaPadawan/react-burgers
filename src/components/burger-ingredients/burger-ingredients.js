import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// change test 2

import burgerIngredientsStyles from './burger-ingredients.module.css';

function IngredientsTabs(){
    const [current, setCurrent] = useState('one');
    
    return (
    <div className={burgerIngredientsStyles.burger_ingredients_tabs}>
      <Tab value="Булки" active={current === true} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="Соусы" active={current === false} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={current === false} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
}

function IngredientCard(props){
  return (
      <div
          className={burgerIngredientsStyles.ingredient_card}
      >
          <img src={props.image} style={{width: 240, height: 120}} />
          {props.count > 0 && <Counter count={props.count} size='default'/>}
          <p className={`text text_type_digits-default`}>
              {props.price}
              <CurrencyIcon type='primary' />
          </p>
          <p className='text text_type_main-default mb-4'>
              {props.name}
          </p>
      </div>
  );
};


function BurgerIngredients(props) {
    return (
        <div className={burgerIngredientsStyles.burger_ingredients_panel}>
            <div className={burgerIngredientsStyles.burger_ingredients_header}>
                    <text className="text text_type_main-medium">
                        Соберите бургер
                    </text>
            </div>
            <IngredientsTabs/>
            <div className={burgerIngredientsStyles.burger_ingredients_body}>
            {
              props.data.map(item => IngredientCard( {...item}))
            }
            </div>
        </div>
    );
}

export default BurgerIngredients;


