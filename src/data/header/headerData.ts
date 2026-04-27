export const NAV_ITEMS = [
  { label: "About Us", href: "about" },
  { label: "Courses & Admission", href: "courses" },
  {
    label: "Academics",
    href: "#",
    subMenus: {
      leftMenus: [
        {
          title: "Programs",
          menus: [
            {
              label: "Undergraduate",
              href: "#",
            },
            {
              label: "Postgraduate",
              href: "#",
            },
          ],
        },
        {
          title: "Departments",
          menus: [
            {
              label: "Civil Engineering",
              href: "#",
            },
            {
              label: "Computer Science and Engineering",
              href: "#",
            },
            {
              label: "Computer Science and Engineering (AI)",
              href: "#",
            },
          ],
        },
      ],
      rightMenus: [
        {
          title: "",
          menus: [
            {
              label: "Teaching Practices & Pedagogy",
              href: "#",
            },
            {
              label: "Our Leadership Team",
              href: "#",
            },
          ],
        },
      ],
    },
  },
  { label: "Departments", href: "departments" },
  { label: "Training & Placement", href: "placement" },
  { label: "Research", href: "research" },
] ;


export const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: "/images/icons/social/facebook-white.svg",
  },
  {
    label: "X / Twitter",
    href: "https://x.com",
    icon: "/images/icons/social/x-white.svg",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: "/images/icons/social/youtube-white.svg",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: "/images/icons/social/insta-white.svg",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: "/images/icons/social/linkedin-white.svg",
  },
] as const;


export const HappeningsTabs = {
  "tab_title": "Happenings",
  "tabs": [
      {
          "slug": "news-events",
          "title": "News & Events"
      },
      {
        "slug": "media-coverage",
        "title": "Media Coverage"
      },
      {
          "slug": "notices-announcements",
          "title": "Notices & Announcements"
      },
      {
        "slug": "gallery",
        "title": "Gallery"
      }
  ]
}

export const FacultyTabs = {
  "tab_title": "Academics",
  "tabs": [
      {
          "slug": "news-events",
          "title": "News & Events"
      },
      {
        "slug": "media-coverage",
        "title": "Media Coverage"
      },
      {
          "slug": "notices-announcements",
          "title": "Notices & Announcements"
      },
      {
        "slug": "gallery",
        "title": "Gallery"
      },
      {
        "slug": "faculty",
        "title": "Faculty"
      }
  ]
}