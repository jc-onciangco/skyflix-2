import { useSelector , useDispatch } from "react-redux"
import { useGetMoviesQuery } from "../../store/services/movieApi"
import ShowsGrid from "../ShowsGrid"
import { useRouter } from 'next/dist/client/router'
const MoviePage = () => {
    const router = useRouter()
    const {page,mode} = useSelector(state => state.show)
    const movies = useGetMoviesQuery({mode: router.query.mode || mode, page : router.query.page || page})
    let totalPages = null

    if (movies.isSuccess) {
        totalPages = movies.data.total_pages
        window.scrollTo(0,0)
    }

    return (
        <ShowsGrid shows={movies} page={page} totalPages={totalPages} showType={"movie"} />
    )
}

export default  MoviePage