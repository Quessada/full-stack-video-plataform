import Table from "@/Components/SimpleTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import UpdateCategoryForm from "./Partials/UpdateCategoryForm";

const columns = ["name", "description"];

export default function All({ auth, category }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Categories
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">                    
                        <UpdateCategoryForm category={category} className={'max-w-xl'} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
