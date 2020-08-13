import React, {Component} from 'react';

import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/Task-List';

var randomstring = require("randomstring");

class App extends Component{

    constructor(props){
        super(props);
        this.state = {
            tasks : [],
            isDisplayForm : false,
            taskEditing: null,
            filter: {
                name: '',
                status: -1
            }
        }
    }

    onGenerateDate(){
        var tasks = [
            {
                id: randomstring.generate(),
                name: 'PHP',
                status: true,
            },
            {
                id: randomstring.generate(),
                name: 'PHP-Laravel',
                status: true,
            },
            {
                id: randomstring.generate(),
                name: 'React',
                status: false,
            },
        ];
        // this.setState = {
        //     tasks : tasks,
        // }
        // console.log(tasks);
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    componentDidMount(){
        if(localStorage && localStorage.getItem('tasks')){
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks : tasks,
            })
        }
    }

    onToggleForm(){

        this.setState({
            isDisplayForm : !this.state.isDisplayForm,
            taskEditing : null,
        })
    }

    onSubmit = (data) =>{
        var {tasks} = this.state;
        if(data.id === ''){
            data.id = randomstring.generate();
            tasks.push(data);
        }else{
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }
        this.setState({
            tasks : tasks,
            taskEditing: null,
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log(data)     
    }    

    onCloseForm = ()=>{
        this.setState({
            isDisplayForm: false,
            taskEditing: null,
        })
    }

    onOpenForm = () => {
        this.setState({
            isDisplayForm: true,
            taskEditing: null,
        })
    }

    onUpdateStatus = (id) => {
        var {tasks} = this.state;
        var index = this.findIndex(id);
        // console.log(index);
        if(index !== -1){
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks : tasks
            })
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    findIndex = (id) => {
        var {tasks} = this.state;
        var result = -1;
        tasks.forEach((task, index)=>{
            if(task.id === id){
                result = index;
            }
        });
        return result;
    }

    onDelete = (id) => {
        var {tasks} = this.state;
        var index = this.findIndex(id);
        if(index !== -1){
            tasks.splice(index, 1);
            this.setState({
                tasks : tasks
            })
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    onEdit = (id) => {
        this.onOpenForm();
        var {tasks} = this.state;
        var index = this.findIndex(id);
        var taskEditing = tasks[index];
         
        this.setState({
            taskEditing : taskEditing,
        })
       
    }

    onChangeFindName = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter:{
                name: filterName,
                status: filterStatus
            }
        })
    }

    render() {

        var {tasks, isDisplayForm, taskEditing, filter} = this.state; //var tasks = this.state.tasks
        if(filter){
            if(filter.name){
                tasks = tasks.filter((task)=>{
                    return task.name.toLowerCase().indexOf(filter.name.toLowerCase()) > -1;
                })
            }
            tasks = tasks.filter((task)=>{
                if(filter.status === -1){
                    return tasks;
                }
                else if(filter.status === 0){
                    return task.status === false;
                }
                else if(filter.status === 1){
                    return task.status === true;
                }
            });
        }
        var elmTaskForm = isDisplayForm ? <TaskForm 
                                                onSubmit={this.onSubmit} 
                                                onCloseForm={this.onCloseForm}
                                                taskEditing={taskEditing}
                                            /> 
                                        : "";

        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr/>
                </div>
                <div className="row">
                    <div className={isDisplayForm === true ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
                        {elmTaskForm}
                    </div>
                    
                    <div className={isDisplayForm === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                        <button 
                            type="button" 
                            className={isDisplayForm === true ? 'btn btn-danger' : "btn btn-primary"} 
                            style={{marginBottom: 1 + '%'}}
                            onClick = {() => this.onToggleForm()}
                        >
                            <span className="fa fa-plus mr-5"></span>{isDisplayForm === true ? 'Quay lại' : "Thêm công việc"} 
                        </button> 

                        <button type="button" 
                                className="btn btn-danger" 
                                style={{marginBottom: 1 + '%', marginLeft: 1 + '%'}}
                                onClick = {() => this.onGenerateDate()}
                                >
                            Generate Data
                        </button> 

                        <Control/>
                        
                        <TaskList 
                            tasks={tasks} 
                            onUpdateStatus={this.onUpdateStatus}
                            onDelete={this.onDelete}
                            onEdit={this.onEdit}
                            onChangeFindName={this.onChangeFindName}/>

                    </div>
                </div>
            </div>
        );
    }
}

export default App;
