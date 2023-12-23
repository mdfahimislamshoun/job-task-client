
import { useEffect, useState } from 'react';
import UseAxios from '../hooks/UseAxios';
import { useQuery } from '@tanstack/react-query';
import { AiTwotoneDelete,AiTwotoneEdit } from "react-icons/ai";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [todos, setTodos] = useState([]);
    const [ongoingTodos, setOngoingTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);
    const axiosUrl = UseAxios();

    const { data: task = [], refetch } = useQuery({
        queryKey: ['task',],
        queryFn: async () => {
            const res = await axiosUrl.get("/task");
            return res.data
        },
    })
    useEffect(() => {
        if (task) {
            const todoList = task.filter((item) => item.status === 'todo');
            const ongoingList = task.filter((item) => item.status === 'ongoing');
            const completedList = task.filter((item) => item.status === 'complete');
            refetch()
            setTodos(todoList);
            setOngoingTodos(ongoingList);
            setCompletedTodos(completedList);
        }
    }, [task, refetch]);

    const handleDragStart = (e, _id) => {
        e.dataTransfer.setData('text/plain', _id);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };


    const handleDrop = async (e, target) => {
        e.preventDefault();
        const todoId = e.dataTransfer.getData('text/plain');
        const draggedTodo = todos.find((item) => item._id === todoId);
        const ongoingTodo = ongoingTodos.find((item) => item._id === todoId);
        const completedTodo = completedTodos.find((item) => item._id === todoId);

        if (draggedTodo) {
            const updatedTodo = { ...draggedTodo, status: target };
            try {
                await axiosUrl.put(`/task/${todoId}`, updatedTodo);
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
                setOngoingTodos((prev) => prev.filter((item) => item._id !== completedTodo._id));
            } catch (error) {
                console.error('Error updating ongoing todo on the server', error);
            }
        }
    };

    const handelDelete=(id)=>{
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });

        swalWithBootstrapButtons
            .fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {

                    axiosUrl.delete(`/task/${id}`)

                        .then((response) => {
                            if (response.data.deletedCount > 0) {
                                swalWithBootstrapButtons.fire(
                                    "Deleted!",
                                    "Your task has been deleted.",
                                    "success",
                                    refetch()
                                );
                            }
                        });
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        "Cancelled",
                        "Your imaginary file is safe :)",
                        "error"
                    );
                }
            });
    }

    return (
        <div className='max-w-[1900px] justify-center mx-auto'>
                    <div className="grid grid-cols-1 lg:grid-cols-3">
                        <div className="lg:w-3/3 p-4">
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
                                        className="cursor-pointer flex justify-between items-center bg-gray-200 p-2 mb-2"
                                    >
                                        <div>
                                            <p>Title: {todo.title}</p>
                                            <p>Deadline: {todo.deadlines}</p>
                                            <p>Priority: {todo.priorityType}</p>
                                        </div>
                                    <div className='flex gap-2'>
                                       <Link to={`/updateTask/${todo._id}`}>
                                       <button className='btn text-2xl  text-cyan-400'><AiTwotoneEdit /></button>
                                       </Link>
                                        <button className='btn text-2xl text-red-400' onClick={()=>handelDelete(todo._id)}><AiTwotoneDelete /></button>
                                    </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:w-3/3 p-4">
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
                                        className="cursor-pointer flex justify-between items-center bg-orange-200 p-2 mb-2"
                                    >
                                         <div>
                                            <p>Title: {todo.title}</p>
                                            <p>Deadline: {todo.deadlines}</p>
                                            <p>Priority: {todo.priorityType}</p>
                                        </div>
                                        <div className='flex gap-2'>
                                        <Link to={`/updateTask/${todo._id}`}>
                                       <button className='btn text-2xl  text-cyan-400'><AiTwotoneEdit /></button>
                                       </Link>
                                            <button className='btn text-2xl text-red-400' onClick={()=>handelDelete(todo._id)}><AiTwotoneDelete /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:w-3/3 p-4">
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
                                        className="cursor-pointer flex justify-between items-center bg-green-200 p-2 mb-2"
                                    > 
                                    <div>
                                            <p>Title: {todo.title}</p>
                                            <p>Deadline: {todo.deadlines}</p>
                                            <p>Priority: {todo.priorityType}</p>
                                        </div>
                                    <div className='flex gap-2'>
                                    <Link to={`/updateTask/${todo._id}`}>
                                       <button className='btn text-2xl  text-cyan-400'><AiTwotoneEdit /></button>
                                       </Link>
                                        <button className='btn text-2xl text-red-400' onClick={()=>handelDelete(todo._id)}><AiTwotoneDelete /></button>
                                    </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
    );
};

export default Dashboard;


