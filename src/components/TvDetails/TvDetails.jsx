import ShowPage from "../ShowPage/"
import {useRouter} from 'next/router'
import { useGetTvDetailsQuery } from "../../store/services/tvApi"
const TvDetails = () => {
    const router = useRouter()
    const id = router.query.mode
    const tv = useGetTvDetailsQuery(id)
    console.log(tv)
    return (
        <ShowPage details={tv}/>
    )
}

export default TvDetails