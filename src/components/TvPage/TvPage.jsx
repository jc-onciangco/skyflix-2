import { useSelector } from "react-redux"
import { useGetTvsQuery } from "../../store/services/tvApi"
import ShowsGrid from "../ShowsGrid"
import { useRouter } from "next/router"
const TvPage = () => {
    const router = useRouter()
    const {page,mode} = useSelector(state => state.show)
    const tvs = useGetTvsQuery({mode: router.query.mode || mode, page : router.query.page || page})
    let totalPages = null

    if (tvs.isSuccess) {
        totalPages = tvs.data.total_pages
        window.scrollTo(0,0)
    }

    return (
        <ShowsGrid shows={tvs} page={page} totalPages={totalPages} showType={"tv"}/>
    )
}

export default  TvPage