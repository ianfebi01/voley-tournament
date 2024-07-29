'use client';
import { faGamepad, faVolleyball } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image'
import ButtonSignOut from '../Buttons/ButtonSignOut'
import { useSession } from 'next-auth/react'
import ButtonSidebar from '../Buttons/ButtonSidebar'

const Sidebar = () => {

  const { data:session } = useSession()
	
  return (
    <aside
      id="sidebar"
      className="fixed top-0 left-0 z-40 flex flex-col w-64 h-screen transition-transform py-7 sm:translate-x-0 bg-dark-secondary"
      aria-label="Sidebar"
    >
      <div className="flex items-center gap-4 pb-6 mx-3 mb-6 border-b border-white/25">
        <Image src="/Logo.svg"
          alt="Logo image"
          width={40}
          height={40}
        />
        <div className="flex gap-2">
          <h1 className="m-0 text-xl font-bold leading-none">SEMULUH</h1>
          <h1 className="m-0 text-xl font-bold leading-none text-orange">
            KIDUL
          </h1>
        </div>
      </div>
      <div className="grow-[1] px-3 pb-4 overflow-y-auto">
        <ul className="space-y-2">
          <li>
            <ButtonSidebar text='Team'
              icon={faVolleyball}
              path="/admin"
            />
          </li>
          <li>
            <ButtonSidebar text='Games'
              icon={faGamepad}
              path="/admin/games"
            />
          </li>
        </ul>
      </div>
      <div className="px-3">
        <div>
          <div className='flex items-center w-full gap-2 p-2 text-base text-white transition-all duration-500 ease-in-out bg-transparent border rounded-lg hover:bg-dark border-white/25 hover:border-transparent'>
            <Image src={session?.user?.avatar as string}
              alt='Avatar'
              width={40}
              height={40}
              className='overflow-hidden border border-none rounded-full'
            />
            <div className='flex flex-col gap-2'>
              <h2 className='text-xs line-clamp-1'>{session?.user?.name}</h2>
              <p className='line-clamp-1 text-[0.5rem] leading-none'>{session?.user?.email}</p>
            </div>
            <ButtonSignOut iconOnly/>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
