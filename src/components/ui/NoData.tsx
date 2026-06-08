export default function NoData({heading, para}:{heading?:string, para?:string}){
    return (
        <div className="flex flex-col items-center justify-center py-24 px-8 text-center min-h-[360px]">

                <h2 className="text-lg font-medium text-foreground mb-2">{heading ? heading : 'No Data found!'}</h2>
                <p className="text-sm text-muted-foreground max-w-[280px] mb-6 leading-relaxed">
                    {para?para:`This page doesn't have any content yet, or it may have been removed.`}
                </p>
            </div>
    )
}