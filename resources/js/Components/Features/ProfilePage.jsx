import React, { useState } from "react";
import { FaEdit, FaEye, FaSave, FaTimes, FaCamera } from "react-icons/fa";
import { Link, useForm, usePage } from "@inertiajs/react";
import LogoutPopUp from "../Partials/LogoutPopUp";
import { IoLogOutOutline } from "react-icons/io5";

export default function ProfilePage() {
    const user = usePage().props.auth.user;

    const { data, post, setData, patch, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
        });

    const [isEditing, setIsEditing] = useState(false);

    const [profilePhoto, setProfilePhoto] = useState(null);
    // const [profileData, setProfileData] = useState(user);

    // const user = {
    //     username: "david",
    //     name: "David Nababan",
    //     email: "david@gmail.com",
    //     phone: "+628XXXXXXXX",
    //     address: "Jl. Terus No.123, Kota ABC, Provinsi XYZ",
    // };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleViewClick = () => {
        setIsEditing(false);
    };

    const handleSaveClick = (e) => {
        e.preventDefault();
        patch(route("profile.update"), {
            onSuccess: () => {
                console.log("Profile updated successfully.");
            },
            onError: (errors) => {
                console.error("Errors:", errors);
            },
        });
        setIsEditing(false);
        console.log("Profile saved:", data);
    };

    // const handleUpdate = (e) => {
    //     e.preventDefault();
    //     patch(route("profile.update"));
    // };

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setProfileData({ ...data, [name]: value });
    //     e.preventDefault();
    //     patch(route("profile.update"));
    // };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogout = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const sureLogout = () => {
        post(route("logout"));
        closeModal();
        // ini nanti sesuaikan kalo logout gmnh ia backend
    };

    // const submit = (e) => {
    //     e.preventDefault();
    //     patch(route("profile.update"));
    // };

    // const labels = {
    //     username: "username",
    //     name: "name",
    //     email: "email",
    //     phone: "phone",
    //     address: "address",
    // };

    return (
        <div className="flex min-h-screen bg-gray-50 font-poppins">
            {/* Sidebar */}
            <aside className="w-1/4 bg-white p-6 border-r border-gray-300">
                <div className="text-center mb-8">
                    <h3 className="text-sm font-semibold mb-4 text-gray-700">
                        Akun Saya
                    </h3>
                    <div className="relative w-16 h-16 bg-gray-300 rounded-full mx-auto flex items-center justify-center">
                        {profilePhoto ? (
                            <img
                                src={profilePhoto}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-10 h-10 text-gray-500"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        )}
                        {isEditing && (
                            <label className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full cursor-pointer">
                                <FaCamera className="text-white" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>
                    <h2 className="text-base font-semibold mt-3 text-gray-700">
                        Hi, {data.name}!
                    </h2>
                    <button
                        onClick={isEditing ? handleViewClick : handleEditClick}
                        className="text-blue-500 underline"
                    >
                        {isEditing ? (
                            <>
                                <FaEye className="inline" /> Lihat Profil
                            </>
                        ) : (
                            <>
                                <FaEdit className="inline" /> Edit Profil
                            </>
                        )}
                    </button>
                    <div>
                        <button
                            className="mt-2 rounded-full bg-teal-500 text-white text-sm hover:bg-teal-700 px-4 py-1"
                            onClick={handleLogout}
                        >
                            Log Out
                            <IoLogOutOutline className="inline ml-2" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 ">
                <form
                    className="form-container mx-auto border border-blue-500 p-6 bg-white rounded-lg shadow-md max-w-4xl "
                    onSubmit={handleSaveClick}
                >
                    {isEditing ? (
                        <>
                            <h1 className="text-xl font-semibold mb-4">
                                Edit Profil
                            </h1>

                            {/* Input Fields for Profile */}
                            {/* {Object.keys(data).map((key) => (
                                <div className="mb-4" key={key}>
                                    <label className="block text-xs font-medium">
                                        {labels[key]}
                                    </label>
                                    <input
                                        type="text"
                                        name={key}
                                        value={data[key]}
                                        onChange={(e) =>
                                            setData(labels[key], e.target.value)
                                        }
                                        className="input-field mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        placeholder={labels[key]}
                                    />
                                </div>
                            ))} */}

                            <label className="block text-xs font-medium">
                                username
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="input-field mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
                                placeholder={"username"}
                            />

                            <label className="block text-xs font-medium">
                                name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="input-field mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
                                placeholder={"name"}
                            />

                            <label className="block text-xs font-medium">
                                email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="input-field mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
                                placeholder={"email"}
                            />

                            <label className="block text-xs font-medium">
                                phone
                            </label>
                            <input
                                id="phone"
                                type="text"
                                name="phone"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                className="input-field mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
                                placeholder={"phone"}
                            />

                            <label className="block text-xs font-medium">
                                address
                            </label>
                            <input
                                id="address"
                                type="text"
                                name="address"
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                className="input-field mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
                                placeholder={"address"}
                            />

                            {/* Buttons */}
                            <div className="flex justify-between items-center mt-4">
                                <button
                                    onClick={handleViewClick}
                                    className="btn bg-gray-500 text-white hover:bg-gray-600 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                                >
                                    <FaTimes className="inline" /> Batal
                                </button>
                                <button
                                    onClick={handleSaveClick}
                                    className="btn bg-green-500 text-white hover:bg-green-600 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    disabled={processing}
                                >
                                    <FaSave className="inline" /> Simpan
                                    Perubahan
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className="text-xl font-semibold mb-4">
                                Profil
                            </h1>
                            {/* {Object.keys(data).map((key) => (
                                <div className="mb-4" key={key}>
                                    <label className="block text-xs font-medium">
                                        {labels[key]}
                                    </label>
                                    <p>{data[key]}</p>
                                </div>
                            ))} */}
                            <div className="mb-4">
                                <label className="block text-xs font-medium">
                                    {"username"}
                                </label>
                                <p>{data.name}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-xs font-medium">
                                    {"name"}
                                </label>
                                <p>{data.name}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-xs font-medium">
                                    {"email"}
                                </label>
                                <p>{data.email}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-xs font-medium">
                                    {"phone"}
                                </label>
                                <p>{data.phone}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-xs font-medium">
                                    {"address"}
                                </label>
                                <p>{data.address}</p>
                            </div>
                        </>
                    )}
                </form>

                {isModalOpen && (
                    <LogoutPopUp
                        message="Apakah Anda yakin?"
                        onClose={closeModal}
                        onOut={sureLogout}
                    />
                )}
            </main>
        </div>
    );
}
