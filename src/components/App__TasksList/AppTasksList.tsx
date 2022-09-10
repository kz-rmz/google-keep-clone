import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';


import AppTask from '../App__Task/AppTask';

interface ITodo {
  id: number,
  title: string,
  completed: boolean
}

export default function AppTasksList(): JSX.Element {
  const [ error, setError ] = React.useState< Error | null>(null);
  const [ isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [ todos, setTodos] = React.useState<ITodo[] | []>([]);

  React.useEffect( ()=> {
    fetch("https://github.com/kz-rmz/google-keep-clone/todos")
    .then( res => res.json())
    .then( 
      res => {
        setIsLoaded(true);
        setTodos(res)
      }, 
      error => {
        setError(error);
      }
    )
  }, [])

  if(error) {
    return  (
      <Alert severity="warning">
        <AlertTitle>Ошибка:</AlertTitle>
          This is a warning alert — <strong>{error.message}</strong>
      </Alert>
    ) 
  } else if(!isLoaded){
    return <CircularProgress />
  } else {
  return (
    <Box>
      <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
        {todos.map( (todo, index) => (
          <Grid xs={2} sm={4} md={4} key={index}>
              <AppTask id={todo.id} title={todo.title} completed={todo.completed} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )}
}
