import React from 'react';
import Framed from '@/Layouts/Framed';
import { Head } from '@inertiajs/inertia-react';

export default function Secret(props) {
    return (
        <Framed 
            errors = {props.errors}
            auth = {props.auth}
            canSeeSecret = {props.canSeeSecret}
            header ={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Secret</h2>}
        >
            <Head title="Secret" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">Shh! It's a secret.</div>
                    </div>
                </div>
            </div>
        </Framed>
    );
}
