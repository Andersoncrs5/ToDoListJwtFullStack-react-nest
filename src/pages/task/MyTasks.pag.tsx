import { useEffect, useState } from "react";
import NavbarTask from "../../components/NavbarTask.component";
import '../../Styles/Tasks/MyTasks.css';
import api from "../../axios/api";
import { AxiosResponse } from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";
import TaskEntity from "../../DTOs/tasks/taskEntity.dto";
import SuccessAlert from "../../alerts/SuccessAlert.alert"; 

export default function MyTasks() {
    const [tasks, setTasks] = useState<TaskEntity[]>([]);
    const [load, setLoad] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const nav: NavigateFunction = useNavigate();
    const DivSuccessAlert: HTMLElement | null = document.getElementById("DivSuccessAlert");

    useEffect(() => {
        checkToken();
        getTask();
    }, []);

    async function ChangeStatusTask(id: number) {
      if (!id) {
        console.error('ID is required');
        return;
      }

      const res: AxiosResponse<any, any> = await api.get('/task/change-status-task/' + id);
      console.log(res)

      if (res.status == 200) {
        setSuccessMessage('Status of task changed');
        getTask();
      }

      if (!DivSuccessAlert) {
        return;
      }
    
      DivSuccessAlert.style.display = 'block';
    
      setTimeout(() => {
        DivSuccessAlert.style.display = 'none';
      }, 6000);

    }

    async function checkToken() {
        const token = localStorage.getItem("token");
        if (!token) {
          nav('/home');
        }
    }

    async function ShowAlertSuccess(){
      if (!DivSuccessAlert) {
        return;
      }
    
      DivSuccessAlert.style.display = 'block';
    
      setTimeout(() => {
        DivSuccessAlert.style.display = 'none';
      }, 6000);
    }

    async function deleteTask(id: number): Promise<void> {
      try {
        if (!id) {
          console.error('Id is required')
          return;
        }

        const res: AxiosResponse<any, any> = await api.delete('/task/' + id);

        if (res.status == 200) {
          setSuccessMessage("Task deleted successfully!");
          await ShowAlertSuccess()
          getTask();
        }

      } catch (e) {
        console.error(e);
      }
    }

    async function getTask() {
        try {
            const res: AxiosResponse<any, any> = await api.get<TaskEntity[]>('/task/my-tasks');
            
            if (res.status == 500) {
                console.error(res.data);
                setLoad(true)
                return;
            }

            if (res.status == 401) {
                alert("You are not authorized!");
                nav("/home");
            }

            if (res.status == 404) {
                setLoad(true)
                nav('task/my-task');
            }

            if (res.status == 200) {
                setTasks(res.data);
                setLoad(true);
                return;
            }

        } catch (e) {
            console.error(e);
            setLoad(true)
            alert('Error the get your tasks! Please try again later ')
        }
    }

    async function goToUpdate(id: number) {
      if (!id) {
        console.error('ID is required');
        return;
      }

      nav('/task/uptask-task/' + id)
    }

    return (
        <main>
          <NavbarTask />
          <div style={{ display: 'none' }} id="DivSuccessAlert" >
            <SuccessAlert message={successMessage} /> 
          </div>
          
          <div id="divMain" className="container-fluid">
            {load ? (
              tasks ? (
                <div className="wLengthMainTask mt-3 mx-auto text-center border border-1 rounded-2">
                    {tasks.map((e) => (
                        <div key={e.id} className="m-1 p-1 border border-1 rounded-1 row">
                            <div className="col-2" >
                                <p>{e.title}</p>
                            </div>
                            <div className="col-5" >
                                <p>{e.description}</p>
                            </div>
                            <div className="col-2" >
                              <p>done: {e.done === true ? "true" : "false"}</p>
                            </div>
                            <div className="col-3 mt-1">
                              <button 
                                onClick={() => { ChangeStatusTask(e.id) } }
                                className="btn btn-sm btn-outline-primary">
                                  CHANGE STATUS
                              </button>
                              <button 
                                onClick={() => { goToUpdate(e.id) } }
                                className="btn btn-sm ms-1 btn-outline-warning">
                                  UPDATE
                              </button>
                              <button 
                                onClick={() => deleteTask(e.id)}
                                className="btn btn-sm ms-1 btn-outline-danger">
                                  DANGER
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
              ) : (
                <div className=" NoTask w-25 mt-3 mx-auto text-center rounded-2">
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