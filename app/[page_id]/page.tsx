"use client"
import Link from 'next/link'
import { useEffect,useState,useRef } from 'react'
import TodoItem from '../../components/TodoItem'
import StyledComponent from '../../components/styled-component';
import StyledComponentHeader from '../../components/styled-component-header';
import StyledComponentSameRow from '../../components/styled-component-samerow';
import StyledComponentTitle from '../../components/styled-component-title';
import StyledComponentMultilineText from '@/components/styled-component-multiline-text';
import { BooleanLiteral } from 'typescript';

export default function Page({params}: PageProps){
  const [id,setId]= useState(params.page_id);
  const [reloading,setReloading] = useState<boolean>(true);
  const [item, setItem] = useState<TodoItem>();
  const [name,setName] = useState<string>();
  const [desc,setDesc] = useState<string>();
  const [saved,setSaved] = useState<boolean>();
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
          t={name:"New item", description: "write the details here!"};
        }
        setItem(t);
        setName(t.name);
        setDesc(t.description);
        setReloading(false);
       
      });
    }
   
  }, [reloading]);

  const deleteItem = (id:number|undefined) => {
    console.log("start deletus")
    if(id==undefined){
    console.log("uh oh")
    
      return;
    }
    var status = 200
    fetch(`/api`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: id})
    })
      .then((response) => {
       //setReloading(true);
       console.log("done did it")
      
      })
      
     
  };
  const updateItem = () => {
    
    if(item?.id==undefined){
      fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, description: desc}),
      })
        .then((response) => response.json())
        .then((created) => {
        setSaved(true);
        });
        return;
    }
    var status = 200
    fetch(`/api`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: item?.id})
    })
      .then((response) => {
        fetch('/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: item.id, name: name, description: desc, createdAt: item.createdAt}),
        })
          .then((response) => response.json())
          .then((created) => {
          setSaved(true);
          });
      })
      
     
  };
    return ( 
      <main className="relative flex min-h-screen flex-col items-center justify-center">
       {name==undefined? 
      <div>
         <div className="load"></div>
       
      </div>
      
         
     
       :
       <StyledComponent>
  <StyledComponentSameRow>

    <p style={{ alignSelf: 'flex-end' }}><StyledComponentTitle value={name} onChange={(e) => {setName(e.target.value);setSaved(false)}}></StyledComponentTitle></p>
    <StyledComponentHeader>{item?.id}</StyledComponentHeader>
  </StyledComponentSameRow>
  <StyledComponentMultilineText value={desc} onChange={(e) => {setDesc(e.target.value);setSaved(false);}}/>
  <StyledComponentSameRow>
  
  <Link href="/" onClick={(rating) => deleteItem(item?.id)} style={{color: '#CC2211'}}>Delete</Link>
  
  {saved 
  ?
  <>
  <Link href="/"  style={{color: '#e7af35'}}>Back</Link>
  <p>Saved</p>
  </>
  :
  <>
   <Link href="/"  style={{color: '#8d7031'}}>Back (discard changes)</Link>
   <button onClick={(rating) => updateItem()} style={{color: '#22CC11'}}>Save changes</button>
  </>
 
  }
  
 
  </StyledComponentSameRow>
  
 
    
</StyledComponent>
       }

      
    
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