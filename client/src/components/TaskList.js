import { useEffect, useState } from "react";
import {Button, Card, CardContent, Typography} from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function TaskList() {

    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    const loadTasks = async () => {
        const response = await fetch('http://localhost:4000/tasks')
        const data = await response.json();   

        setTasks(data);
    };

    const handleDelete = async (id) => {
        try {
            //delete from backend
            await fetch(`http://localhost:4000/tasks/${id}`, {
                method: 'DELETE',
            });
            //delete from frontend
            setTasks(tasks.filter(task => task.id !== id));
            // const data = await res.json();
                
        } catch (error) {
            console.log(error);
        }

        //delete from backend
        await fetch(`http://localhost:4000/tasks/${id}`, {
            method: 'DELETE',
        });
        //delete from frontend
         setTasks(tasks.filter(task => task.id !== id));
        // const data = await res.json();
    }

    useEffect(() => {
        loadTasks()
    }, [])
    return(
        <>
            <h1>Task List</h1>
            {
                tasks.map(task => (
                    <Card style={{
                        marginBottom: '.7rem',
                        backgroundColor: '#15496c'
                    }}
                        key={task.id}
                    >
                        <CardContent style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }} >
                            <div style={{color: 'white'}}>
                                <Typography>{task.title}</Typography>
                                <Typography>{task.description}</Typography>
                            </div>

                            <div>
                                <Button 
                                    variant="contained" 
                                    color='inherit' 
                                    onClick={() => navigate(`/tasks/${task.id}/edit`)}
                                >
                                    Edit
                                </Button>

                                <Button
                                    variant="contained" 
                                    color='warning' 
                                    onClick={() => handleDelete(task.id)}
                                    style={{marginLeft: '.5rem'}}
                                >
                                    Delete
                                </Button>
                            </div>

                        </CardContent>
                    </Card>
                ))  
            }
        </>
    )
}