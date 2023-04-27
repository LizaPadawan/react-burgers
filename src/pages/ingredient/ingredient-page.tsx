import commonStyles from "../common.module.css";
import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";

export function Ingredient() {
  return (
    <div className={commonStyles.content_panel}>
      <IngredientDetails />
    </div>
  );
}
