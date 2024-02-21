"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
const Nav = () => {

    const { data: session } = useSession()
    const [providers, setProviders] = useState(null)
    const [toggleDrop, setToggleDrop] = useState(false)

    useEffect(() => {
        const settingProvider = async () => {
            const response = await getProviders();
            setProviders(response)
        }
        settingProvider()

    }, [])

    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href="/" className='flex gap-2 flex-center'>
                <Image
                    src="/assets/images/logo.svg"
                    width={30}
                    height={30}
                    alt="AI-App"
                    className='object-contain'
                />
                <p className='logo_text'>AI-APP</p>
            </Link>

            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href="/create-prompt"
                            className='black_btn'>
                            Create Post
                        </Link>
                        <button className='outline_btn' onClick={signOut} type='button' >Sign Out</button>

                        <Link href="/profile">
                            <Image
                                src={session?.user.image}
                                width={37}
                                height={37}
                                className='rounded-full'
                                alt='profile'
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button
                                type='button'
                                onClick={() => signIn(provider.id)}
                                key={provider.name}
                                className='black_btn'
                            >
                                Sign In
                            </button>
                        ))}
                    </>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt='profile'
                            onClick={() => setToggleDrop((prev) => !prev)}
                        />

                        {toggleDrop && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className='dropdown_link'
                                    onClick={() => setToggleDrop(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href="/create-prompt"
                                    className='dropdown_link'
                                    onClick={() => setToggleDrop(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setToggleDrop(false);
                                        signOut();
                                    }}
                                    className='mt-5 w-full black_btn'
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button
                                type='button'
                                onClick={() => signIn(provider.id)}
                                key={provider.name}
                                className='black_btn'
                            >
                                Sign In
                            </button>
                        ))}
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav
