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
      this.createToodoItem('Drink Coffee'),
      this.createToodoItem('Make Awesome App'),
      this.createToodoItem('Have a lunch'),
    ]
  };

  createToodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  addItem = (text) => {
    // Generate unique id for new item
    const newItem = this.createToodoItem(text)
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

 toggleProperty(arr, id, propName) {
  const idx = arr.findIndex((el) => el.id === id);

  const oldItem = arr[idx];
  const newItem = {...oldItem,
    
    [propName]: !oldItem[propName] };
  return [
    ...arr.slice(0, idx), 
    newItem, 
    ...arr.slice(idx + 1)
  ];  
 }

  onToggleDone = (id) => {
    this.setState(( {todoData} ) => { // ЗАПОМНИТЬ: todoData нельзя менять, только возвращать новый массив
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };  

    });
  };

  onToggleImportant = (id) => {
    this.setState(( {todoData} ) => { // ЗАПОМНИТЬ: todoData нельзя менять, только возвращать новый массив
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };  

    });
  };
  
  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className='todo-app'>
        <AppHeader toDo={ todoCount } done={ doneCount }/>
          <div className="top-panel d-flex">
            <SearchPanel />
            <ItemStatusFilter />
          </div>
          <TodoList 
            todos={ todoData }
            onDeleted={ this.deleteItem }
            onToggleImportant={ this.onToggleImportant }
            onToggleDone={ this.onToggleDone }
          />
          <ItemAddForm  onItemAdded={this.addItem}/>
      </div>
    );

  }
};