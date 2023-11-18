export default function FileInput({
    className = "",
    imagePath = null,
    ...props
}) {
    const source = imagePath || "~/storage/app/public/default.png";

    return (
        <img
            {...props}
            className={"h-auto max-w-xs " + className}
            src={imagePath}
            alt="image description"
        />
    );
}
