import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import UserDropdown from '@/Components/UserDropdown';
import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink'

export default function Framed(props) {
    const auth = props.auth
    const header = props.header
    const errors = props.errors

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    let SideNav
    let Right = <>
        <Link href={route('login')} className="text-sm text-gray-700 underline">
            Log in
        </Link>

        <Link href={route('register')} className="ml-4 text-sm text-gray-700 underline">
            Register
        </Link>
    </>

    const links = {}

    if (auth && auth.user) {
        Right = <UserDropdown user={auth.user} />

        SideNav = <>
            <div className="px-4">
                <div className="font-medium text-base text-gray-800">{auth.user.name}</div>
                <div className="font-medium text-sm text-gray-500">{auth.user.email}</div>
            </div>

            <div className="mt-3 space-y-1">
                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                    Log Out
                </ResponsiveNavLink>
            </div>
        </>

        links.dashboard = 'Dashboard'
        if (props.canSeeSecret) {
            links.secret = 'Secret'
        }
    }

    const NavLinks = Object.entries(links).map(([key, value]) =>
        <NavLink key={key} href={route(key)} active={route().current(key)}>
            {value}
        </NavLink>
    );

    const SideLinks = Object.entries({"welcome": "Welcome", ...links}).map(([key, value]) =>
        <ResponsiveNavLink key={key} href={route(key)} active={route().current(key)}>
            {value}
        </ResponsiveNavLink>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between">
                        <div className="mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="flex justify-between h-16">
                            <div className="hidden sm:flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto text-gray-500" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                {NavLinks}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                {Right}
                            </div>
                        </div>

                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        {SideLinks}
                    </div>

                    {SideNav &&
                        <div className="pt-4 pb-1 border-t border-gray-200">
                            {SideNav}
                        </div>
                    }
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{props.children}</main>
        </div>
    );
}

