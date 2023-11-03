import Link from "./Link";

function SideNav() {
  const items = [
    { label: "Home", icon: "home", href: "/" },
    { label: "Table", icon: "user", href: "/table" },
    { label: "Lesson", icon: "envelope", href: "/lesson" },
    { label: "Projects", icon: "folder-open", href: "/projects" },
  ];

  const renderedItems = items.map((item, index) => {
    return (
      <Link
        key={index}
        to={item.href}
        activeClassName={"bg-gray-200 font-bold"}
        className="mb-1 flex flex-row items-center p-2 rounded-lg hover:bg-gray-200 content-center font-semibold">{item.label}</Link>
    );
  });

  return (
    <div className="fixed top-10  w-32 z-10 flex flex-col ml-1 p-1 border-r-2 h-screen  bg-slate-50">
      <div className="ml-1">
        {renderedItems}
      </div>
    </div>
  );
}

export default SideNav;