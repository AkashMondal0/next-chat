/* eslint-disable @next/next/no-img-element */
'use client'
import { cn } from '@/lib/utils';
import { FC } from 'react';
import { ModeToggle } from '@/components/shared/ToggleTheme';
import useClientProfile from '@/hooks/client-profile';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Group } from '@/interface/type';

interface GroupHeaderProps {
  data:Group | undefined
}

const GroupHeader: FC<GroupHeaderProps> = ({
    data
}) => {
    const currentProfile = useClientProfile()
    const router = useRouter()
    return (
        <div className={cn('navbar-blur', "w-full h-16 top-0 z-50 px-2 sticky")}>
            <div className="flex justify-between items-center h-full w-full">
                {/* logo */}
                {data ?
                    <div className='flex items-center gap-2'>
                        <div className='md:hidden'>
                            {/* <SheetSide trigger={<Menu size={30} className='cursor-pointer'/>}>
                                <Sidebar />
                            </SheetSide> */}
                            <ChevronLeft size={30} onClick={() => router.push('/')} />
                        </div>
                        <>
                            <div className="flex items-center gap-2">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={data.imageUrl} alt="Avatar" />
                                    <AvatarFallback>{data.name[0]}</AvatarFallback>
                                </Avatar>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex">
                                    {data.name}
                                </h1>
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

export default GroupHeader;