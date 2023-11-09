import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import UpdateVideoForm from "./Partials/UpdateVideoForm";

export default function All({ auth, video }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Videos
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">                    
                        <UpdateVideoForm video={video} className={'max-w-xl'} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
