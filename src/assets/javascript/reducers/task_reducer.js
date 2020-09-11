import { FETCH_TASKS, CREATE_TASK, ACTION_FAIL, TASK_LOADING_REQUEST } from '../constants/task_constants.js';

const defaultState = {
  tasks: [],
  loaded: false
};

export default function taskReducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_TASKS:
      // Sorting tasks in descending order
      const sortedTasks = [...action.payload.tasks].sort(function(a, b) { return new Date(b.deadline) - new Date(a.deadline); })
      return {
        ...state,
        tasks: sortedTasks,
        loaded: true
      };
    case CREATE_TASK:
      // Sorting tasks in descending order
      const allTasks = [...state.tasks, action.payload.task];
      const allSortedTasks = allTasks.sort(function(a, b) { return new Date(b.deadline) - new Date(a.deadline); })
      return {
        ...state,
        tasks: allSortedTasks,
        loaded: true
      };
    case TASK_LOADING_REQUEST:
      return {
        ...state,
        loaded: false
      };
    default:
      return state;
  }
}
