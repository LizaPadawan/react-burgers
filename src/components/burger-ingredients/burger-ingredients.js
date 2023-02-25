import React, { useState, useContext} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from 'react-dnd';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';
import ingredientPropTypes from '../ingredients-proptypes';
//  import { DataContext } from '../../services/data-context';
import { actionCreators } from '../../services/action-creator';

import burgerIngredientsStyles from './burger-ingredients.module.css';
import { ingredientsSelector, openModalSelector, currentIngredientSelector, constructorSelector } from '../../services/selectors';
import { InView } from 'react-intersection-observer';

function IngredientDetails(){
  // const data = useContext(DataContext);
  const data = useSelector(ingredientsSelector);
  const ingredientKey = useSelector(currentIngredientSelector);

  return(
    <div>
      {
        data.filter(item => item._id == ingredientKey).map(jtem => 
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

// IngredientDetails.propTypes = {
//   ingredientKey: PropTypes.string.isRequired
// }; 

function IngredientsTabs( props ){
    const current = props.currentGroup;
    
    return (
    <div className={burgerIngredientsStyles.burger_ingredients_tabs}>
      <Tab value="buns" active={current === "buns"} >
        Булки
      </Tab>
      <Tab value="sauses" active={current === "souses"} >
        Соусы
      </Tab>
      <Tab value="fillings" active={current === "fillings"} >
        Начинки
      </Tab>
    </div>
  )
}

function IngredientCard(props){
  const dispatch = useDispatch();
  const constructorElements = useSelector(constructorSelector);
  let count = constructorElements.filter(item => item._id == props._id).length;
  if (props.type == 'bun') count = count * 2;

  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient', 
    item: { ...props },
    collect: monitor => ({
        opacity: monitor.isDragging() ? 0.5 : 1
    })
})

  return (
      <div
          className={burgerIngredientsStyles.burger_ingredient_card}
          onClick = {() => {
            dispatch(actionCreators.addIngredientDetails(props._id));
            console.log("click");
          }}
          ref={dragRef} 
          style={{ opacity }}
      >
        <div className={burgerIngredientsStyles.burger_ingredient_content}>
          <img src={props.image}  className={burgerIngredientsStyles.burger_ingredient_image} style={{width: 240, height: 120}} />
          {/* {props.count > 0 && <Counter count={props.count} className='m-1' size='default'/>} */}
          <div className={burgerIngredientsStyles.burger_ingredient_count}>
            {count > 0 && <Counter count={count} className={'m-1 ' + burgerIngredientsStyles.burger_ingredient_count} size='default'/>}
          </div>
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


// IngredientCard.propTypes = {
//   ...ingredientPropTypes.isRequired,
//   setIsOpen: PropTypes.func.isRequired,
//   setIngredientKey: PropTypes.func.isRequired
// }; 



function IngredientGroup(props){

  // const data = useContext(DataContext);
  const data = useSelector(ingredientsSelector);
  const groupName = props.groupName;
  const groupTitle = props.groupTitle;

  return (
    <>
    <div  className={burgerIngredientsStyles.ingredient_group_title}>
      <p className="text text_type_main-medium">{groupTitle}</p>
      </div>
    {
      data.filter(item => item.type == groupName).map(jtem => <IngredientCard  
        // setIsOpen={props.setIsOpen} setIngredientKey={props.setIngredientKey}
        key={jtem._id} {...jtem} />)
    }
    </>
  );
}

// IngredientGroup.propTypes = {
//   groupName: PropTypes.string.isRequired,
//   groupTitle: PropTypes.string.isRequired
// }; 

function BurgerIngredients() {
  //const [isOpen, setIsOpen] = useState(false);
  //const [ingredientKey, setIngredientKey] = useState("");
  //const isOpen = useSelector(openModalSelector);
  const ingredientKey = useSelector(currentIngredientSelector);
  const [currentGroup, setCurrentGroup] = useState('buns');
  //const 

  // const onChangeView = (isView, entry) => {
  //   const nameIngredient = entry.target.id;
  //   console.log("nameIngredient= ", nameIngredient);
  //   if (isView) {
  //     setCurrentGroup(nameIngredient);
  //   }
  // }

 

  return (
    <>
      <div className={burgerIngredientsStyles.burger_ingredients_panel}>
          <div className={burgerIngredientsStyles.burger_ingredients_header}>
                  <p className="text text_type_main-large">
                      Соберите бургер
                  </p>
          </div>
          <IngredientsTabs currentGroup={currentGroup}/>
          <div className={burgerIngredientsStyles.burger_ingredients_body} id="scrollbody">
          {/* <InView threshold={0.5} onChange={onChangeView}  className={burgerIngredientsStyles.burger_ingredients_body}> */}
            <IngredientGroup groupTitle = "Булки" groupName = "bun" id="buns"/>
            <IngredientGroup groupTitle = "Соусы" groupName = "sauce" id="sauses"/>
            <IngredientGroup groupTitle = "Начинки" groupName = "main" id="fillings"/>
          {/* </InView>  */}
          </div>
      </div>
      {(ingredientKey !== "")  && 
        <Modal modalId="portal" overflow = "visible" caption="Детали ингредиента" 
        >  
        <IngredientDetails />     
      </Modal>}
      </>
  );
}


export default BurgerIngredients;


