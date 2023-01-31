import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { getItemsIng } from '../services/actions/ingredients';
import { getUser } from '../services/actions/user';
import styles from './ingredients-page.module.css';

export const IngredientPage = () => {
  const ingredients = useSelector((store) => {
    return store.ingredients.data;
  });

  console.log('store', ingredients);
  const { id } = useParams();
  const ingredient = ingredients.find((item) => item._id === id);

  return (
    <>
      {ingredient && (
        <div className={`${styles.wraper} pt-30 pl-10 pr-10`}>
          <h1 className="text text_type_main-large">Детали ингредиента</h1>
          <img src={ingredient.image_large} alt={ingredient.name} />
          <h3 className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</h3>
          <ul className={`${styles.list} mb-15`}>
            <li className={`${styles.item}  `}>
              <h4 className="text text_type_main-default mb-2">Калории,ккал</h4>
              <p className="text text_type_digits-default">{ingredient.calories}</p>
            </li>
            <li className={`${styles.item}  `}>
              <h4 className="text text_type_main-default mb-2">Белки, г</h4>
              <p className="text text_type_digits-default">{ingredient.proteins}</p>
            </li>
            <li className={`${styles.item}  `}>
              <h4 className="text text_type_main-default mb-2">Жиры, г</h4>
              <p className="text text_type_digits-default">{ingredient.fat}</p>
            </li>
            <li className={`${styles.item}  `}>
              <h4 className="text text_type_main-default mb-2">Углеводы, г</h4>
              <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
