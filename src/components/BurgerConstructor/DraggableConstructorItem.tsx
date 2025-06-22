import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Ingredient } from '../../types/ingredient';
import styles from './BurgerConstructor.module.css';

interface ConstructorIngredient extends Ingredient {
  uuid: string;
}

interface DraggableConstructorItemProps {
  item: ConstructorIngredient;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  handleDelete: (uuid: string) => void;
}

interface DragItem {
  uuid: string;
  index: number;
}

interface DragCollectProps {
  isDragging: boolean;
}

export const DraggableConstructorItem: FC<DraggableConstructorItemProps> = ({ 
  item, 
  index, 
  moveCard, 
  handleDelete 
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<DragItem, void, unknown>({
    accept: 'constructor-ingredient',
    hover(draggedItem) {
      if (draggedItem.index === index) return;
      moveCard(draggedItem.index, index);
      draggedItem.index = index;
    },
  });

  const [{ isDragging }, drag] = useDrag<DragItem, unknown, DragCollectProps>({
    type: 'constructor-ingredient',
    item: { uuid: item.uuid, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleDeleteClick = (): void => {
    handleDelete(item.uuid);
  };

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.3 : 1, cursor: 'move' }}
      className={styles.constructorItem}
      role="button"
      tabIndex={0}
      aria-label={`Переместить ${item.name}`}
    >
      <DragIcon type="primary"/>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={handleDeleteClick}
      />
    </div>
  );
}; 