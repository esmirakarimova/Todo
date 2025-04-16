import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';


export default class App extends Component {
  maxId = 100;
  
  state = {
    todoData: [
      { label: 'Drink Coffee', important: false, id: 1},
      { label: 'Make React App', important: true, id: 2},
      { label: 'Have a lunch', important: false, id: 3},
    ]
  };

  addItem = (text) => {
    // Generate unique id for new item
    const newItem = {
      label: text,
      important: false,
      id: this.maxId++  
    }
    // add new item to the array
    this.setState( ( { todoData }) =>{
      const newArr = [
        ...todoData, 
        newItem
      ];
      return {
        todoData: newArr
      };
    });
  };

  deleteItem = (id) => {
    this.setState( ( {todoData} ) => {
      const idx = todoData.findIndex((el) => el.id === id);
      todoData.splice(idx, 1);
      return {
        todoData: [...todoData]
      };
    });
  }

  render() {
    return (
      <div className='todo-app'>
        <AppHeader toDo={ 1 } done={ 3 }/>
          <div className="top-panel d-flex">
            <SearchPanel />
            <ItemStatusFilter />
          </div>
          <TodoList 
            todos={ this.state.todoData }
            onDeleted={ this.deleteItem }
          />
          <ItemAddForm  onItemAdded={this.addItem}/>
      </div>
    );

  }
};