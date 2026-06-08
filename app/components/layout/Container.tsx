export default function Container({
    children
}: {children: React.ReactNode}) {
    return(
        <div className="mx-4 px-2 md:mx-8 md:px-4 lg:mx-10 lg:px-4">
            {children}
        </div>
    )
}