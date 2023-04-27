import { ingredientsSelector } from '../../services/selectors';
import { useParams } from 'react-router-dom';
import { TIngredient } from '../ingredients-proptypes';
import { useAppSelector } from '../../utils/hooks';
import styles from './ingredient-details.module.css';

export function IngredientDetails(){
  
  const data : Array<TIngredient>  = useAppSelector(ingredientsSelector);
  const ingredientKey = useParams().ingredientId;
  console.log("styles=", styles);

  return(
    <div className={styles.all}>
      {
        data.filter(item => item._id == ingredientKey).map(jtem => 
        <div key={jtem._id} className={styles.centercontainer}>
              <div className={styles.fixwidth2} >
              <img className={styles.fixwidth} src={jtem.image} alt=''/>
              <div className={styles.contentcenter}>
                <p  className="text text_type_main-medium">
                {jtem.name}
                </p>
          </div>
          
      <div className={styles.info}>


        
          <div className={styles.center}>
          <p className='text text_type_main-default text_color_inactive'> Калории, ккал </p>
          <p className='text text_type_digits-default text_color_inactive'> {jtem.calories} </p>
          </div>
        
        <div className={styles.center}>
          <p className='text text_type_main-default text_color_inactive'> Белки, г </p>
          <p className='text text_type_digits-default text_color_inactive'> {jtem.proteins} </p>
          </div>
        
        <div className={styles.center}>
          <p className='text text_type_main-default text_color_inactive'> Жиры, г </p>
          <p className='text text_type_digits-default text_color_inactive'> {jtem.fat} </p>
          </div>
        
        <div className={styles.center}>
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