import prisma from '../lib/prisma'

async function main() {
  const response = await Promise.all([
    prisma.todo.upsert({
      where: { id: 1  },
      update: {},
      create: {
        name: 'finish next.js project',
        description: 'I really wish I werent here right now',
      },
    }),
    prisma.todo.upsert({
      where: { id: 2  },
      update: {},
      create: {
        name: 'get instance of instace of insteance',
        description: 'it do be so',
      },
    })
  
  ])
  console.log(response)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
