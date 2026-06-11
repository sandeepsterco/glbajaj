export default function ApiError({ heading, para }: { heading?: string, para?: string }) {
    return (
        <div className="placement_state_wrapper placement_error_state">
            <div className="container25">
                <h3 className="placement_state_title">{heading ? heading : 'Unable to Load Data'}</h3>
                <p className="placement_state_subtitle">
                    {para ? para : 'Something went wrong while fetching data. Please refresh the page or try again later.'}
                </p>
            </div>
        </div>
    )
}