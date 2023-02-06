import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerIngredientsStyles from './burger-ingredients.module.css';

function IngredientsTabs(){
    const [current, setCurrent] = useState('one');
    
    return (
    <div style={{ display: 'flex' }}>
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>
        One
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        Two
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        Three
      </Tab>
    </div>
  )
}

function BurgerIngredients() {
    return (
        <div className={burgerIngredientsStyles.burger_ingredients_panel}>
            <div className={burgerIngredientsStyles.burger_ingredients_header}>
                    <text  className="text text_type_main-medium">
                        Соберите бургер
                    </text>

            </div>
            <IngredientsTabs/>
        </div>
    );
}

export default BurgerIngredients;