import React, { useState, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from 'react-dnd';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import ingredientPropTypes from '../ingredients-proptypes';
import { ingredientsSelector, openModalSelector, constructorSelector } from '../../services/selectors';
import { InView } from 'react-intersection-observer';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { TIngredient } from '../ingredients-proptypes';

export function IngredientDetails(){
  
  const data : Array<TIngredient>  = useSelector(ingredientsSelector);
  const ingredientKey = useParams().ingredientId;

  return(
    <div style={{display:'flex', justifyContent:'center', alignItems: 'center', height: '500px'}}>
      {
        data.filter(item => item._id == ingredientKey).map(jtem => 
        <div  key={jtem._id} style={{display:'flex', justifyContent:'center', alignItems: 'center'}}>
              <div style={{width:"520px"}} >
              <img style={{width:"480px"}} src={jtem.image} alt=''/>
              <div  style={{display:'flex', justifyContent:'center'}}>
                <p  className="text text_type_main-medium">
                {jtem.name}
                </p>
          </div>
          
      <div style={{display:'flex', justifyContent:'space-between', marginTop: '25px'}}>


        
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