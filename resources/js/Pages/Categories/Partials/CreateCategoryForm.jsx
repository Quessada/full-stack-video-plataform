import DescriptionInput from "@/Components/DescriptionInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm, usePage } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

// import { useState } from "react/cjs/react.production.min";
// import { useEffect } from "react/cjs/react.production.min";

export default function CreateCategoryForm({ className }) {
    const user = usePage().props.auth.user;

    const [descriptionCharacters, setDescriptionCharacters] = useState(0);

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: "",
            description: "",
            user_id: user.id,
        });

    const submit = (e) => {
        e.preventDefault();

        post(route("categories.store", data), {
            preserveScroll: true,
        });
    };

    useEffect(() => {
        setDescriptionCharacters(data.description.length);
    }, [data.description]);

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Category</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Create your category.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="description" value="Description" />

                    <DescriptionInput
                        id="description"
                        className="mt-1 block w-full"
                        rows={5}
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        required
                        autoComplete="description"
                    />

                    <InputLabel
                        className="pt-2"
                        htmlFor="description"
                        value={"Characters = " + descriptionCharacters}
                    />

                    <InputError className="mt-2" message={errors.description} />
                    <InputError className="mt-2" message={errors.user_id} />
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
            </form>
        </section>
    );
}
