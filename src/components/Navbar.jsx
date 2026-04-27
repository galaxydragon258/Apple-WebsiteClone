import { navLists } from "../constant/index.js";

const Navbar = () => {
    return (
        <header className="w-full py-5 px-5 sm:px-10 flex justify-center">
            <nav className="w-full max-w-7xl flex items-center justify-between">
                <img
                    src="/assets/images/apple.svg"
                    alt="Apple"
                    className="w-6 h-6 "
                />
                <div className="hidden sm:flex gap-8 text-sm text-gray-400">
                    {navLists.map((nav, i) => (
                        <div
                            key={i}
                            className="cursor-pointer hover:text-white transition"
                        >
                            {nav}
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-6">
                    <img
                        src="/assets/images/search.svg"
                        alt="Search"
                        className="w-4 h-4 cursor-pointer"
                    />
                    <img
                        src="/assets/images/bag.svg"
                        alt="Bag"
                        className="w-4 h-4 cursor-pointer"
                    />
                </div>

            </nav>
        </header>
    );
};

export default Navbar;