export const routes = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Services",
    link: "/services",

    subRoutes: [
      {
        name: "Web Development",
        link: "/service/web-development",
      },
      {
        name: "Mobile Development",
        link: "/service/mobile-development",
      },
      {
        name: "UI/UX Design",
        link: "/service/ui-ux-design",
      },
    ],
  },
  {
    name: "Project",
    link: "/Projects",
  },
  {
    name: "Contact",
    link: "/Contact",
  },
];
