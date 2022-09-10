import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface ITodo {
    userId?: number,
    id: number,
    title: string,
    completed: boolean
}

export default function AppTask({ id, title, completed } : ITodo){
    return (
        <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {id}
          </Typography>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2">
            {completed}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    )
}