import { useQuery } from "react-query";

export default function useTasks(){
    return useQuery( 'todos', async () => {
        const response = await fetch("https://629e0c69c6ef9335c0ad6096.mockapi.io/api/v1/todos")
        if(!response){
            throw new Error('Проблемы при соединение с сервером')
        }
        return response.json()
    })
}