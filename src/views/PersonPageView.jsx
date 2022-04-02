import NavigationFooter from "../container/NavigationFooter"
import PersonPage from "../components/PersonPage"
const PersonPageView = () => {
    return (
    <div className="relative bg-slate-200">
        <NavigationFooter>
            <div className="pb-20 pt-2 sm:pt-8 md:pt-10 xl:px-5">
                <div className="w-full mx-auto px-2 lg:px-5 xl:max-w-[1320px] xl:px-0">
                    <div className="flex justify-between gap-8">
                        <PersonPage />
                    </div>
                </div>
            </div>
        </NavigationFooter>
    </div>      
    )
}

export default PersonPageView