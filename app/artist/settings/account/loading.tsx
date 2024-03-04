import { LoaderIcon } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
        <LoaderIcon className='animate-spin h-16 w-16 '/>
    </div>
  )
}

export default loading