import FileInput from "@/Components/FileInput";
import ImagePreview from "@/Components/ImagePreview";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import axiosClient from "@/axios-client";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function UpdateVideoForm({ video, className }) {
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [resetKey, setResetKey] = useState(0);
    const [isThumbUpdated, setIsThumbUpdated] = useState(false);
    const [isFileUpdated, setIsFileUpdated] = useState(false);

    const {
        data,
        setData,
        post,
        errors,
        processing,
        progress,
        recentlySuccessful,
    } = useForm({
        title: video.title,
        description: video.description,
        privacy: video.privacy,
        thumbnail: video.thumbnail,
        file_reference: video.file_reference,
        user_id: video.user_id,
        category_id: video.category_id,
        isFileUpdated: isFileUpdated,
        isThumbUpdated: isThumbUpdated,
    });
    const [imagePath, setImagePath] = useState(data.thumbnail);

    const privacyOptions = ["Listed", "Unlisted", "Private"];
    const videoFileTypes = [".MP4", ".MPG", ".AVI", ".WMV", ".MOV"];
    const thumbFileTypes = [".JPG", ".GIF", ".PNG"];

    //Get the category options for the select
    const getCategoryOptions = () => {
        axiosClient.get(route("categories.select")).then((response) => {
            setCategoryOptions(response.data);
        });
    };

    //Remove preview image/thumbnail image on "X" Click
    const removeImage = (e) => {
        e.preventDefault();
        setData("thumbnail", "");
        setImagePath("");
        setIsThumbUpdated(true);
        setData("isThumbUpdated", isThumbUpdated);
        console.log("SET IS THUMB UPDATED", isThumbUpdated, data);

        setResetKey((prevKey) => prevKey + 1);
    };

    //Trigger the get category options
    useEffect(() => {
        getCategoryOptions();
    }, []);

    //Generate the image preview if the thumbnail inputFile changes
    const thumbnailChange = (e) => {
        const file = e.target.files[0];
        setData("thumbnail", file);
        setIsThumbUpdated(true);
        setData("isThumbUpdated", isThumbUpdated);
        console.log("SET IS THUMB UPDATED", isThumbUpdated, data);

        const reader = new FileReader();

        reader.onload = (e) => {
            const previewImageUrl = e.target.result;
            setImagePath(previewImageUrl);
        };

        reader.readAsDataURL(file);
    };

    const submit = (e) => {
        e.preventDefault();

        if (data.category_id == "") {
            data.category_id = document.getElementById("category").value;
        }

        if (data.privacy == "") {
            data.privacy = document.getElementById("privacy").value;
        }

        // if(video.thumbnail == "") {
        //     video.thumbnail = "empty-thumbnail.jpg"
        // }
        console.log("Video before post == ", video);
        console.log("Data before post == ", data);

        // Make a PATCH request to the backend with the form data to update the video
        post(route("videos.update", [video.id, { _method: "PATCH" }]), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Video</h2>

                <p className="mt-1 text-sm text-gray-600">Update your Video.</p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="title" value="Title" />

                    <TextInput
                        id="title"
                        className="mt-1 block w-full"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        required
                        isFocused
                        autoComplete="title"
                    />

                    <InputError className="mt-2" message={errors.title} />
                </div>

                <div>
                    <InputLabel htmlFor="description" value="Description" />

                    <ReactQuill
                        theme="snow"
                        value={data.description}
                        onChange={(e) => setData("description", e)}
                    />

                    <InputError className="mt-2" message={errors.description} />
                </div>

                <div>
                    <InputLabel htmlFor="category" value="Category" />

                    <SelectInput
                        id="category"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.category_id}
                        options={categoryOptions}
                        onChange={(e) => setData("category_id", e.target.value)}
                        required
                        autoComplete="category_id"
                    />

                    <InputError className="mt-2" message={errors.category_id} />
                </div>

                <div>
                    <InputLabel htmlFor="privacy" value="Privacy" />

                    <SelectInput
                        id="privacy"
                        type="text"
                        className="mt-1 block w-full"
                        options={privacyOptions}
                        value={data.privacy}
                        onChange={(e) => setData("privacy", e.target.value)}
                        required
                        autoComplete="privacy"
                    />

                    <InputError className="mt-2" message={errors.privacy} />
                </div>

                <div>
                    <InputLabel htmlFor="thumbnail" value="Thumbnail" />

                    {imagePath && (
                        <div className="relative block">
                            <span
                                className="z-10 border-solid border-1 border-slate-600 bg-slate-400 w-7 cursor-pointer rounded-full p-1 text-white absolute top-0 right-0"
                                onClick={(e) => removeImage(e)}
                            >
                                X
                            </span>

                            <ImagePreview
                                imagePath={imagePath}
                                className="backdrop-grayscale-0"
                            />
                        </div>
                    )}

                    <FileInput
                        id="thumbnail"
                        type="text"
                        key={resetKey}
                        className="mt-1 block w-full"
                        value={data.thumbnail}
                        acceptedTypes={thumbFileTypes}
                        // onChange={(e) =>
                        //     setData("thumbnail", e.target.files[0])
                        // }
                        onChange={(e) => thumbnailChange(e)}
                        autoComplete="thumbnail"
                    />

                    <InputError className="mt-2" message={errors.thumbnail} />
                </div>

                <div>
                    <InputLabel
                        htmlFor="file_reference"
                        value="File_reference"
                    />

                    <FileInput
                        id="file_reference"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.file_reference}
                        acceptedTypes={videoFileTypes}
                        onChange={(e) =>
                            setData("file_reference", e.target.files[0])
                        }
                        autoComplete="file_reference"
                    />

                    {progress && (
                        <progress value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                    )}

                    <InputError
                        className="mt-2"
                        message={errors.file_reference}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>

                <InputError className="mt-2" message={errors.user_id} />
            </form>
        </section>
    );
}
