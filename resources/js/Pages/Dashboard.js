import React from 'react';
import Framed from '@/Layouts/Framed';
import { Head } from '@inertiajs/inertia-react';

export default function Dashboard(props) {
    return (
        <Framed 
            errors = {props.errors}
            auth = {props.auth}
            canSeeSecret = {props.canSeeSecret}
            header ={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">You're logged in!</div>
                    </div>
                </div>
            </div>
        </Framed>
    );
}
