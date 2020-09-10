import { FETCH_TASKS, CREATE_TASK, TASK_LOADING_REQUEST, TASK_LOADED_REQUEST } from '../constants/task_constants.js';
import { DISMISS_ALERT, SHOW_ALERT } from '../constants/common_constants.js';

// Fetching tasks from API endpoint, then saving them in redux store
export const fetchTasks = () => dispatch => {
  dispatch({ type: TASK_LOADING_REQUEST });

  fetch('/tasks/all')
    .then(response => response.json())
    .then(json => {
      dispatch({
          type: FETCH_TASKS,
          payload: json
        });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ALERT,
                 payload: {
                    message: err.message,
                    type: 'danger'
                  }
              });
    })
    .finally(() => dispatch({ type: TASK_LOADED_REQUEST }));

}

// Creating a task by sending a POST request to server, then saving it in redux store
export const createTask = (taskDetails) => dispatch => {
  dispatch({ type: TASK_LOADING_REQUEST });

  fetch('/tasks/new', {
      method: 'POST',
      body: JSON.stringify(taskDetails),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
  }).then(response => response.json())
    .then(json => {
      dispatch({
          type: CREATE_TASK,
          payload: json
        });
    })
    .catch((err) => {
      dispatch({ type: SHOW_ALERT,
                 payload: {
                    message: err.message,
                    type: 'danger'
                  }
              });
    })
    .finally(() => dispatch({ type: TASK_LOADED_REQUEST }));

}
