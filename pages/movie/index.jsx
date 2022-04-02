//view
import MoviePageView from '../../src/views/MoviePageView'
import { useRouter } from 'next/dist/client/router'
const Movie = () => {
    const router = useRouter()

    if (router.isReady && router.asPath === '/movie') {
        router.push('/movie/popular?page=1')
    }

    return (
        <MoviePageView />
    )
}

export default Movie