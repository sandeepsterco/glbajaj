export const TESTIMONIAL_TABS = [
    { label: "Students", slug: "students", apiType: "Student" },
    { label: "Recruiters", slug: "recruiters", apiType: "Recruiter" },
    { label: "Faculties", slug: "faculties", apiType: "Faculties" },
    { label: "Alumni", slug: "alumni", apiType: "Alumni" },
] as const;

export type TestimonialSlug = (typeof TESTIMONIAL_TABS)[number]["slug"];

export const getTestimonialTab = (slug: string) =>
    TESTIMONIAL_TABS.find((t) => t.slug === slug);