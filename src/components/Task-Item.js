import React, {Component} from 'react';

class TaskItem extends Component{

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
        // console.log(this.props.task.id)
    }

	render(){
        var {task, index} = this.props; 
		return(
			<tr>
                <td>{index+1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span onClick={this.onUpdateStatus}className={task.status === true ? "label label-success" : "label label-warning"}>
                        {task.status === true ? "Đã hoàn thành" : "Đang thực hiện"}
                    </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning">
                        <span className="fas fa-edit mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger">
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
		);
	}
}

export default TaskItem;