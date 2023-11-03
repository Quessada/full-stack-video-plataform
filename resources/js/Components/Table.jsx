import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

library.add(faEdit, faTrashAlt);

export default function Table({
    items,
    columns,
    primary,
    firstAction = null,
    secondAction = null,
}) {
    const { delete: destroy } = useForm();

    const onDelete = (item) => {
        Swal.fire({
            title: "Are you sure you want to delete this category?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00a762",
            cancelButtonColor: "#b72424",
            confirmButtonText: "Yes, delete it!",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route(secondAction, item.id), {
                    preserveScroll: true,
                });
            }
        });
    };

    return (
        <div className="relative overflow-x-auto border shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            {primary}
                        </th>
                        {columns.map((column) => (
                            <th key={column} scope="col" className="px-6 py-3">
                                {column}
                            </th>
                        ))}
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr
                            key={item.id}
                            className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                        >
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                #{item.id}
                            </th>
                            {columns.map((column) => (
                                <td key={column} className="px-6 py-4">
                                    {item[column]}
                                </td>
                            ))}
                            <td className="px-6 py-4 text-center">
                                <div className="flex justify-center items-center">
                                    {firstAction && (
                                        <a
                                            href={route(firstAction, item.id)}
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            <FontAwesomeIcon
                                                icon={["fas", "edit"]}
                                            />
                                        </a>
                                    )}
                                    &nbsp; &nbsp;
                                    {secondAction && (
                                        <a
                                            href="#"
                                            onClick={(ev) => onDelete(item)}
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                        >
                                            <FontAwesomeIcon
                                                icon={["fas", "trash-alt"]}
                                            />
                                        </a>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
