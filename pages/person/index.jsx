//view
import PersonPageView from '../../src/views/PersonPageView'
import { useRouter } from 'next/dist/client/router'
const Person = () => {
    const router = useRouter()

    if (router.isReady && router.asPath === '/person') {
        router.push('/person?page=1')
    }

    return (
        <PersonPageView />
    )
}

export default Person