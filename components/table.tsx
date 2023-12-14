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

    <div style={{width:"100%"}}>
          {reloading
      ?
      <>
     <div className='load'></div>
      </>
      :
      <>
       <div>
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">The list of todo items</h2>
          <p className="text-sm">
            Fetched {itemlist.length} todos in {duration}ms
          </p>
        </div>
      
      </div>
      <table style={{width:"100%"}}>
  
      <tr
            
            className="flex items-center justify-between py-3"
          >
            
              <td style={{width:"25%",overflow:"hidden"}}><strong>Name</strong></td>
            <td style={{width:"55%",overflow:"hidden"}}>
            <p>Description</p>
              </td> 
              <td >
              Actions
              </td>
             
            <td>
            <p className="text-sm text-gray-500" style={{color:"#FFEEDD"}}>Last modified</p>
            </td>
            
          </tr>
  {itemlist.map((item:TodoItem) => (
          <tr
            key={item.name}
            className="flex items-center justify-between py-3"
          >
            
              <td style={{width:"25%",overflow:"hidden"}}><strong>{item.name}</strong></td>
            <td style={{width:"50%",overflow:"hidden"}}>
            <p>{item.description}</p>
              </td> 
              <td >
              <Link href="/[slug]" as={`/${item.id}`}> Edit</Link>&nbsp;&nbsp;&nbsp;
              <Link href="/" onClick={(rating) => deleteItem(item.id)} className='danger'>Delete</Link>
              </td>
             
            <td>
            <p className="text-sm text-gray-500" style={{color:"#FFEEDD"}}>{timeAgo(item.createdAt)}</p>
            </td>
            
          </tr>
        ))}
</table>
   <Link href="/new">Add new todo</Link>
      </>
     
      }
     
    </div>
  )
}
