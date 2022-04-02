const SectionContainer = ({children}) => {
    return (
        <section className="hero-section relative w-full xl:px-5">
            <div className="w-full mx-auto px-2 lg:px-5 xl:max-w-[1320px] xl:px-0">
                {children}
            </div>
        </section>
    )
}

export default SectionContainer