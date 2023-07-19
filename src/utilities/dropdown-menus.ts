interface QuickLinks {
  id: number;
  name: string;
  link: string;
  icon: string;
  color: string;
}

const quickLinks: QuickLinks[] = [
  {
    id: 0,
    name: "Home",
    link: "/",
    icon: "bx bx-home-smile",
    color: "text-gray-700",
  },
  {
    id: 1,
    name: "Profile",
    link: "/profile",
    icon: "bx bx-user-circle",
    color: "text-gray-700",
  },
  {
    id: 2,
    name: "Settings",
    link: "/",
    icon: "bx bx-cog",
    color: "text-gray-700",
  },
  {
    id: 4,
    name: "Hero Courses",
    link: "/",
    icon: "bx bxs-star text-[#ffbb37]",
    color: "text-gray-700",
  },
  {
    id: 5,
    name: "About",
    link: "/",
    icon: "bx bx-info-circle",
    color: "text-gray-700",
  },
  {
    id: 5,
    name: "Support",
    link: "/",
    icon: "bx bx-support",
    color: "text-gray-700",
  },
];

export { quickLinks };
