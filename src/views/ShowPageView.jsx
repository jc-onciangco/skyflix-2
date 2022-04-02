import NavigationFooter from "../container/NavigationFooter"
import MovieDetails from "../components/MovieDetails";
import TvDetails from "../components/TvDetails";
import Modal from "../components/ShowPage/Modal";
import { useSelector } from "react-redux";
import {useRouter} from 'next/router'
const ShowPageView = () => {
    const router = useRouter()
    const {isModalShow} = useSelector(state => state.show)
    const pathname = router.pathname.split('/')[1]
    console.log(pathname)
    return (
    <div className="relative bg-slate-200">
        {
            isModalShow &&  <Modal /> 
        }
        <NavigationFooter>
            <div className="pt-2 sm:pt-8 md:pt-10 xl:px-5">
                <div className="w-full mx-auto px-2 lg:px-5 xl:max-w-[1320px] xl:px-0">
                    {
                        pathname==="movie"? <MovieDetails /> : <TvDetails />
                    }
                </div>
            </div>
        </NavigationFooter>
    </div>      
    )
}

export default ShowPageView