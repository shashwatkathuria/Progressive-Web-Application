import React from 'react';
import { connect } from 'react-redux';
import { createTask } from '../../actions/task_actions.js';
import { showAlert } from '../../actions/common_actions.js';

// Form for making a new task
class AddTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      deadline: ''
    };
  }

  // React has controlled inputs
  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  // React has controlled inputs
  handleDeadlineChange(e) {
    this.setState({ deadline: e.target.value });
  }


  handleSubmit(e) {
    // Preventing default behaviour of form
    e.preventDefault();

    // Return if empty details and show alert
    if (this.state.description === '') {
      this.props.showAlert('danger', 'Please enter description');
      return;
    }
    if (this.state.deadline === '') {
      this.props.showAlert('danger', 'Please choose deadline');
      return;
    }

    const newTask = {
      description: this.state.description,
      deadline: new Date(this.state.deadline).toISOString()
    };

    this.props.createTask(newTask);

    // Resetting description and deadline
    this.setState({
      description: '',
      deadline: ''
    });
  }

  render() {
    return (
      <form className='task-form form-inline my-2 my-lg-0' onSubmit={e => this.handleSubmit(e)}>
        <input type='text' className='form-control mr-sm-2' value={this.state.description} onChange={(e) => this.handleDescriptionChange(e)} placeholder='Enter Description'/>
        <input type='datetime-local' className='form-control mr-sm-2' value={this.state.deadline} onChange={(e) => this.handleDeadlineChange(e)} placeholder='Enter Deadline'/>
        <button className='btn btn-primary my-2 my-sm-0' type='submit'>Add New Task</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
  createTask: createTask,
  showAlert: showAlert
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskForm);
