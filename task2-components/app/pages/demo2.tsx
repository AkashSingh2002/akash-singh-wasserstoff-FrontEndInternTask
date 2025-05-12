'use client';

import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';

type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Demo2() {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a component library', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      const newItem: TodoItem = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false
      };
      setTodos(prev => [...prev, newItem]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Todo List</h1>
      
      <Card 
        title="Add New Todo" 
        description="Enter a task to add to your list"
        variant="outlined"
        className="mb-6"
      >
        <div className="flex space-x-2">
          <Input
            label=""
            placeholder="Enter a new task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-grow"
          />
          <Button 
            label="Add" 
            onClick={addTodo}
            variant="primary"
          />
        </div>
      </Card>

      <div className="space-y-4">
        {todos.map(todo => (
          <Card 
            key={todo.id}
            title={todo.text}
            variant={todo.completed ? 'default' : 'elevated'}
            className={todo.completed ? 'opacity-50' : ''}
            header={
              <div className="flex justify-between items-center">
                <span 
                  className={`text-sm ${
                    todo.completed ? 'text-green-600' : 'text-yellow-600'
                  }`}
                >
                  {todo.completed ? 'Completed' : 'In Progress'}
                </span>
              </div>
            }
            footer={
              <div className="flex space-x-2">
                <Button 
                  label={todo.completed ? 'Undo' : 'Complete'}
                  onClick={() => toggleTodo(todo.id)}
                  variant={todo.completed ? 'secondary' : 'primary'}
                  size="small"
                />
                <Button 
                  label="Remove"
                  onClick={() => removeTodo(todo.id)}
                  variant="outline"
                  size="small"
                />
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}