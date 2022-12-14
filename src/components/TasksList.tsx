// dependencies
import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
// interfaces
import ITodo from '../interfaces/ITodo';
// hooks
import useTasks from '../hooks/useTasks';
import SearchInputContext from '../context/useSearchInputContext';
// components
import NewTask from './NewTask';
import SingleTask from './SingleTask';
// React component
export default function TasksList(): JSX.Element {
  const {isLoading, isError, error, data } = useTasks();
  const { searchInput, setSearchInput} = React.useContext(SearchInputContext);

  const filteredData = data?.filter((el: any) => {
    //if no input the return the original
    if (searchInput === null) {
        return el;
    }
    //return the item which contains the user input
    else {
        return el.task.toLowerCase().includes(searchInput)
    }
})

  if(isError) {
    return  (
      <Alert severity="warning" sx={{ margiTop: '100px'}}>
        <AlertTitle>Ошибка:</AlertTitle>
{/* @ts-ignore */}
          Произошла ошибка — <strong>{error.message}</strong>
      </Alert>
    ) 
  } 
  else if(isLoading){
    return <CircularProgress sx={{ margin: '200px auto'}} />
  } else {
    return (
      <Box component="main"
      sx={{ 
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      minWidth: {xs:'250px', sm: '400px'},
      gap: '2rem',
      marginTop: '100px',
      marginBottom: '30px',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      justifyContent: 'center', 
      alignItems: 'center' }}
      >  
        <NewTask />
        <Grid 
          container spacing={{ xs: 1.5, lg: 2.5 }}
          columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 6 }} 
          sx={{
            flexGrow: 1,
            justifyContent: {xs: 'center'}
          }}
        >

          {filteredData.map( (todo: ITodo, index: number) => (
            <Grid xs={1} sm={1} md={1} lg={1} key={index} 
                  sx={{
                    minWidth: {xs: '250px', sm: '330px', lg: '250px'},
                    maxWidth: {xs: '400px'},
                    flexGrow: 1}}>
                <SingleTask 
                  id={todo.id}
                  task={todo.task}
                  isCompleted={todo.isCompleted}
                />
            </Grid>
          ))}
        </Grid>
      </Box>
    )}
}