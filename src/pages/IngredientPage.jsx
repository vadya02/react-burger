import { useParams } from 'react-router-dom';
import IngredientDetails from '../components/IngredientDetails/IngredientDetails';

export default function IngredientPage() {
  const { id } = useParams();
  // IngredientDetails сам получит id через useParams или пропсы
  return (
    <div style={{ marginTop: 40 }}>
      <IngredientDetails id={id} />
    </div>
  );
} 