import React, { Component } from 'react';
import './App.css';
import Button from 'antd/lib/button';
import  Input  from 'antd/lib/input';
import  List  from 'antd/lib/list';
import  Form  from 'antd/lib/form';

class Todo extends Component{
  constructor(props){
    super(props);
    this.state={
      listItems:[],
      text:'',
    }
  }
  handleChange= (e) =>{

    this.setState({text : e.target.value})
  }
  handleSubmit = (e) => {

    e.preventDefault();
    if(!this.state.text){
      return;
    }
    const  NewItem={
      text:this.state.text,
      id: Date.now(),
    };
    this.setState(state => ({
      listItems: state.listItems.concat(NewItem),
      text:''
    }))

  }

  removeItem = (e) => {
   console.log(e);

    var newList = [...this.state.listItems];
    //var newList = this.state.listItems.splice(e , 1);
    console.log(newList);
    var x = newList.splice(e , 1);
    this.setState({
      listItems: x
    });


  }
  render(){
    return(
      <div className="todo-wrapper">
        <h1 className="todo-header">Todos</h1>
        <Form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            className="todo-new-item-input"
            onChange={this.handleChange}
            value={this.state.text}
          />

            <Button htmlType="submit" type="primary">add number {this.state.listItems.length + 1}</Button>

        </Form>
          <ListItem items={this.state.listItems} removeItem={this.removeItem}></ListItem>
      </div>
    )
  }
}

class ListItem extends Component{
  render(){
    return(
      <List>
      {this.props.items.map( (item , index) => (
          <li className="list-item" value="1" key={item.id} >
            {item.text}
            <button onClick={() =>this.props.removeItem(index)}> delete</button>
          </li>

      ))}
      </List>

    )
  }
}

export default Todo;
