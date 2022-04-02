//CONTAINERS
import NavigationFooter from '../container/NavigationFooter'
import SectionContainer from '../container/SectionContainer'
//COMPONENTS
import TopThreeThisWeek from '../components/Homepage/TopThreeThisWeek'
import Discover from '../components/Homepage/Discover';
import Trending from '../components/Homepage/Trending';
import 'swiper/css';
const HomePageView = () => {
    return (
        <div className="relative bg-slate-200">
            <NavigationFooter>
                <div className="pb-20 pt-2 md:pt-5 lg:pt-10">
                    <SectionContainer>
                        <div className="flex flex-col space-y-8 sm:space-y-12 md:space-y-14 lg:space-y-20">
                            <TopThreeThisWeek />
                            <Discover />
                            <Trending />
                        </div>
                    </SectionContainer>
                </div>
            </NavigationFooter>
        </div>
    )
}

export default HomePageView