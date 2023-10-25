/* eslint-disable @next/next/no-img-element */
'use client'
import { cn } from '@/lib/utils';
import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModeToggle } from '@/components/shared/ToggleTheme';

const Header: FC = () => {

    const Pathname = usePathname()
    return (
        <div className={cn('navbar-blur', "w-full h-16 top-0 z-50 md:px-10 sticky")}>
            <div className="flex justify-between items-center h-full w-full px-3">
                {/* logo */}
                <Link href="/">
                    <div className="flex items-center gap-1">
                        {/* <div className="w-12 h-12 rounded-full dark:bg-white bg-black">
                            <img src="Image.png" alt="avatar" className="w-full h-full rounded-full object-cover" />
                        </div> */}
                        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 md:flex hidden">SkySolo</h1>
                    </div>
                </Link>
                {/* navigation */}
                <div className="items-center gap-3 flex">
                    <div className="flex items-center gap-4">
                        {/* navigation */}
                        <Link href="/" className={`${Pathname === "/" ? "text-blue-500 " : "text-gray-900 dark:text-gray-100"}`}>Home</Link>
                        <Link href="/about" className={`${Pathname === "/about" ? "text-blue-500 " : "text-gray-900 dark:text-gray-100"}`}>About</Link>
                        <Link href="/projects" className={`${Pathname === "/projects" ? "text-blue-500 " : "text-gray-900 dark:text-gray-100"}`}>Projects</Link>
                    </div>
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