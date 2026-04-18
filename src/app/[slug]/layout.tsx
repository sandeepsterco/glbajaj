import PageHeader from "@/src/components/layout/header/PageHeader";

export default async function InnerPageLayout({children}:Readonly<{children:React.ReactNode}>){
    return(
        <div>
            <PageHeader />
            {children}
        </div>
    )
}