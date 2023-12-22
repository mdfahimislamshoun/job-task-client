import { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import UseAxios from "../hooks/UseAxios";


const AddTask = () => {
    const { register, handleSubmit } = useForm();
    const [startDate, setStartDate] = useState(new Date());
    const [priority, setPriority] = useState("");
    const axiosurl = UseAxios();

    const handelAddTask = (e) => {
        const title = e.title;
        const descriptions = e.descriptions;
        const deadlines = startDate;
        const priorityType = priority;
        const status="toDo";
        const taskData = { title, descriptions, deadlines, priorityType,status };
        console.log(taskData);
        axiosurl.post("/task", taskData)
        .then((response) => {
            if (response.data.insertedId) {
                return Swal.fire(
                    "Good job!",
                    "task added successfully!",
                    "success"
                );
            }
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(handelAddTask)}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">title</span>
                    </label>
                    <input
                        type="text"
                        {...register("title")}
                        placeholder="title"
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Descriptions</span>
                    </label>
                    <input
                        type="text"
                        {...register("descriptions")}
                        placeholder="Descriptions"
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Deadlines</span>
                    </label>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                </div>
                <div className="mt-3">
                <select value={priority} onChange={e => setPriority(e.target.value)} className="select w-full max-w-xs">
                    <option disabled selected>Pick your priority type</option>
                    <option>low</option>
                    <option>moderate</option>
                    <option>high</option>

                </select>
                </div>

                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTask;