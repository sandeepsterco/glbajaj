export interface SlideData {
  id: number;
  image: string; // path to image or placeholder color
  placeholderColor: string; // fallback bg color while image loads
  tag: string;
  heading: string;
  subheading: string;
  cta: { label: string; href: string };
  url: string;
}

export const SLIDES: SlideData[] = [
  {
    id: 1,
    image: "/images/default/banner/banner1.png",
    placeholderColor: "#1a1a1a",
    tag: "Excellence in Education",
    heading: "Recognized. Ranked. Respected",
    subheading:
      "Lorem ipsum dolor sit amet, consectet adipiscing elit.",
    cta: { label: "Explore More", href: "about" },
    url: "about",
  },
  // {
  //   id: 2,
  //   image: "/images/default/banner/banner2.png",
  //   placeholderColor: "#1a1505",
  //   tag: "World-Class Infrastructure",
  //   heading: "Recognized. Ranked. Respected",
  //   subheading:
  //     "State-of-the-art labs, libraries, and learning spaces designed to ignite the spark in every student.",
  //   cta: { label: "View Campus", href: "campus" },
  // },
];

export const NOTIFICATIONS = [
  "International Conference on Next-Generation Communication and Computing",
  "Admissions Open 2025-26 — Apply Now for B.Tech / MBA / MCA",
  "GL Bajaj ranked among Top 100 Engineering Colleges in India",
  "New Research Center for AI & Machine Learning inaugurated",
  "International Conference on Next-Generation Communication and Computing",
];
