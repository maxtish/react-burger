import IngredientDetailsStyles from './ingredientdetails.module.css';
import PropTypes from 'prop-types';
import dataIngredient from '../../utils/dataIngredient';
import objectWithShape from '../../utils/shape';

function IngredientDetails({ ingredient }) {
  return (
    <>
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
IngredientDetails.propTypes = {
  ingredient: objectWithShape.isRequired,
};

export default IngredientDetails;
