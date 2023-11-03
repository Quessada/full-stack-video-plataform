import React, { useState, useEffect } from "react";

const Notification = ({ response, ...props }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (response.message) {
            const timer = setTimeout(() => {
                hideNotification();
            }, 5000); // Automatically hide after 3 seconds (adjust as needed)

            return () => clearTimeout(timer);
        }
    }, [response.message]);

    const hideNotification = () => {
        setVisible(false);
    };

    return visible && response.message ? (
        <div className="absolute top-8 right-10">
            <div
            className={`flex items-center z-10 mr-3 w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800`}
            role="alert"
        >
            <div
                className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-${
                    response.status === "success" ? "green-500" : "red-500"
                } bg-${
                    response.status === "success" ? "green-100" : "red-100"
                } rounded-lg dark:bg-${
                    response.status === "success" ? "green-800" : "red-800"
                } dark-text-${
                    response.status === "success" ? "green-200" : "red-200"
                }`}
            >
                <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="sr-only">Check icon</span>
            </div>
            <div className="ml-3 text-sm font-normal">{response.message}</div>
            <button
                type="button"
                className={`ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark-text-${
                    response.status === "success" ? "green-500" : "red-500"
                } dark-hover-text-white dark-bg-${
                    response.status === "success" ? "green-800" : "red-800"
                } dark-hover-bg-${
                    response.status === "success" ? "green-700" : "red-700"
                }`}
                aria-label="Close"
                onClick={hideNotification}
            >
                <span className="sr-only">Close</span>
                <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                </svg>
            </button>
        </div>
        </div>
    ) : null;
};

export default Notification;
