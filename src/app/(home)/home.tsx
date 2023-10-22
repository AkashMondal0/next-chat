"use client";
import { useMutation, useQuery } from '@tanstack/react-query'
import { Loader, Loader2 } from "lucide-react";
import axios from 'axios'


const fetchUsers = async () => {
    const res = await fetch('/api/users')
    return res.json()
  }

  const postUser = async () => {
    let data = await axios.post('/api/chat/create', {})
    return data
  }
export default function Home() {
    const mutation = useMutation({mutationFn: postUser})
// const { status, data, error } = useQuery({
//     queryKey: ['users'],
//     queryFn: fetchUsers,
//   })


//   if (status === 'pending') {
//     return <Loader className='animate-spin text-zinc-500 ml-auto w-4 h-4' />
//   }

//   if (status === 'error') {
//     return <span>Error: {error.message}</span>
//   }

console.log(mutation.data)

return (
    <div className="flex">
      {mutation.error && <span>Error: {mutation.error.message}</span>}
      <button onClick={() => mutation.mutate()}>Add User</button>
      {mutation.isPending && (
        <Loader2 className='animate-spin text-zinc-500 ml-auto w-4 h-4' />
      )}
    </div>
  );
}