import React from 'react';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Header from '@/Components/Header'

export default function Authenticated({ auth, header, children }) {
    const right = <Dropdown>
        <Dropdown.Trigger>
            <span className="inline-flex rounded-md">
                <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                >
                    {auth.user.name}

                    <svg
                        className="ml-2 -mr-0.5 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </span>
        </Dropdown.Trigger>

        <Dropdown.Content>
            <Dropdown.Link href={route('logout')} method="post" as="button">
                Log Out
            </Dropdown.Link>
        </Dropdown.Content>
    </Dropdown>

    const collapsedRight = <>
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

    return (
        <div className="min-h-screen bg-gray-100">
            <Header
                links={{ dashboard: 'Dashboard' }}
                right={right}
                collapsedRight={collapsedRight}
            />

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
