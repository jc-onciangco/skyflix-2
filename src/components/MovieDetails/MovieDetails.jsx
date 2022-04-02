import ShowPage from "../ShowPage/"
import {useRouter} from 'next/router'
import { useGetMovieDetailsQuery } from "../../store/services/movieApi"
const MovieDetails = () => {
    const router = useRouter()
    const id = router.query.mode
    const movie = useGetMovieDetailsQuery(id)

    return (
        <ShowPage details={movie}/>
    )
}

export default MovieDetails