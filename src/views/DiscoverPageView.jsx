import NavigationFooter from "../container/NavigationFooter"
import DiscoverPage from "../components/DiscoverPage"
import FilterSection from "../components/FilterSection/"

const DiscoverPageView = () => {
    return (
    <div className="relative bg-slate-200">
        <NavigationFooter>
            <div className="pb-20 pt-2 md:pt-5 lg:pt-10 xl:px-5">
                <div className="w-full mx-auto px-2 lg:px-5 xl:max-w-[1320px] xl:px-0">
                    <div className="flex justify-between gap-8">
                        <FilterSection />
                        <DiscoverPage/>
                    </div>
                </div>
            </div>
        </NavigationFooter>
    </div>
    )
}

export default DiscoverPageView