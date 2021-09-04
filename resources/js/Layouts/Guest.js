import React from 'react';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';
import Header from '@/Components/Header'
import Authenticated from './Authenticated';

export default function Guest({ auth, header, children }) {
    if (auth && auth.user) {
        return Authenticated({auth, header, children});
    } else {
        const right = <>
            <Link href={route('login')} className="text-sm text-gray-700 underline">
                Log in
            </Link>

            <Link href={route('register')} className="ml-4 text-sm text-gray-700 underline">
                Register
            </Link>
        </>

        const collapsedRight = <>
            <div className="mt-1 space-y-1">
                <ResponsiveNavLink href={route('login')} as="button">
                    Log In
                </ResponsiveNavLink>
                <ResponsiveNavLink href={route('register')} as="button">
                    Register
                </ResponsiveNavLink>
            </div>
        </>

        return (
            <div className="min-h-screen bg-gray-100">
                <Header
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
        )
    }
}
