import IngredientDetailsStyles from './ingredient-details.module.css';
import { useLocation } from 'react-router-dom';

function IngredientDetails() {
  const location = useLocation();

  const ingredient = location.state.ingredient;

  return (
    <>
      <div className={`${IngredientDetailsStyles.header}`}>
        <h2 className={`${IngredientDetailsStyles.title} text text_type_main-large`}>Детали ингредиента</h2>
      </div>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <h3 className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</h3>
      <ul className={`${IngredientDetailsStyles.list} mb-15`}>
        <li className={`${IngredientDetailsStyles.item}  `}>
          <h4 className="text text_type_main-default mb-2">Калории,ккал</h4>
          <p className="text text_type_digits-default">{ingredient.calories}</p>
        </li>
        <li className={`${IngredientDetailsStyles.item}  `}>
          <h4 className="text text_type_main-default mb-2">Белки, г</h4>
          <p className="text text_type_digits-default">{ingredient.proteins}</p>
        </li>
        <li className={`${IngredientDetailsStyles.item}  `}>
          <h4 className="text text_type_main-default mb-2">Жиры, г</h4>
          <p className="text text_type_digits-default">{ingredient.fat}</p>
        </li>
        <li className={`${IngredientDetailsStyles.item}  `}>
          <h4 className="text text_type_main-default mb-2">Углеводы, г</h4>
          <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
        </li>
      </ul>
    </>
  );
}

export default IngredientDetails;
