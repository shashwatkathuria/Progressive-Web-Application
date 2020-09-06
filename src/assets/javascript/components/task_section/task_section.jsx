import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createTask, fetchTasks } from '../../actions/task_actions.js';

import AddTaskForm from './add_task_form.jsx';
import TaskRow from './task_row.jsx';
import LoadingSpinner from '../common/loading_spinner.jsx';

class TaskSection extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Fetching all tasks initially when component is mounted
    this.props.fetchTasks();
  }

  render() {
    // Redirect to home page if request is loaded and no user is present
    if (!this.props.user && this.props.userLoaded) {
      return <Redirect to='/'/>;
    }

    const deadlineOverTasks = this.props.tasks.filter(task => new Date(task.deadline) < new Date());
    const upcomingTasks = this.props.tasks.filter(task => new Date(task.deadline) >= new Date());

    return (
      <div>
        {!this.props.tasksLoaded && <LoadingSpinner/>}
        <div className='jumbotron task-section'>
          <h1 className='display-5'>Tasks</h1>
          <AddTaskForm/>
          { upcomingTasks.length > 0 && <p className='lead'>Upcoming</p> }
          { upcomingTasks.map((task, index) => <TaskRow key={index} {...task} />) }
          { deadlineOverTasks.length > 0 && <p className='lead'>Over</p> }
          { deadlineOverTasks.map((task, index) => <TaskRow key={index} {...task} />) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  userLoaded: state.userReducer.loaded,
  tasksLoaded: state.taskReducer.loaded,
  tasks: state.taskReducer.tasks
});

const mapDispatchToProps = {
  createTask: createTask,
  fetchTasks: fetchTasks
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskSection);
