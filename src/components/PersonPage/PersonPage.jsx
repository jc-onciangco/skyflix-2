import { useSelector , useDispatch } from "react-redux"
import { useGetPersonsQuery } from "../../store/services/movieApi"
import ShowsGrid from "../ShowsGrid"
import { useRouter } from 'next/dist/client/router'
const MoviePage = () => {
    const router = useRouter()
    const {page} = useSelector(state => state.show)
    const persons = useGetPersonsQuery({page: router.query.page || page})
    let totalPages = null

    if (persons.isSuccess) {
        totalPages = persons.data.total_pages
        window.scrollTo(0,0)
    }

    return (
        <ShowsGrid shows={persons} page={page} totalPages={totalPages} showType={"person"} />
    )
}

export default  MoviePage