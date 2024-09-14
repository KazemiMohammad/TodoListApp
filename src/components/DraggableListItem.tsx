import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ListItem, ListItemText, Tooltip, Checkbox } from "@mui/material";
import { Task } from "../store/taskSlice";

export type Props = {
  item: Task;
  index: number;
  onStatusChange: (id: string) => void;
};

const DraggableListItem: FC<Props> = ({ item, index, onStatusChange }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <Tooltip title="Drag Me!">
          <ListItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{
              borderRadius: 1,
              background: snapshot.isDragging ? "rgb(235,235,235)" : "white",
            }}
            
          >
            <Checkbox
              checked={item.completed}
              onClick={() => onStatusChange(item.id)}
            />
            <ListItemText primary={item.title} secondary={item.description} />
          </ListItem>
        </Tooltip>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
