import React from 'react';
import PatternItem from '../pattern-item/pattern-item';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './PatternList.module.scss';
import { useEffect } from 'react';
import { useState } from 'react';
import { APIService } from '@cheryx2020/api-service';

const PatternList = ({
  useRouter = () => { },
  useDispatch = () => { },
  data,
  isEdit,
  style = {},
  isBottom,
  className,
  language,
  api
}) => {
  const [_data, setData] = useState(data);
  const [isDragEnabled, setIsDragEnabled] = useState(false);

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
    const listWithAddNew = isEdit
      ? [..._data, { id: 'add-new', isAddNew: true }]
      : _data;

    return listWithAddNew.map((item, index) => {
      const key = item.id || `item-${index}`;

      // If not edit mode OR drag is disabled → render as plain list
      if (!isEdit || !isDragEnabled) {
        return (
          <PatternItem
            key={key}
            language={language}
            useDispatch={useDispatch}
            useRouter={useRouter}
            isBottom={isBottom}
            isAdmin={isEdit}
            {...item}
          />
        );
      }

      // If isEdit AND isDragEnabled → use Draggable
      return (
        <Draggable
          key={key}
          draggableId={String(key)}
          index={index}
          isDragDisabled={item.isAddNew}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...(!item.isAddNew ? provided.dragHandleProps : {})}
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
    });
  };


  return (
    <>
      {isEdit && (
        <div style={{ marginBottom: 10, display: 'flex', width: '100%' }}>
          <label>
            <input
              type="checkbox"
              checked={isDragEnabled}
              onChange={(e) => setIsDragEnabled(e.target.checked)}
            />
            Enable drag and drop
          </label>
        </div>
      )}
      <div
        className={`${styles.wrapper} ${isBottom ? `${styles.bottom} ${className}` : ''
          }`}
        style={style}
      >
        {isEdit && isDragEnabled ? (
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
      </div>
    </>);
};

export default PatternList;