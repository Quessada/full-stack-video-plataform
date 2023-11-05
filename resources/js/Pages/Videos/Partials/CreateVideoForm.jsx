import FileInput from "@/Components/FileInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";

export default function CreateVideoForm({ className }) {

    const user = usePage().props.auth.user;
    const [categoryOptions, setCategoryOptions] = useState([]);

    const { data, setData, post, errors, processing, progress, recentlySuccessful } =
        useForm({
            title: "",
            description: "",
            privacy: "",
            thumbnail: null,
            file_reference: null,
            user_id: user.id,
            category_id: "",
        });

    const getCategoryOptions = () => {
        axiosClient.get(route('categories.select'))
        .then((response) => {
            setCategoryOptions(response.data);
        });
    }

    const privacyOptions = ["Listed", "Unlisted", "Private"];

    const videoFileTypes = [".MP4", ".MPG", ".AVI", ".WMV", ".MOV"];
    const thumbFileTypes = [".JPG", ".GIF", ".PNG"];

    useEffect(() => {
        getCategoryOptions();
    }, [])

    const submit = (e) => {
        e.preventDefault();

        if (data.category_id == "") {
            data.category_id = document.getElementById("category").value;
        }

        if (data.privacy == "") {
            data.privacy = document.getElementById("privacy").value;
        }
        console.log("DATA = ", data)
        // Make a POST request to the backend with the form data
        post(route('videos.store', data), {
          preserveScroll: true,
          forceFormData: true
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Video</h2>

                <p className="mt-1 text-sm text-gray-600">Create your Video.</p>
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

                    <TextInput
                        id="description"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        required
                        autoComplete="description"
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
                        onChange={(e) => setData('privacy', e.target.value)}
                        required
                        autoComplete="privacy"
                    />

                    <InputError className="mt-2" message={errors.privacy} />
                </div>

                <div>
                    <InputLabel htmlFor="thumbnail" value="Thumbnail" />

                    <FileInput
                        id="thumbnail"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.thumbnail}
                        acceptedTypes={thumbFileTypes}
                        onChange={(e) => setData("thumbnail", e.target.files[0])}
                        required
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
                        required
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
