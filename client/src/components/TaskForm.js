import {Grid, Card, Typography, CardContent, TextField, Button, CircularProgress} from '@mui/material';
import { useState, useEffect } from 'react';
import{useNavigate, useParams} from 'react-router-dom';


export default function TaskForm() {
    const [task, setTask] = useState({
        title: '',
        description: '',
    });
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

        if(editing) {
            await fetch(`http://localhost:4000/tasks/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });
        } else {
            await fetch('http://localhost:4000/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {'Content-Type': 'application/json'}
            });
        }

        setLoading(false);
        navigate('/');
    };

    const handleChange = (e) => {
        setTask({...task, [e.target.name]: e.target.value});
    };

    const loadTask = async (id) => {
        const res = await fetch(`http://localhost:4000/tasks/${id}`);
        const data = res.json();
        setTask({title: data.title, description: data.description});
        setEditing(true);
        
    };

    useEffect(() => {
        if(params.id) {
            loadTask(params.id);
        }
    }, [params.id]);

    return(
        <Grid container 
            direction='column' 
            alignItems='center' 
            justifyContent='center'
        >
            <Grid item xs={3}>
                <Card
                    sx={{mt: 5}}
                    style={{
                        backgroundColor: '#103955',
                        padding: '1rem'
                    }}
                >
                    <Typography variant='5' textAlign='center' color='white'>
                        {editing ? 'Edit task' : 'Create task'}
                    </Typography>
                    <CardContent >
                        <form onSubmit={handleSubmit}>
                            <TextField 

                                style={{
                                    backgroundColor: '#3a4a54',
                                }}

                                variant='filled'
                                label='Task title'
                                sx={{
                                    display: 'block',
                                    margin:'.5rem 0'
                                }}
                                name='title'
                                value={task.title}
                                onChange={handleChange}
                                inputProps={{
                                    style:{color: "white"}
                                }}
                            />
                            <TextField 

                                style={{
                                    backgroundColor: '#3a4a54',
                                }}

                                variant='filled'
                                label='Write a description'
                                multiline
                                rows={5}
                                sx={{
                                    display: 'block',
                                    margin:'.5rem 0'
                                }}
                                name='description'
                                value={task.description}
                                onChange={handleChange}
                                inputProps={{
                                    style:{color: "white"}
                                }}
                            />

                            <Button 
                                variant='contained' 
                                color='success' 
                                type='submit' 
                                disabled={!task.title || !task.description}
                                >
                                {loading ? (
                                    <CircularProgress
                                        color='inherit'
                                        size={24}
                                    />) : (
                                        editing ? 'Edit task' : 'Create task'
                                        )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}