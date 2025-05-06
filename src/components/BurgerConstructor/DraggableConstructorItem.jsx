import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styles from './BurgerConstructor.module.css';

export const DraggableConstructorItem = ({ item, index, moveCard, handleDelete }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'constructor-ingredient',
    hover(draggedItem) {
      if (draggedItem.index === index) return;
      moveCard(draggedItem.index, index);
      draggedItem.index = index;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'constructor-ingredient',
    item: { uuid: item.uuid, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.3 : 1, cursor: 'move' }}
      className={styles.constructorItem}
    >
      <DragIcon type="primary"/>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => handleDelete(item.uuid)}
      />
    </div>
  );
};

DraggableConstructorItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  moveCard: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}; 