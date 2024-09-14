
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  filter: 'all' | 'completed' | 'notCompleted';
}

const initialState: TaskState = {
  tasks: [],
  filter: 'all',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ title: string; description: string }>) => {
      const newTask = {
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
      };
      state.tasks.push(newTask);
    },
    toggleTaskCompletion: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    filterTasks: (state, action: PayloadAction<'all' | 'completed' | 'notCompleted'>) => {
      state.filter = action.payload;
    },
    reorderTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, toggleTaskCompletion, filterTasks, reorderTasks } = taskSlice.actions;

export const selectFilteredTasks = (state: RootState) => {
  switch (state.tasks.filter) {
    case 'completed':
      return state.tasks.tasks.filter((task) => task.completed);
    case 'notCompleted':
      return state.tasks.tasks.filter((task) => !task.completed);
    default:
      return state.tasks.tasks;
  }
};

export default taskSlice.reducer;
