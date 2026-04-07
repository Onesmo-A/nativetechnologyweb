import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Services",
    path: "/services",
    newTab: false,
    submenu: [
      {
        id: 21,
        title: "WEB SOLUTIONS",
        path: "/services#web-solutions",
        newTab: false,
        submenu: [
          {
            id: 211,
            title: "Mobile App Development",
            path: "/services#service-mobile-app-development",
            newTab: false,
          },
          {
            id: 212,
            title: "Web Development",
            path: "/services#service-web-development",
            newTab: false,
          },
        ],
      },
      {
        id: 22,
        title: "DIGITAL MARKETING",
        path: "/services#digital-marketing",
        newTab: false,
        submenu: [
          {
            id: 221,
            title: "Search Optimization (SEO)",
            path: "/services#service-search-optimization-seo",
            newTab: false,
          },
          {
            id: 222,
            title: "Social Media Managing",
            path: "/services#service-social-media-managing",
            newTab: false,
          },
          {
            id: 223,
            title: "Social Media Advertising",
            path: "/services#service-social-media-advertising",
            newTab: false,
          },
          {
            id: 224,
            title: "Social Media Marketing",
            path: "/services#service-social-media-marketing",
            newTab: false,
          },
        ],
      },
      {
        id: 23,
        title: "CORPORATE SERVICES",
        path: "/services#corporate-services",
        newTab: false,
        submenu: [
          {
            id: 231,
            title: "Corporate Branding",
            path: "/services#service-corporate-branding",
            newTab: false,
          },
          {
            id: 232,
            title: "Corporate Training",
            path: "/services#service-corporate-training",
            newTab: false,
          },
          {
            id: 233,
            title: "ICT Hardware Supply",
            path: "/services#service-ict-hardware-supply",
            newTab: false,
          },
          {
            id: 234,
            title: "Enterprise Applications",
            path: "/services#service-enterprise-applications",
            newTab: false,
          },
          {
            id: 235,
            title: "CCTV Camera Installation",
            path: "/services#service-cctv-camera-installation",
            newTab: false,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Works",
    path: "/works",
    newTab: false,
  },
  {
    id: 4,
    title: "About",
    path: "/about",
    newTab: false,
  },
  {
    id: 5,
    title: "Blog",
    path: "/blog",
    newTab: false,
  },
  {
    id: 6,
    title: "Contact",
    path: "/contact",
    newTab: false,
  },
];
export default menuData;
