export const addTask = (text) => {
    return {
      type: "ADD_TASK",
      payload: {
        id: new Date().getTime(),
        text: text,
        completed: false,
      },
    };
  };
  
  export const removeTask = (id) => {
    return {
      type: "REMOVE_TASK",
      payload: {
        id: id,
      },
    };
  };
  
  export const completeTask = (id) => {
    return {
      type: "COMPLETE_TASK",
      payload: {
        id: id,
      },
    };
  };
  