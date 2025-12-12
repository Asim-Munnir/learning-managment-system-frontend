import { Menu, School } from 'lucide-react'
import React, { useEffect } from 'react'
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import DarkMode from '@/DarkMode';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from './ui/sheet';

import { Separator } from '@radix-ui/react-dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '@/features/api/authApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "User Logout.")
            navigate("/")
        }
    }, [isSuccess])

    const logoutHandler = async () => {
        await logoutUser()
    }

    return (
        <div className='h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10'>

            {/* Desktop Navbar */}
            <div className='max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full'>
                <div className='flex items-center gap-2'>
                    <School size={"30"} />
                    <Link to='/'><h1 className='hidden md:block font-extrabold text-2xl'>E-Learning</h1></Link>
                </div>

                <div className='flex items-center gap-8'>
                    {
                        user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar>
                                        <AvatarImage className="cursor-pointer object-cover" src={user?.photoUrl || "https://t3.ftcdn.net/jpg/08/05/28/22/360_F_805282248_LHUxw7t2pnQ7x8lFEsS2IZgK8IGFXePS.jpg"} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="start">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        {
                                            user.role === "student" && (
                                                <>
                                                    <DropdownMenuItem><Link to="/my-learning">My Learning</Link></DropdownMenuItem>
                                                </>
                                            )
                                        }

                                        <DropdownMenuItem><Link to="/profile">Profile</Link></DropdownMenuItem>
                                        <DropdownMenuItem onClick={logoutHandler}>Logout</DropdownMenuItem>
                                    </DropdownMenuGroup>

                                    {user.role === "instructor" && (
                                        <>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Link to="/admin/dashboard">Dashboard</Link>
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className='flex items-center gap-2'>
                                <Button variant="outline"><Link to="/login">Login</Link></Button>
                                <Button><Link to="/login">Signup</Link></Button>
                            </div>
                        )
                    }

                    <DarkMode />
                </div>
            </div>

            {/* Mobile Navbar */}
            <div className='flex md:hidden items-center justify-between px-4 h-full'>
                <h1 className='font-extrabold text-2xl'>E-Learning</h1>
                <MobileNavbar />
            </div>
        </div>
    )
}

export default Navbar;



// ---------------- MOBILE NAVBAR -------------------

const MobileNavbar = () => {
    const { user } = useSelector(store => store.auth)
    const [logoutUser] = useLogoutUserMutation();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        await logoutUser()
        navigate("/")
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size='icon' className="rounded-full hover:bg-gray-200" variant="outline">
                    <Menu />
                </Button>
            </SheetTrigger>

            <SheetContent className="flex flex-col">
                <SheetHeader className="flex flex-row items-center justify-between mt-2">
                    <SheetTitle><Link to="/">E-Learning</Link></SheetTitle>
                    <DarkMode />
                </SheetHeader>

                <Separator className='mr-2' />

                {/* CONDITIONAL RENDERING SAME AS DESKTOP */}
                {
                    user ? (
                        <>
                            <nav className='flex flex-col space-y-4 mt-4'>
                                {
                                    user.role === "student" && (
                                        <>
                                            <Link to="/my-learning">My Learning</Link>
                                        </>
                                    )
                                }

                                <Link to="/profile">Edit Profile</Link>
                                <p className='cursor-pointer' onClick={logoutHandler}>Logout</p>
                            </nav>

                            {user.role === "instructor" && (
                                <SheetFooter>
                                    <SheetClose asChild>
                                        <Button asChild>
                                            <Link to="/admin/dashboard">Dashboard</Link>
                                        </Button>
                                    </SheetClose>
                                </SheetFooter>
                            )}
                        </>
                    ) : (
                        <nav className='flex flex-col space-y-4 mt-4'>
                            <Link to="/login">Login</Link>
                            <Link to="/login">Signup</Link>
                        </nav>
                    )
                }

            </SheetContent>
        </Sheet>
    )
}
