import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";

export default async function NewsEventsLayout({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
  }) {
    const { slug } = await params;
    const parentSlug = "blogs";
    
    if (!parentSlug) return <>{children}</>;

    return children;
}