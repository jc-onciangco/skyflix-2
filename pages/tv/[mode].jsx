//view
import TvPageView from '../../src/views/TvPageView'
import ShowPageView from '../../src/views/ShowPageView'
import { useRouter } from 'next/dist/client/router'
const Mode = () => {
    const router = useRouter()
    const modes = [ 'popular' , 'airing_today' , 'on_the_air' , 'top_rated' ]

    if (modes.includes(router.query.mode)) {
        return (
            <TvPageView />
        )
    }
    else {
        return (
            <ShowPageView />
        )
    }
}

export default Mode