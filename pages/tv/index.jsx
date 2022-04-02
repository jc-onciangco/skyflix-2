//view
import TvPageView from '../../src/views/TvPageView'
import { useRouter } from 'next/dist/client/router'

const Tv = () => {
    const router = useRouter()

    if (router.isReady && router.asPath === '/tv') {
        router.push('/tv/popular?page=1')
    }


    return (
        <TvPageView />
    )
}

export default Tv