import React, { useState } from "react";
import { useAppDispatch } from "./store/hooks";
import { addTask, filterTasks } from "./store/taskSlice";
import TaskList from "./components/TaskList";
import {
  Button,
  Paper,
  ScopedCssBaseline,
  TextField,
  Typography,
} from "@mui/material";

const App: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useAppDispatch();

  const handleAddTask = () => {
    dispatch(addTask({ title, description }));
    setTitle("");
    setDescription("");
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 4,
        backgroundColor: "#f8f9ff",        
        boxShadow:"none"

      }}
    >
      <Typography variant="h4" align="center" fontWeight={"800"} color="#686784" paddingY={2}>
        TODO LIST
      </Typography>
      <Paper sx={{padding:2,display:"flex",gap:2}}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          size="small"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          size="small"
        />
        <Button variant="contained" color="primary" onClick={handleAddTask}>
          Add Task
        </Button>
      </Paper>
      <Paper>
        <Button onClick={() => dispatch(filterTasks("all"))}>All</Button>
        <Button onClick={() => dispatch(filterTasks("completed"))}>
          Completed
        </Button>
        <Button onClick={() => dispatch(filterTasks("notCompleted"))}>
          Not Completed
        </Button>
      </Paper>
      <Paper
        sx={{
          backgroundColor: "#ecedf6",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <TaskList />
      </Paper>
    </Paper>
  );
};

export default App;
