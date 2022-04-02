import MoviePageView from '../../src/views/MoviePageView'
import ShowPageView from '../../src/views/ShowPageView'
import { useRouter } from 'next/dist/client/router'
const Mode = () => {
    const router = useRouter()
    const modes = [ 'popular' , 'now_playing' , 'upcoming' , 'top_rated' ]

    if (modes.includes(router.query.mode)) {
        return (
            <MoviePageView />
        )
    }
    else {
        return (
            <ShowPageView />
        )
    }
    
}

export default Mode