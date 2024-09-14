import React, { FC } from 'react';
import DraggableListItem from './DraggableListItem';
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from 'react-beautiful-dnd';
import { List } from '@mui/material';
import { Task } from '../store/taskSlice';


export type Props = {
  items: Task[];
  onDragEnd: OnDragEndResponder;
  onStatusChange:(id:string)=>void;
};

const DraggableList: FC<Props> = React.memo(({ items, onDragEnd,onStatusChange }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {(provided) => (
          <List ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item: Task, index: number) => (
              <DraggableListItem item={item} index={index} key={item.id} onStatusChange={onStatusChange}/>
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
});

export default DraggableList;
