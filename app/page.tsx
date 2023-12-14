"use client"
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import Table from '@/components/table'
import TablePlaceholder from '@/components/table-placeholder'
import StyledComponent from '@/components/styled-component'

export const dynamic = 'force-dynamic'

export default function Home() {


  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
    
      <StyledComponent>
         <Suspense fallback={<TablePlaceholder />}>
        <Table />
      </Suspense>
      </StyledComponent>
     


     

      <div className="sm:absolute sm:bottom-0 w-full px-20 py-10 flex justify-between">
     
        <Link
          href="https://www.imadeitthefuckup.net/"
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
}
