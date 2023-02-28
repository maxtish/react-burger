import { useSelector } from '../services/hooks/hooks';
import { useParams } from 'react-router-dom';
import styles from './ingredients-page.module.css';
import { IIngredient } from '../services/types/data';

export const IngredientPage = () => {
  const ingredients = useSelector((store) => {
    return store.ingredients.data;
  });

  const { id } = useParams();
  const ingredient = ingredients.find((item: IIngredient) => item._id === id);

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
