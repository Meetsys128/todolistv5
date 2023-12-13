"use client"
import prisma from '@/lib/prisma'
import { timeAgo } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect,useState } from 'react'
import TodoItem from '../components/TodoItem'
export default async function Table() {
  const [reloading,setReloading] = useState<boolean>(true);
  const [itemlist, setItemList] = useState<TodoItem[]>([]);
  const startTime = Date.now()
  const [duration,setDuration] = useState<number>()

  useEffect(() => {
    console.log("Eff");
    if(reloading){
      console.log("reloadin")
    fetch('/api')
      .then((response) => response.json())
      .then((data) => {
        setItemList(data)
        setReloading(false);
        setDuration(Date.now() - startTime)
      });
    }
   
  }, [reloading]);

  

  const deleteItem = (id:number) => {
    
    var status = 200
    fetch(`/api`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: id})
    })
      .then((response) => {
       setReloading(true);
      })
      
     
  };

  return (
    <div className="widen bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full" >
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">The list of todo items</h2>
          <p className="text-sm text-gray-500">
            Fetched {itemlist.length} todos in {duration}ms
          </p>
        </div>
      
      </div>
      <div className="divide-y divide-gray-900/5">
        {itemlist.map((item:TodoItem) => (
          <div
            key={item.name}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <strong>{item.name}</strong>
             <p>{item.description}</p>
              
             <Link href="/[slug]" as={`/${item.id}`}> Edit</Link>
              <button onClick={(rating) => deleteItem(item.id)} className='danger'>Delete</button>
            </div>
            <p className="text-sm text-gray-500">{timeAgo(item.createdAt)}</p>
          </div>
        ))}
             <button>Add new todo</button>
      </div>
    </div>
  )
}
