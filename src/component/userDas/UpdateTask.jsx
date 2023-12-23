import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAxios from "../hooks/UseAxios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData } from "react-router-dom";

const UpdateTask = () => {
    const { register, handleSubmit } = useForm();
    const [startDate, setStartDate] = useState(new Date());
    const [priority, setPriority] = useState("");
    const axiosurl = UseAxios();
    const task =useLoaderData([]);

const {_id,title,descriptions,status}=task.data;

    const handelAddTask = (e) => {
        const title = e.title;
        const descriptions = e.descriptions;
        const deadlines = startDate;
        const priorityType = priority;
        const newStatus = status;
        const taskData = { title, descriptions, deadlines, priorityType,newStatus };
        console.log(taskData);
        axiosurl.put(`/task/${_id}`, taskData)
            .then((response) => {
                console.log(response.data);
                if (response.data.modifiedCount>0) {
                    return Swal.fire(
                        "Good job!",
                        "task updated successfully!",
                        "success"
                    );
                }
            })
    }
    return (
        <div>
             <div className="max-w-[1900px] justify-center mx-auto">

<form onSubmit={handleSubmit(handelAddTask)} className="p-4">
    <div className="form-control">
        <label className="label">
            <span className="label-text">title</span>
        </label>
        <input
            type="text"
            {...register("title")}
            placeholder="title"
            defaultValue={title}
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
            defaultValue={descriptions}
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
        </div>
    );
};

export default UpdateTask;