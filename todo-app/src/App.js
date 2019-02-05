import React, { Component } from 'react';
import './App.css';
import Button from 'antd/lib/button';
import Input  from 'antd/lib/input';
import List  from 'antd/lib/list';
import Form  from 'antd/lib/form';
import Icon  from 'antd/lib/icon';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class Todo extends Component{

  constructor(props){
    super(props);
    this.state={
      listItems:[],
      text:'',
      index: 0,
      updatedValue :'',
      allowUpdate:true
    }
  }

  handleChange= (e) =>{
    this.setState({text : e.target.value})

  }

  handleUpdateChange = (e) =>{
    console.log(e.target.value);
    this.setState({updatedValue : e.target.value})
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
   /* this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });*/
    if(!this.state.text){
      return;
    }
    const  NewItem ={
      text:this.state.text,
      id: this.state.index,
    };
    this.setState(state => ({
      listItems: state.listItems.concat(NewItem),
      text:'',
      index : (state.index) + 1,
      editable : false,
    }))
  }

  removeItem = (index) => {
    this.setState(listItems => ({
      listItems: this.state.listItems.filter(item => item.id !== index )
    }));
  }

  editItem= (index) =>{
    this.setState({
      updatedValue :this.state.listItems[index].text,

    })
    let newList = [...this.state.listItems];
    newList[index].editable=true;

    this.setState({
      listItems: newList,
      allowUpdate : false,
    })
  }

  updateItem= (index) => {
    console.log(index);
    let newList = [...this.state.listItems];
    /*newList[index] = {
      text:this.state.updatedValue,
      editable:false
    }*/
    newList[index].text=this.state.updatedValue;
    newList[index].editable=false;

    this.setState({
      listItems: newList,
      allowUpdate : true,
      updatedValue :'',
    })
  }
  closeUpdate = (index) =>{
    let newList = [...this.state.listItems];

    newList[index].editable = false;
    this.setState({
      listItems:newList,
      updatedValue :'',
      allowUpdate:true}
    )
  }
  render(){
    const { getFieldDecorator , getFieldsError, getFieldError, isFieldTouched, setFieldsValue} = this.props.form;
    const newtodoError = isFieldTouched('newToDo') && getFieldError('newToDo');
    console.log('== this.state ==', this.state.listItems)
    return(
      <div className="todo-wrapper">
        <h1 className="todo-header">Todos</h1>
        <Form onSubmit={this.handleSubmit} layout="inline">
          <Form.Item
            label="Add a new Todo"
            validateStatus={newtodoError ? 'error' : ''}
            help={newtodoError || ''}
          >
            {
              getFieldDecorator('newToDo', {
                rules: [{
                   message: 'The Text is Empty',
                }],
              })(
                <Input
                  type= "text"
                  className="todo-new-item-input"
                  onChange={this.handleChange}
                  setfieldsvalue={this.state.text}
                  prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Todo"
                />
              )}
            </Form.Item>
          <Form.Item>
            <Button
            htmlType="submit"
            type="primary"
            disabled={hasErrors(getFieldsError())}>
            add number {this.state.listItems.length + 1}
            </Button>
          </Form.Item>


        </Form>
          <ListItem
            items={this.state.listItems}
            allowUpdate = {this.state.allowUpdate}
            updatedValue ={this.state.updatedValue}
            editItem={this.editItem}
            removeItem={this.removeItem}
            handleUpdateChange = {this.handleUpdateChange}
            updateItem = {this.updateItem}
            closeUpdate = {this.closeUpdate}>
          </ListItem>
      </div>
    )
  }
}

class ListItem extends Component{
  render(){
    return(
      <ul>
      {this.props.items.map( (item , index) => (
        item.editable ? (
          <li key={item.id}>
            <input
            type="text"
            onChange={this.props.handleUpdateChange}
            value={this.props.updatedValue}/>
            <Button onClick={() => this.props.closeUpdate(item.id)}>X</Button>
            <Button onClick={() => this.props.updateItem(item.id)}>Update</Button>
          </li>
        ):
          (<li className="list-item" key={item.id} >
            {item.text}
            {item.id}
            <Button onClick={() =>this.props.removeItem(item.id)}> X </Button>
            <Button disabled={!this.props.allowUpdate} onClick={() => this.props.editItem(item.id)}> Edit </Button>
          </li>)

      ))}
      </ul>

    )
  }
}


const WrappedTodoForm = Form.create({ name: 'Todo App' })(Todo);

export default WrappedTodoForm;
