/* eslint-disable @next/next/no-img-element */
'use client'
import { cn } from '@/lib/utils';
import { FC } from 'react';
import { ModeToggle } from '@/components/shared/ToggleTheme';
import { Conversation } from '@/interface/type';
import useClientProfile from '@/hooks/client-profile';
import { Skeleton } from '@/components/ui/skeleton';
import { SheetSide } from '@/components/shared/Sheet';
import Sidebar from '@/app/(home)/components/sidebar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface HeaderProps {
    data: Conversation | undefined
}

const Header: FC<HeaderProps> = ({
    data
}) => {
    const currentProfile = useClientProfile()
    let userData = data?.users.find((user) => user.id !== currentProfile.state.id)

    return (
        <div className={cn('navbar-blur', "w-full h-16 top-0 z-50 px-4 sticky")}>
            <div className="flex justify-between items-center h-full w-full">
                {/* logo */}
                {userData ?
                    <div className='flex items-center gap-3'>

                        <div className='md:hidden'>
                            <SheetSide trigger={<Menu size={30} className='cursor-pointer'/>}>
                                <Sidebar />
                            </SheetSide>
                        </div>
                        <>
                            <div className="flex items-center gap-2">
                                <div className="w-12 h-12 rounded-full dark:bg-white bg-black">
                                    <img src={userData?.imageUrl} alt="avatar" className="w-full h-full rounded-full object-cover" />
                                </div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex">{userData?.name}</h1>
                            </div>
                        </>
                    </div>
                    :
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>}
                {/* navigation */}
                <div className="items-center gap-3 flex">
                    {/*  */}
                    {/* mode toggle */}
                    <div className='md:hidden flex'>
                        <ModeToggle />
                    </div>
                </div>
                {/*  */}
                <div className='hidden md:flex'>
                    <ModeToggle />
                </div>
            </div>
        </div>
    );
};

export default Header;