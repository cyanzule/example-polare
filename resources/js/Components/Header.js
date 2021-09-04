import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';

export default function Header({ links, right, collapsedRight }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    let NavLinks, DropLinks
    if(links) {
        NavLinks = Object.entries(links).map(([key, value]) =>
            <NavLink key={key} href={route(key)} active={route().current(value)}>
                {value}
            </NavLink>
        );
    
        DropLinks = Object.entries(links).map(([key, value]) =>
            <ResponsiveNavLink key={key} href={route(key)} active={route().current(key)}>
                {value}
            </ResponsiveNavLink>
        );
    }

    return (
        <nav className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto text-gray-500" />
                            </Link>
                        </div>

                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            {NavLinks}
                        </div>
                    </div>

                    {right && <div className="hidden sm:flex sm:items-center sm:ml-6">
                        <div className="ml-3 relative">
                            {right}
                        </div>
                    </div>}
                    <div className="-mr-2 flex items-center sm:hidden">
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
                </div>
            </div>

            <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                <div className="pt-2 pb-3 space-y-1">
                    {DropLinks}
                </div>

                {collapsedRight &&
                    <div className="pt-4 pb-1 border-t border-gray-200">
                        {collapsedRight}
                    </div>
                }
            </div>
        </nav>
    );
}
