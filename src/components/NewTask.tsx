import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import { useQueryClient, useMutation } from 'react-query';
import ITodo from '../interfaces/ITodo';

export default function NewTask({updateTasks}:any): JSX.Element {
  const [ task, setTask ] = React.useState<string>('');
  const queryClient = useQueryClient()

  
  const createTask = useMutation( (newTask: ITodo) => {
    return fetch("https://629e0c69c6ef9335c0ad6096.mockapi.io/api/v1/todos", {    
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask)})
    }, {
      onMutate: async (newTask) => {
        await queryClient.cancelQueries('todos')
        const previousTodos = queryClient.getQueryData('todos')
        // @ts-ignore
        queryClient.setQueryData('todos', old => [...old, newTask])
        return { previousTodos }
      },
      onSuccess: ()=>{
        queryClient.invalidateQueries(['tasks'])
      }
    })
    
    function handleChange(event: any){
      setTask(event.target.value);
    }

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: { sm: '400px', lg: 600}, justifyContent: 'center'}}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Заметка..."
        inputProps={{ 'aria-label': 'добавить новую задачу' }}
        onChange={handleChange}
        value={task}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton 
        color="primary"
        sx={{ p: '10px' }}
        aria-label="directions"
        //@ts-ignore
        onClick={ () => createTask.mutate({
            id: Math.random(),
            task: task,
            isCompleted: false
        })
        } 
        >
        { createTask.isLoading ? <CircularProgress size={'1.5rem'} /> : <AddOutlinedIcon /> }
      </IconButton>
    </Paper>
  );
}
