import React from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { reorderTasks, Task, toggleTaskCompletion } from "../store/taskSlice";
import { selectFilteredTasks } from "../store/taskSlice";
import { DropResult } from "react-beautiful-dnd";
import DraggableList from "./DraggableList";
import { Typography } from "@mui/material";

const TaskList: React.FC = () => {
  const tasks = useAppSelector(selectFilteredTasks);
  const dispatch = useAppDispatch();

  const handleToggleTask = (id: string) => {
    dispatch(toggleTaskCompletion(id));
  };
  const reorder = (list: Task[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    const newOrder = reorder(tasks, source.index, destination.index);

    dispatch(reorderTasks(newOrder));
  };

  return (
    
      <DraggableList
        items={tasks}
        onDragEnd={onDragEnd}
        onStatusChange={handleToggleTask}
      />
      
  );
};

export default TaskList;
