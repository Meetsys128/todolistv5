"use client"
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import Table from '@/components/table'
import TablePlaceholder from '@/components/table-placeholder'

export const dynamic = 'force-dynamic'

export default function Home() {


  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
    
      <Suspense fallback={<TablePlaceholder />}>
        <Table />
      </Suspense>
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
