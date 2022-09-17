import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useQueryClient, useMutation } from 'react-query';

export default function FormDialog({ id, task, isCompleted, dialogIsOpened, handleDialogClose } : any) {
  const [ editedTask, setEditedTask] = React.useState(task);
  const queryClient = useQueryClient();

  function handleTaskEdition(event: any){
    setEditedTask(event.target.value)
  }

  const updateTask = useMutation( updatedTask => {
    return fetch(
      `https://629e0c69c6ef9335c0ad6096.mockapi.io/api/v1/todos/${id}`,
      { 
        method: "PUT",
        headers: {'content-type' : 'application/json'},
        body: JSON.stringify(updatedTask)
      })
    },
    {
      onMutate: async (updatedTask: any) => {
        await queryClient.cancelQueries(['todos', updatedTask.id])
        const previousTodo = queryClient.getQueryData(['todos', updatedTask.id])
        queryClient.setQueryData(['todos', updatedTask.id], updatedTask)
        return { previousTodo, updatedTask }
      },
      onError: (err, updatedTask, context) => {
        //@ts-ignore
        queryClient.setQueryData(['todos', context.updatedTask.id],context.previousTask)
      },
      onSettled: updatedTask => {
        //@ts-ignore
        queryClient.invalidateQueries(['todos', updatedTask.id])
      }
    }
  )

  return (
      <Dialog 
        open={dialogIsOpened}
        onClose={handleDialogClose}
      >
        <DialogTitle>Заметка</DialogTitle>
        <DialogContent>
            <TextField
              multiline
              autoFocus
              margin="dense"
              id="name"
              label="Введите текст:"
              type="text"
              fullWidth
              variant="standard"
              value={editedTask}
              onChange={handleTaskEdition}
              sx={{
                minWidth: { xs: '400px', md: '350px',lg: '650px'},
                minHeight: {xs: '320px', md: '250px', lg: '550px'},
              }}

            />
        </DialogContent>
        <DialogActions>
          <Button onClick={ () => {
            updateTask.mutate({
              id: id,
              task: editedTask,
              isCompleted: isCompleted
            })
            handleDialogClose()
          }}
        >Сохранить</Button>
          <Button onClick={handleDialogClose}>Отмена</Button>
        </DialogActions>
      </Dialog>
  );
}
