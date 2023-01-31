import { React, useEffect, useState, useCallback } from 'react';
import IngredientDetailsStyles from './ingredient-details.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { getItemsIng } from '../../services/actions/ingredients';

function IngredientDetails() {
  const location = useLocation();
  console.log('IngredientDetails');
  const { id } = useParams();

  console.log('location', location.state.ingredient);
  const ingredient = location.state.ingredient;

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

export default IngredientDetails;
