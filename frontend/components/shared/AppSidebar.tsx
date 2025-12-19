import Link from "next/link";
import { LogIn, Home, Building2, FileUp, ScanSearch } from "lucide-react";

// Menu items data
const menuItems = {
  company: {
    label: "Company",
    items: [
      {
        title: "Company Register",
        url: "/company/register",
        icon: Building2,
      },
      {
        title: "Get Company",
        url: "/company/getcompany",
        icon: Building2,
      },
      {
        title: "Update Company",
        url: "/company/update",
        icon: Building2,
      },
    ],
  },
  job: {
    label: "Job",
    items: [
      {
        title: "Upload Job",
        url: "/job/upload",
        icon: FileUp,
      },
      {
        title: "Get All Jobs",
        url: "/job/getalljobs",
        icon: ScanSearch,
      },
      {
        title: "Job Created",
        url: "/job/getadmincreatedjob",
        icon: Home,
      },
    ],
  },
  application: {
    label: "Application",
    items: [
      {
        title: "Get All Job",
        url: "/application/getalljob",
        icon: Home,
      },
    ],
  },
  user: {
    label: "User Creation",
    items: [
      {
        title: "User SignIn",
        url: "/user/signin",
        icon: LogIn,
      },
      {
        title: "User Login",
        url: "/user/login",
        icon: LogIn,
      },
      {
        title: "Update Profile",
        url: "/user/update",
        icon: Home,
      },
    ],
  },
};

export function AppSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-800">
            Microservices Module
          </h1>
        </div>

        {/* Navigation Content */}
        <nav className="flex-1 px-4 space-y-6">
          {Object.entries(menuItems).map(([key, section]) => (
            <div key={key} className="space-y-2 border-b">
              <h2 className="px-3 text-lg font-medium text-gray-700">
                {section.label}
              </h2>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    className="
                      flex items-center gap-3 px-3 py-2
                      text-gray-600 rounded-lg
                      hover:bg-gray-100 hover:text-gray-900
                      transition-colors duration-150 ease-in-out
                      group
                    ">
                    <item.icon className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="px-3 py-2">
            <p className="text-xs text-gray-500">© 2025 Admin Panel v1.0</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
