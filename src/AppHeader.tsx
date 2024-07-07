import { Image } from '@nextui-org/react'
import React from 'react'

const AppHeader = () => {
  return (
    <div>
        <header className='max-w-[90%] m-auto mt-4'>
            <Image
            src='https://i.pinimg.com/564x/c4/40/2e/c4402e170ca57f93895becb4a561b55a.jpg'
            alt="mail-list-logo"
            width={80}
            height={80}
            />
        </header>
    </div>
  )
}

export default AppHeader