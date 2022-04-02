import { useSelector , useDispatch } from "react-redux"
import { useGetDiscoverMoviesQuery } from "../../store/services/movieApi"
import { useGetDiscoverTvsQuery } from "../../store/services/tvApi"
import ShowsGrid from "../ShowsGrid"
import { useRouter } from 'next/dist/client/router'
const DiscoverPage = () => {
    const router = useRouter()
    const {page,isFilterShow} = useSelector(state => state.show)
    const discoverMovies = useGetDiscoverMoviesQuery({ page : router.query.page || page, sortBy: router.query.sort_by, genres: router.query.with_genres })
    const discoverTvs = useGetDiscoverTvsQuery({ page : router.query.page || page, sortBy: router.query.sort_by, genres: router.query.with_genres })
    const shows = router.query.show==='movie'? discoverMovies : discoverTvs
                    
    let totalPages = null

    if (shows.isSuccess) {
        totalPages = shows.data.total_pages
        window.scrollTo(0,0)
    }

    return (
        <div className={`${isFilterShow? 'hidden' : 'block'} w-full`}>
            <ShowsGrid shows={shows} page={page} totalPages={totalPages} showType={"discover"} />
        </div>
    )
}

export default  DiscoverPage