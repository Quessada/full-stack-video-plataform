export default function FileInput({ className = "", acceptedTypes, value, ...props }) {
    return (
        <input
            {...props}
            type="file"
            accept={acceptedTypes}
            className={
                "block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 " +
                className
            }
        />
    );
}
