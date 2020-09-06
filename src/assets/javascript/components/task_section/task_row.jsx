import React from 'react';
import moment from 'moment';

const TaskRow = (props) => {
  return (
    <div className={`alert alert-dismissible alert-primary task-row`}>
      {props.description}
      <br/>
      <small>{moment(props.deadline).fromNow()}</small>
    </div>
  );
}

export default TaskRow;
