const initialState = {
    tasks: [],
  };
  
  const todoReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_TASK":
        return {
          tasks: [...state.tasks, action.payload],
        };
      case "REMOVE_TASK":
        return {
          tasks: state.tasks.filter((task) => task.id !== action.payload.id),
        };
      case "COMPLETE_TASK":
        return {
          tasks: state.tasks.map((task) =>
            task.id === action.payload.id ? { ...task, completed: true } : task
          ),
        };
      default:
        return state;
    }
  };
  
  export default todoReducer;
  