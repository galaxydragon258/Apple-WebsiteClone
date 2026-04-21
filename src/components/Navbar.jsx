
import { navLists } from "../constant/index.js"
const Navbar = () => {
    return (
        <header className="w-full py-5 px-5 sm:px-10 flex justify-between items-center">
            <nav className="flex w-full screen-max-width">
                <img src="/assets/images/apple.svg" alt="Apple" width={14} height={18} />

                <div className="flex flex-1 justify-center  max-sm:hidden">
                    {navLists.map((nav, i) => (
                        <div key={i} className=" px-5 text-sm cursor-pointer text-gray-500 hover:text-white transition-colors duration-300">
                            {nav}
                        </div>
                    ))}
                </div>

                <div className="flex items-baseline gap-7 max-sm:flex-1">
                    <img src="/assets/images/search.svg" alt="Search" width={18} height={18} />
                    <img src="/assets/images/bag.svg" alt="Bag" width={18} height={18} />
                </div>
            </nav>
        </header>
    )
}

export default Navbar