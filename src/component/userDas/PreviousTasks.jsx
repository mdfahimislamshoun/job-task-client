import { useQuery } from "@tanstack/react-query";
import UseAxios from "../hooks/UseAxios";


const PreviousTasks = () => {
    const axiosUrl = UseAxios();

    const { data: tasks = [] } = useQuery({
        queryKey: ['task',],
        queryFn: async () => {
            const res = await axiosUrl.get('/task?status=complete');
            return res.data
        },
    })
    return (
        <div className="max-w-[1900px] justify-center mx-auto mt-10">
            <h1 className="text-3xl font-medium text-black text-center mb-10">Previous Task</h1>
            <div className=" w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center mx-auto">
            {
                tasks.map((task)=>(<div key={task._id} className="card w-60 bg-gray-100 shadow-xl">
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{task.title}</h2>
                  <p>{task.descriptions}</p>
                  <p>{task.status}</p>
                </div>
              </div>))
            }
            </div>
        </div>
    );
};

export default PreviousTasks;