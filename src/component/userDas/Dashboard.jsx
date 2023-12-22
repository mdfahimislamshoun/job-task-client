
import  { useEffect, useState } from 'react';
import UseAxios from '../hooks/UseAxios';
import { useQuery } from '@tanstack/react-query';
import AddTask from './AddTask';


const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [ongoingTodos, setOngoingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const axiosUrl=UseAxios();

  const {  data: task = [],refetch } = useQuery({
    queryKey: ['task',],
    queryFn: async () => {
        const res = await axiosUrl.get("/task");
        return res.data
    },
})
useEffect(() => {
    if (task) {
      const todoList = task.filter((item) => item.status === 'toDo');
      const ongoingList = task.filter((item) => item.status === 'ongoing');
      const completedList = task.filter((item) => item.status === 'complete');
      refetch()
      setTodos(todoList);
      setOngoingTodos(ongoingList);
      setCompletedTodos(completedList);
    }
  }, [task,refetch]);

  const handleDragStart = (e, _id) => {
    e.dataTransfer.setData('text/plain', _id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };


const handleDrop =async (e, target) => {
    e.preventDefault();
    const todoId = e.dataTransfer.getData('text/plain');
    const draggedTodo = todos.find((item) => item._id === todoId);
    const ongoingTodo = ongoingTodos.find((item) => item._id === todoId);
    const completedTodo = completedTodos.find((item) => item._id === todoId);
  
    if (draggedTodo) {
        const updatedTodo = { ...draggedTodo, status: target };
        try {
         await  axiosUrl.put(`/task/${todoId}`, updatedTodo);
         refetch()
          if (target === 'todo') {
            setTodos((prev) => [...prev, updatedTodo]);
          } else if (target === 'ongoing') {
            setOngoingTodos((prev) => [...prev, updatedTodo]);
          } else if (target === 'complete') {
            setCompletedTodos((prev) => [...prev, updatedTodo]);
          }
          setTodos((prev) => prev.filter((item) => item._id !== draggedTodo._id));
        } catch (error) {
          console.error('Error updating todo on the server', error);
        }
      } else if (ongoingTodo) {
        const updatedTodo = { ...ongoingTodo, status: target };
        try {
          await axiosUrl.put(`/task/${todoId}`, updatedTodo);
          refetch()
          if (target === 'todo') {
            setTodos((prev) => [...prev, updatedTodo]);
          } else if (target === 'complete') {
            setCompletedTodos((prev) => [...prev, updatedTodo]);
          }
          setOngoingTodos((prev) => prev.filter((item) => item._id !== ongoingTodo._id));
        } catch (error) {
          console.error('Error updating ongoing todo on the server', error);
        }
      } else if (completedTodo) {
        const updatedTodo = { ...ongoingTodo, status: target };
        try {
          await axiosUrl.put(`/task/${todoId}`, updatedTodo);
          refetch()
          if (target === 'todo') {
            setTodos((prev) => [...prev, updatedTodo]);
          } else if (target === 'complete') {
            setCompletedTodos((prev) => [...prev, updatedTodo]);
          }
          setOngoingTodos((prev) => prev.filter((item) => item._id !== ongoingTodo._id));
        } catch (error) {
          console.error('Error updating ongoing todo on the server', error);
        }
      }
  };

  return (
    <div>
        <div className="flex">
      <div className="w-1/3 p-4">
        <h2 className="text-lg font-bold mb-4">Todo List</h2>
        <div
          className="border border-dashed p-4 h-full"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, 'todo')}
        >
          {todos.map((todo) => (
            <div
              key={todo._id}
              draggable
              onDragStart={(e) => handleDragStart(e, todo._id)}
              className="cursor-pointer bg-gray-200 p-2 mb-2"
            >
              {todo.title}
            </div>
          ))}
        </div>
      </div>

      <div className="w-1/3 p-4">
        <h2 className="text-lg font-bold mb-4">Ongoing List</h2>
        <div
          className="border border-dashed p-4 h-full"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, 'ongoing')}
        >
          {ongoingTodos.map((todo) => (
            <div
              key={todo._id}
              draggable
              onDragStart={(e) => handleDragStart(e, todo._id)}
              className="cursor-pointer flex justify-between bg-yellow-200 p-2 mb-2"
            >
              <div>{todo.title}</div>
              <div>remove</div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-1/3 p-4">
        <h2 className="text-lg font-bold mb-4">Completed</h2>
        <div
          className="border border-dashed p-4 h-full"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, 'complete')}
        >
          {completedTodos.map((todo) => (
            <div
              key={todo._id}
              draggable
              onDragStart={(e) => handleDragStart(e, todo._id)}
              className="cursor-pointer bg-green-200 p-2 mb-2"
            >
              {todo.title}
            </div>
          ))}
        </div>
      </div>
    </div>
   <AddTask></AddTask>
    </div>
  );
};

export default Dashboard;


