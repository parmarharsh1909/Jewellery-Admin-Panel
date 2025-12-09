import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Gem,
  ShoppingBag,
  Users,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  List,
  User,
  UserCheck,
  ShoppingCart,
  FileText,
  Grid3X3,
  CirclePlus,
  Edit3,
  Eye,
  Filter,
  Tag,
  Tags,
} from "lucide-react";
import { useState, useEffect } from "react";

// Menu configuration with corrected order and improved structure
const menuConfig = [
  {
    path: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  
  {
    icon: Gem,
    label: "Category",
    subItems: [
      {
        icon: Tag,
        label: "Main Category",
        subItems: [
          { path: "/categories/main/add", label: "Add", icon: Plus },
          { path: "/categories/main/list", label: "Manage", icon: List },
        ],
      },
      {
        icon: Tags,
        label: "Sub Category",
        subItems: [
          { path: "/categories/sub/add", label: "Add", icon: Plus },
          { path: "/categories/sub/list", label: "Manage", icon: List },
        ],
      },
    ],
  },
  {
    icon: Package,
    label: "Products",
    subItems: [
      {
        icon: User,
        label: "Men's Products",
        subItems: [
          { path: "/products/mens/add", label: "Add", icon: Plus },
          { path: "/products/mens/manage", label: "Manage", icon: List },
        ],
      },
      {
        icon: UserCheck,
        label: "Women's Products",
        subItems: [
          { path: "/products/womens/add", label: "Add", icon: Plus },
          { path: "/products/womens/manage", label: "Manage", icon: List },
        ],
      },
    ],
  },
  {
    icon: ShoppingBag,
    label: "Orders",
    subItems: [
      { path: "/orders/manageorder", label: "Manage orders", icon: User },
      // { path: "/orders/womens", label: "Women's", icon: UserCheck },
    ],
  },
  {
    icon: Users,
    label: "Customer",
    subItems: [{ path: "/customers/manage", label: "Manage", icon: User }],
  },
  {
    path: "/payments",
    icon: CreditCard,
    label: "Payments",
  },
  {
    path: "/settings",
    icon: Settings,
    label: "Settings",
  },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  // Generate unique keys for each menu item
  const generateMenuKey = (item, index, parentKey = "") => {
    return parentKey
      ? `${parentKey}-${index}`
      : `${item.label || item.path}-${index}`;
  };

  // Initialize open menus based on current location
  useEffect(() => {
    const initialOpenMenus = {};

    // Recursive function to check if any menu item should be open based on current path
    const checkActiveMenus = (items, parentKey = "") => {
      items.forEach((item, index) => {
        const menuKey = generateMenuKey(item, index, parentKey);

        if (item.subItems) {
          // Check if any sub-item is active
          const isSubActive = item.subItems.some((subItem) => {
            if (subItem.path && location.pathname === subItem.path) return true;
            if (subItem.subItems) {
              return subItem.subItems.some(
                (subSubItem) =>
                  subSubItem.path && location.pathname === subSubItem.path
              );
            }
            return false;
          });

          if (isSubActive) {
            initialOpenMenus[menuKey] = true;
          }

          // Recursively check sub-items
          checkActiveMenus(item.subItems, menuKey);
        }
      });
    };

    checkActiveMenus(menuConfig);
    setOpenMenus(initialOpenMenus);
  }, [location.pathname]);

  const toggleMenu = (menuKey) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isMenuItemActive = (path) => {
    return location.pathname === path;
  };

  // Recursive function to render menu items
  const renderMenuItems = (items, level = 0, parentKey = "") => {
    return items.map((item, index) => {
      const menuKey = generateMenuKey(item, index, parentKey);
      const isOpen = openMenus[menuKey];
      const Icon = item.icon;
      const SubIcon = item.subItems ? (item.subItems[0]?.icon || null) : null;

      // Leaf node (no subItems)
      if (!item.subItems) {
        return (
          <Link
            key={menuKey}
            to={item.path}
            className={`
              flex items-center px-3 py-2 rounded-md transition-all duration-200
              ${
                isMenuItemActive(item.path)
                  ? "bg-gold-500 text-white shadow-sm"
                  : "text-gold-100 hover:bg-gold-700 hover:text-white"
              }
              ${level === 1 ? "text-xs py-1.5 ml-4" : ""}
              ${level >= 2 ? "text-xs py-1 ml-8" : ""}
              w-full
            `}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item.icon ? <item.icon size={16} className="flex-shrink-0" /> : Icon && <Icon size={16} className="flex-shrink-0" />}
            <span className="font-normal truncate ml-2.5 text-sm">{item.label}</span>
          </Link>
        );
      }

      // Parent node (has subItems)
      return (
        <div key={menuKey}>
          <button
            onClick={() => toggleMenu(menuKey)}
            className={`
              flex items-center justify-between w-full px-3 py-2 rounded-md
              transition-all duration-200 text-left
              ${
                isOpen
                  ? "bg-gold-700 text-white"
                  : "text-gold-100 hover:bg-gold-700 hover:text-white"
              }
              w-full text-left
            `}
          >
            <div className="flex items-center">
              {Icon && <Icon size={16} className="flex-shrink-0" />}
              <span className="font-normal truncate ml-2.5 text-xs">{item.label.split(' ')[0]}</span>
            </div>
            <span
              className={`transform transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </button>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="py-0.5 space-y-0.5 border-l-2 border-gold-700 ml-5">
              {renderMenuItems(item.subItems, level + 1, menuKey)}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-3 left-3 z-50 p-1.5 bg-gold-500 text-white rounded-md shadow-md hover:bg-gold-600 transition-all duration-200 text-xs"
      >
        {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64
          bg-gradient-to-b from-gold-900 to-gold-800 text-white
          transform transition-all duration-300 ease-in-out
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          flex flex-col h-screen shadow-xl
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gold-700 flex items-center justify-center">
            <div className="bg-gold-700 p-2 rounded-lg">
              <Gem className="w-7 h-7 text-gold-300" />
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-semibold">HP Jewels</h1>
              <p className="text-xs text-gold-300 mt-1">Admin Dashboard</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 overflow-y-auto">
            {/* Render all menu items recursively */}
            <div className="space-y-1">{renderMenuItems(menuConfig)}</div>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gold-700">
            <button
              onClick={handleLogout}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full
                       text-gold-100 hover:bg-red-600 transition-all duration-200`}
            >
              <LogOut size={16} className="flex-shrink-0" />
              <span className="font-normal text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}