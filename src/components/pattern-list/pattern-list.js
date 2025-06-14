import React from 'react';
import PatternItem from '../pattern-item/pattern-item';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './PatternList.module.scss';
import { useEffect } from 'react';
import { useState } from 'react';
import { APIService } from '@cheryx2020/api-service';

const PatternList = ({
  useRouter = () => {},
  useDispatch = () => {},
  data,
  isEdit,
  style = {},
  isBottom,
  className,
  language,
  api
}) => {
  const [_data, setData] = useState(data);

  useEffect(() => {
    if (isEdit && api) {
      APIService.get(api).then((res) => {
        const result = res?.data?.data ?? [];
        setData(result.sort((a, b) => a.order - b.order));
      });
    }
  }, [isEdit]);

  useEffect(() => {
    setData(data);
  }, [data]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = Array.from(_data);
    const [moved] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, moved);

    const updated = newItems.map((item, index) => ({ ...item, order: index }));
    setData(updated);
  };

  const renderList = () => {
    return _data.map((item, index) => {
      if (isEdit) {
        return (
          <Draggable key={item.id || index} draggableId={String(item.id || index)} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <PatternItem
                  language={language}
                  useDispatch={useDispatch}
                  useRouter={useRouter}
                  isBottom={isBottom}
                  isAdmin={isEdit}
                  {...item}
                />
              </div>
            )}
          </Draggable>
        );
      } else {
        return (
          <PatternItem
            key={item.id || index}
            language={language}
            useDispatch={useDispatch}
            useRouter={useRouter}
            isBottom={isBottom}
            isAdmin={isEdit}
            {...item}
          />
        );
      }
    });
  };

  return (
    <div
      className={`${styles.wrapper} ${
        isBottom ? `${styles.bottom} ${className}` : ''
      }`}
      style={style}
    >
      {isEdit ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="pattern-list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {renderList()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        renderList()
      )}

      {isEdit && (
        <PatternItem
          language={language}
          useDispatch={useDispatch}
          useRouter={useRouter}
          name="Pattern Name"
          description="Description"
          isEditing={true}
          isAdmin={isEdit}
          isAddNew={true}
        />
      )}
    </div>
  );
};

export default PatternList;