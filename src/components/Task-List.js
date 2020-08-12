import React, {Component} from 'react';
import TaskItem from './Task-Item';

class TaskList extends Component{
    render(){
        var {tasks} = this.props;
        var task = tasks.map((task, index)=>{
            return <TaskItem key={task.id} index={index} task={task} 
                                onUpdateStatus={this.props.onUpdateStatus}
                                onDelete={this.props.onDelete}
                                onEdit={this.props.onEdit}/>
        })
        return(
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Trạng Thái</th>
                                <th className="text-center">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input type="text" className="form-control" />
                                </td>
                                <td>
                                    <select className="form-control">
                                        <option value="-1">Tất Cả</option>
                                        <option value="0">Đang thực hiện</option>
                                        <option value="1">Đã hoàn thành</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            {task}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TaskList;