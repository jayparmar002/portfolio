import { Link } from "react-router-dom"

const menuItems = [
    { id: 1, path: "/", label: "Home" },
    { id: 2, path: "/about", label: "About Us" },
    { id: 3, path: "/projects", label: "Projects" },
    { id: 4, path: "/services", label: "Services" },
];

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-[999999] text-white">
            <nav className="container mx-auto flex items-center justify-between px-4 py-7">
                {/* Logo */}
                <div className="">
                    <Link to="/">
                        <img src="/src/assets/svg/logo.svg" alt="ATRALICK" className="w-auto h-5" />
                    </Link>
                </div>
                {/* Links */}
                <ul className="flex gap-6">
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <Link to={item.path} className="hover:text-[#2EF943] transition">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}
