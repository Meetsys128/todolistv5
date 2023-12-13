"use client"
import Link from 'next/link'
import { useEffect,useState } from 'react'
import TodoItem from '../../components/TodoItem'
export default function Page({params}: PageProps){
  const [id,setId]= useState(params.page_id);
  const [reloading,setReloading] = useState<boolean>(true);
  const [item, setItem] = useState<TodoItem>();
  useEffect(() => {
    console.log("Eff"+id);
    if(reloading){ 
      console.log("reloadin")
      fetch('/api')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        var t = data.filter((tempo:TodoItem) => tempo.id==id)[0];
        if(t==null){
          t={name:"No item found", description: "never gonna give up, are you?"};
        }
        setItem(t);
        setReloading(false);
       
      });
    }
   
  }, [reloading]);


    return ( 
      <main className="relative flex min-h-screen flex-col items-center justify-center">
      <p>{item?.id}</p>
      <p>{item?.name}</p>
      <p>{item?.description}</p>
    
      <p className="font-light text-gray-600 w-full max-w-lg text-center mt-6">
        <Link
          href="https://web.pslib.cz/"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Made with no $
        </Link>{' '}
      
       
       
      </p>
  
      <div className="flex justify-center space-x-5 pt-10 mt-10 border-t border-gray-300 w-full max-w-x1 text-gray-600">
        <Link
          href="https://knowyourmeme.com/memes/napoleon-there-is-nothing-we-can-do"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          There is nothing we can do
        </Link>
     
      </div>
  
      <div className="sm:absolute sm:bottom-0 w-full px-20 py-10 flex justify-between">
     
        <Link
          href="https://github.com/Meetsys128/todolistv5"
          className="flex items-center space-x-2"
        >
          
          <p className="font-light">Source</p>
        </Link>
      </div>
    </main>
      )
}
/*import Image from 'next/image'
"use client"
import Link from 'next/link'
import { useEffect,useState } from 'react'
import TodoItem from '../../components/TodoItem'
export default function Page({params}: PageProps){
  const [id,setId]= useState(params.page_id);
  const [reloading,setReloading] = useState<boolean>(true);
  const [item, setItem] = useState<TodoItem>();
  useEffect(() => {
    console.log("Eff");
    if(reloading){ 
      console.log("reloadin")
      fetch(`/api`, {
        method: 'GETUNIQUE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: id})
      })
      .then((response) => response.json())
      .then((data) => {
        setItem(data)
        setReloading(false);
       
      });
    }
   
  }, [reloading]);



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


    return ( 
      <main className="relative flex min-h-screen flex-col items-center justify-center">
      <p>{item?.id}</p>
      <p>{item?.name}</p>
      <p>{item?.description}</p>
    
      <p className="font-light text-gray-600 w-full max-w-lg text-center mt-6">
        <Link
          href="https://web.pslib.cz/"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Made with no $
        </Link>{' '}
      
       
       
      </p>
  
      <div className="flex justify-center space-x-5 pt-10 mt-10 border-t border-gray-300 w-full max-w-x1 text-gray-600">
        <Link
          href="https://knowyourmeme.com/memes/napoleon-there-is-nothing-we-can-do"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          There is nothing we can do
        </Link>
     
      </div>
  
      <div className="sm:absolute sm:bottom-0 w-full px-20 py-10 flex justify-between">
     
        <Link
          href="https://github.com/Meetsys128/todolistv5"
          className="flex items-center space-x-2"
        >
          <Image
            src="/github.svg"
            alt="GitHub Logo"
            width={24}
            height={24}
            priority
          />
          <p className="font-light">Source</p>
        </Link>
      </div>
    </main>
      )
}*/