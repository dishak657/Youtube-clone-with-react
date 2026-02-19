import React from "react";

const categories = [
    "All",
    "Music",
    "Gaming",
    "Live",
    "Sports",
    "News",
    "Learning",
    "Fashion",
];

export default function Sidebar() {
    return (
        <div className="hidden md:flex flex-col w-56 p-4 bg-black text-white h-screen sticky top-16">
            {categories.map((category) => (
                <button
                    key={category}
                    className="text-left py-2 px-4 hover:bg-gray-800 rounded-lg text-sm font-medium"
                >
                    {category}
                </button>
            ))}
            <hr className="my-4 border-gray-700" />
            <div className="text-xs text-gray-500 mt-auto">
                &copy; 2025 YouTube Clone
            </div>
        </div>
    );
}
