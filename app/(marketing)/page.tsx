import { Button } from '@/components/ui/button';
import { Medal } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

export default function MarketingPage  () {
  return (
    <div className=" flex justify-center items-center flex-col">
      <div className="  flex justify-center items-center flex-col">
        <div className=" mb-4 flex items-center border p-4 rounded-full uppercase bg-amber-100 text-amber-700 shadow-sm">
          <Medal className="h-6 w-6 mr-2" />
          No 1 task manegment
        </div>
        <div className=" text-3xl md:text-6xl text-center text-neutral-700 mb-6">
          Trimilo helps team move
        </div>
        <div className=" text-3xl md:text-6xl text-center bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-5 py-3 w-fit rounded-md">work forward.</div>
      </div>
      <div className=' text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto '>
        Collaborate,manage projects, and reach any productivity peaks.From high rises to the home office, the way is unique -accomplish it all with Trimilo
      </div>
      <Button className=' mt-2'><Link href={'/sign-up'}>Get Trimilo for free</Link></Button>
    </div>
  );
}
