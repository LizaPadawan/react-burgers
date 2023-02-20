import React, { useState, useContext} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';
import ingredientPropTypes from '../ingredients-proptypes';
import { DataContext } from '../../services/data-context';

import burgerIngredientsStyles from './burger-ingredients.module.css';

function IngredientDetails(props){
  const data = useContext(DataContext);

  return(
    <div>
      {
        data.filter(item => item._id == props.ingredientKey).map(jtem => 
        <div  key={jtem._id} style={{display:'flex', justifyContent:'center'}}>
              <div style={{width:"520px"}} >
              <img style={{width:"480px"}} src={jtem.image} alt=''/>
              <div  style={{display:'flex', justifyContent:'center'}}>
                <p  className="text text_type_main-medium">
                {jtem.name}
                </p>
          </div>
          
      <div style={{display:'flex', justifyContent:'center'}}>


        
          <div style={{display:'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
          <p className='text text_type_main-default text_color_inactive'> Калории, ккал </p>
          <p className='text text_type_digits-default text_color_inactive'> {jtem.calories} </p>
          </div>
        
        <div style={{display:'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
          <p className='text text_type_main-default text_color_inactive'> Белки, г </p>
          <p className='text text_type_digits-default text_color_inactive'> {jtem.proteins} </p>
          </div>
        
        <div style={{display:'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
          <p className='text text_type_main-default text_color_inactive'> Жиры, г </p>
          <p className='text text_type_digits-default text_color_inactive'> {jtem.fat} </p>
          </div>
        
        <div style={{display:'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
          <p className='text text_type_main-default text_color_inactive'> Углеводы, г </p>
          <p className='text text_type_digits-default text_color_inactive'> {jtem.carbohydrates} </p>
          </div>
      

      </div>
    </div>
        </div>
        )
      }
    </div> 
  )
}

IngredientDetails.propTypes = {
  //data: PropTypes.array.isRequired,
  ingredientKey: PropTypes.string.isRequired
}; 

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
          className={burgerIngredientsStyles.burger_ingredient_card}
          onClick = {() => {props.setIsOpen(true); props.setIngredientKey(props._id);
          }}
      >
        <div className={burgerIngredientsStyles.burger_ingredient_content}>
          <img src={props.image}  className={burgerIngredientsStyles.burger_ingredient_image} style={{width: 240, height: 120}} />
          {props.count > 0 && <Counter count={props.count} className='m-1' size='default'/>}
          <p className={'text text_type_digits-default m-1 ' + burgerIngredientsStyles.burger_ingredient_price}>
              {props.price}
              <CurrencyIcon type='primary' />
          </p>
          <p className={'text text_type_main-default mb-4 ' + burgerIngredientsStyles.burger_ingredient_text}>
              {props.name}
          </p>
        </div>
      </div>
  );
};


IngredientCard.propTypes = {
  ...ingredientPropTypes.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setIngredientKey: PropTypes.func.isRequired
}; 



function IngredientGroup(props){

  const data = useContext(DataContext);
  const groupName = props.groupName;
  const groupTitle = props.groupTitle;

  return (
    <>
    <div  className={burgerIngredientsStyles.ingredient_group_title}>
      <p className="text text_type_main-medium">{groupTitle}</p>
      </div>
    {
      data.filter(item => item.type == groupName).map(jtem => <IngredientCard  setIsOpen={props.setIsOpen} setIngredientKey={props.setIngredientKey} key={jtem._id} {...jtem} />)
    }
    </>
  );
}

IngredientGroup.propTypes = {
  //data: PropTypes.array.isRequired,
  groupName: PropTypes.string.isRequired,
  groupTitle: PropTypes.string.isRequired
}; 

function BurgerIngredients() {
  const [isOpen, setIsOpen] = useState(false);
  const [ingredientKey, setIngredientKey] = useState("");

  return (
    <>
      <div className={burgerIngredientsStyles.burger_ingredients_panel}>
          <div className={burgerIngredientsStyles.burger_ingredients_header}>
                  <p className="text text_type_main-large">
                      Соберите бургер
                  </p>
          </div>
          <IngredientsTabs/>
          <div className={burgerIngredientsStyles.burger_ingredients_body}>
          <IngredientGroup groupTitle = "Булки" groupName = "bun" setIsOpen={setIsOpen} setIngredientKey={setIngredientKey} />
          <IngredientGroup groupTitle = "Соусы" groupName = "sauce" setIsOpen={setIsOpen} setIngredientKey={setIngredientKey} />
          <IngredientGroup groupTitle = "Начинки" groupName = "main" setIsOpen={setIsOpen} setIngredientKey={setIngredientKey} />
          </div>
      </div>
      {isOpen  && 
        <Modal modalId="portal" overflow = "visible" caption="Детали ингредиента" close= {setIsOpen} >  
        <IngredientDetails ingredientKey={ingredientKey}/>     
      </Modal>}
      </>
  );
}

// BurgerIngredients.propTypes = {
//   data: PropTypes.array.isRequired
// }; 

export default BurgerIngredients;


