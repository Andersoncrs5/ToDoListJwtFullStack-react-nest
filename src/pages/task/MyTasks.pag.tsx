import { useEffect, useState } from "react";
import NavbarTask from "../../components/NavbarTask.component";
import '../../Styles/Tasks/MyTasks.css';
import api from "../../axios/api";
import { AxiosResponse } from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";
import TaskEntity from "../../DTOs/tasks/taskEntity.dto";

export default function MyTasks() {
    const [tasks, setTasks] = useState<TaskEntity[]>([]);
    const [load, setLoad] = useState<boolean>(false);
    const nav: NavigateFunction = useNavigate();

    useEffect(() => {
        checkToken();
        getTask();
    }, []);

    async function checkToken() {
        const token = localStorage.getItem("token");
        if (!token) {
          nav('/home');
        }
    }

    async function getTask() {
        try {
            const res: AxiosResponse<any, any> = await api.get<TaskEntity[]>('/task/my-tasks');
            
            if (res.status == 500) {
                console.error(res.data);
                
                return;
            }

            if (res.status == 401) {
                alert("You are not authorized!");
                nav("/home");
            }

            if (res.status == 404) {
                nav('task/my-task');
            }

            if (res.status == 200) {
                setTasks(res.data);
                setLoad(true);
                return;
            }

        } catch (e) {
            console.error(e);
            alert('Error the get your tasks! Please try again later ')
        }
    }

    return (
        <main>
          <NavbarTask />
          <div id="divMain" className="container-fluid">
            {load ? (
              tasks ? (
                <div className="wLengthMainTask mt-3 mx-auto text-center border border-1 rounded-2">
                    {tasks.map((e) => (
                        <div key={e.id} className="m-1 p-1 border border-1 rounded-1 row">
                            <div className="col-4" >
                                <h5>{e.title}</h5>
                            </div>
                            <div className="col-4" >
                                <h6>{e.descripton}</h6>
                            </div>
                            <div className="col-4" >
                                <h6> done: {e.done}</h6>
                            </div>
                        </div>
                    ))}
                </div>
              ) : (
                <div className=" NoTask w-25 mt-3 mx-auto text-center border border-1 rounded-2">
                  <h1>NO TASKS</h1>
                </div>
              )
            ) : (
              <div className="mx-auto text-center w-25 p-5 loadStyle">
                <div
                  className="spinner-border"
                  style={{ width: "3rem", height: "3rem" }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </main>
      );      
}