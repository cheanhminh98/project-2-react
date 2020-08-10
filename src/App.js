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
        })
    }

    onSubmit = (data) =>{
        var {tasks} = this.state;
        data.id = randomstring.generate();
        tasks.push(data);
        this.setState({
            tasks : tasks,
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log(data)     
    }    

    onCloseForm = ()=>{
        this.setState({
            isDisplayForm: false,
        })
    }

    render() {

        var {tasks, isDisplayForm} = this.state; //var tasks = this.state.tasks
        var elmTaskForm = isDisplayForm ? <TaskForm onSubmit={this.onSubmit} onCloseForm={this.onCloseForm}/> : "";

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
                        
                        <TaskList tasks={tasks}/>

                    </div>
                </div>
            </div>
        );
    }
}

export default App;
