import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next';
export async function GET(req: Request, res: Response) {
  try {
    const todos = await prisma.todo.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true
      },
    });
    console.log(todos);
    return new Response(JSON.stringify(todos), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  catch(e) {
    return new Response(
      JSON.stringify({
        message: "server je mrtev?pog?",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
  
    try {
      const todo = await prisma.todo.findUnique({
        where: {
          id: Number(id),
        },
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
        },
      });
  
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
  
      return res.status(200).json(todo);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json()

    if (!body.id || !body.name || !body.description) {
      return new Response(
        JSON.stringify({
          message: "No to nejde tohle asi...",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const item= await prisma.todo.create({
      data: {
          id: body.id,
          name: body.name,
          description: body.description
      },
    });
    return new Response(JSON.stringify(item), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  catch(e) {
    return new Response(
      JSON.stringify({
        message: "server neservíruje :(",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function DELETE(req: Request, res: Response) {
  try {
    const body = await req.json()
    const device = await prisma.todo.delete({
      where: { id: body.id}
    });
    return new Response(
      JSON.stringify({
        message: "Mažu todo item na id: " + body.id,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  catch {
    return new Response(
      JSON.stringify({
        message: "Něco se pokazilo, co už...",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}