import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  LogIn,
  Building2,
  FileUp,
  ScanSearch,
} from "lucide-react";

export const User = [
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
];
export const Company = [
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
];
export const Job = [
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
];
export const Application = [
  {
    title: "Get All Job",
    url: "/application/getalljob",
    icon: Home,
  },
];
