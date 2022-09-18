import * as React from 'react';
import { useQueryClient, useMutation } from 'react-query';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { CardActionArea } from '@mui/material';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CircularProgress from '@mui/material/CircularProgress';

import ITodo from '../../interfaces/ITodo';
import TaskDialog from '../TaskDialog/TaskDialog';

export default function SingleTask({ id, task, isCompleted } : ITodo): JSX.Element{
  const [ dialogIsOpened, setDialogIsOpened ] = React.useState(false);
  const [ selected, setSelected] = React.useState(isCompleted);
  const queryClient = useQueryClient()
  const handleDialogOpen = () => {
    setDialogIsOpened(true);
  };
  const handleDialogClose = () => {
    setDialogIsOpened(false);
  };

  const deleteTask = useMutation( (): any => 
    {
      return fetch( `https://629e0c69c6ef9335c0ad6096.mockapi.io/api/v1/todos/${id}`, { method: "DELETE"} )
    }, 
    {
      onMutate: async () => {
        await queryClient.cancelQueries('todos')
        const previousTodos = queryClient.getQueryData('todos')
        // @ts-ignore
        queryClient.setQueryData('todos', old =>  old.filter( task => { return task['id'] !== id}))
        return { previousTodos }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['tasks'])
    }}
  )

  return (
    <React.Fragment>
      <TaskDialog 
        id={id}
        task={task}
        isCompleted={isCompleted}
        dialogIsOpened={dialogIsOpened}
        handleDialogClose={handleDialogClose}
        />

      <Card sx={{minHeight: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <CardActionArea onClick={handleDialogOpen} sx={{flexGrow: 1}}>
          <CardContent sx={{position: 'relative'}}>
            { deleteTask.isLoading ? <CircularProgress size={'1.5rem'} sx={{ position: 'absolute', top: '50%', left: '50%'}} /> :  
            <Typography sx={{ wordWrap: 'break-word' }} variant="body1">
              {task}
            </Typography>
            }
          </CardContent>
        </CardActionArea>
          <CardActions sx={{
            justifyContent: 'flex-end'
          }}>
              <ToggleButton
                sx={{ml: 'auto'}}
                value="check"
                selected={selected}
                onChange={() => {
                  setSelected(!selected);
                }}
              >
                <DoneOutlinedIcon />
              </ToggleButton>
            <Button onClick={ handleDialogOpen }>
              <EditOutlinedIcon sx={{fontSize: '1.3rem'}} />
            </Button>
            <Button onClick={ () => deleteTask.mutate() }>
              <DeleteOutlineIcon sx={{fontSize: '1.3rem'}} />
            </Button>
          </CardActions>
      </Card>
    </React.Fragment>
  )
}