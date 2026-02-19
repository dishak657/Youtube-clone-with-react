import { Link, useSearchParams } from "react-router-dom";

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
    const [searchParams] = useSearchParams();
    const currentCategory = searchParams.get("category") || "All";

    return (
        <div className="hidden md:flex flex-col w-56 p-4 bg-black text-white h-screen sticky top-16">
            {/* Navigation Links */}
            <Link
                to="/"
                className="flex items-center gap-3 py-2 px-4 hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span>Home</span>
            </Link>
            
            <Link
                to="/history"
                className="flex items-center gap-3 py-2 px-4 hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span>History</span>
            </Link>

            <hr className="my-4 border-gray-700" />

            {/* Categories */}
            <div className="text-xs text-gray-500 mb-2 px-4 font-semibold uppercase">
                Explore
            </div>
            {categories.map((category) => {
                const isActive = category === currentCategory;
                const url = category === "All" ? "/" : `/?category=${encodeURIComponent(category)}`;
                
                return (
                    <Link
                        key={category}
                        to={url}
                        className={`text-left py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                            isActive
                                ? "bg-gray-800 text-white font-semibold"
                                : "hover:bg-gray-800 text-gray-300"
                        }`}
                    >
                        {category}
                    </Link>
                );
            })}
            
            <hr className="my-4 border-gray-700" />
            <div className="text-xs text-gray-500 mt-auto">
                &copy; 2025 YouTube Clone
            </div>
        </div>
    );
}
