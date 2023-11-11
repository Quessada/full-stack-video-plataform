import Notification from "@/Components/Notification";
import PaginationLinks from "@/Components/PaginationLinks";
import Table from "@/Components/PersonalizedTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axiosClient from "@/axios-client";
import { Head, Link, useForm, usePage } from "@inertiajs/react";

export default function All({ auth, videos }) {
    window.videos = videos;
    const { flash } = usePage().props;
    // const [videos, setVideos] = useState([]);
    const { get } = useForm();
    const columns = ["title", "description", "category", "privacy"];

    const tableArrayKeys = ["title", "description", "category.name", "privacy"];

    const onPageClick = (link) => {
        console.log("LINK = ", link)
        axiosClient.get(link.url)
        .then((response) => {
            console.log("RESPONSE paginate == ", response.data)
        });
    };

    console.log(flash);
    console.log("META =321321312 ", videos);
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
            {flash && <Notification response={flash} />}
            <div className="py-12">
                <div className="flex justify-end max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Link
                        href={route("videos.create")}
                        className="h-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Add New
                    </Link>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Table
                            items={videos.data}
                            primary="Video ID"
                            model={"video"}
                            columns={columns}
                            dataKeys={tableArrayKeys}
                            firstAction={"videos.edit"}
                            secondAction={"videos.delete"}
                        ></Table>
                    </div>
                </div>
            </div>

            <PaginationLinks meta={videos} onPageClick={onPageClick} />
        </AuthenticatedLayout>
    );
}
