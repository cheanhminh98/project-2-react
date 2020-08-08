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

    render() {

        var {tasks} = this.state; //var tasks = this.state.tasks

        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr/>
                </div>
                <div className="row">
                    
                    <TaskForm/>
                    
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        <button type="button" className="btn btn-primary" style={{marginBottom: 1 + '%'}}>
                            <span className="fa fa-plus mr-5"></span>Thêm Công Việc 
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
