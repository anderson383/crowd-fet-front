import icon from "@/assets/images/header-icon.png";
import logo2 from "@/assets/images/logo-2.png";
import logo from "@/assets/images/logo.png";

export const navItems = [
  {
    id: 1,
    name: "Inicio",
    href: "/",
  },
  {
    id: 2,
    name: "Sobre nosotros",
    href: "/about",
  },
  {
    id: 3,
    name: "Explorar",
    href: "",
    subNavItems: [
      { id: 1, name: "Project 1", href: "/projects-1" },
      { id: 2, name: "Project 2", href: "/projects-2" },
      { id: 3, name: "Single Project", href: "/single-project" },
    ],
  },
  {
    id: 4,
    name: "Pages",
    href: "",
    subNavItems: [
      { id: 1, name: "FAQ", href: "/faq" },
      { id: 2, name: "Gallery", href: "/gallery" },
      { id: 3, name: "Team Members", href: "/team-members" },
    ],
  },
  // {
  //   id: 5,
  //   name: "News",
  //   href: "",
  //   subNavItems: [
  //     { id: 1, name: "News", href: "/news" },
  //     { id: 2, name: "Single News", href: "/single-news" },
  //   ],
  // },
  // {
  //   id: 6,
  //   name: "Contact",
  //   href: "/contact",
  // },
  {
    id: 6,
    name: "Iniciar sesión",
    href: "/auth/login",
  },
  {
    id: 7,
    name: "Registrarse",
    href: "/auth/register",
  },
];

export const socials = [
  {
    id: 1,
    icon: "fa fa-facebook-square",
    href: "#",
  },
  {
    id: 2,
    icon: "fa fa-twitter",
    href: "#",
  },
  {
    id: 3,
    icon: "fa fa-instagram",
    href: "#",
  },
  {
    id: 4,
    icon: "fa fa-dribbble",
    href: "#",
  },
];

const headerData = {
  logo,
  logo2,
  icon,
  navItems,
  email: "crowdFet@crowdfet.com",
  phone: "3203770252",
  address: "Rivera huila",
  socials,
};

export default headerData;
