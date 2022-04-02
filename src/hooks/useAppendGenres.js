import {useMemo} from 'react'
import appendGenres from '../utils/appendGenres'

const useAppendGenres = (shows, allGenres, showCount) => {
    return useMemo(() => {
        if (shows.isLoading) return

        const tvs = shows.data.results.filter((tv, index) => index < showCount)
        const genres = allGenres.data.genres

        const topThreeTvWithGenres = appendGenres(tvs, genres)

        return topThreeTvWithGenres

    }, [shows.data])
}

export default useAppendGenres