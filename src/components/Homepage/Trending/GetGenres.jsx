//API
import { useGetMovieGenresQuery } from '../../../store/services/movieApi'
import { useGetTvGenresQuery } from '../../../store/services/tvApi'

const getGenres = (show, showGenres) => {
    if (showGenres.data) {
        return show.genre_ids.map(genreId => {
            return showGenres.data.genres.find(genre => genre.id === genreId)
        })
    }
}

const MovieGenres = ({movie}) => {
    const movieGenres = useGetMovieGenresQuery()

    if (movieGenres.isLoading) <div className=""></div>

    const genres = getGenres(movie, movieGenres)

    return <Genres genres={genres} />
}

const TvGenres = ({tv}) => {
    const tvGenres = useGetTvGenresQuery()

    if (tvGenres.isLoading) return <div className=""></div>
    
    const genres =  getGenres(tv, tvGenres)

    return <Genres genres={genres} />
}

const Genres = ({genres}) => {
    return (
    <ul className="genres flex flex-wrap text-[0.8rem] sm:text-[0.7rem] lg:text-[0.75rem] sm:gap-1 lg:gap-2 px-3">
        {
            genres &&
            genres.map(genre => {
                return (
                    <li key={genre.id} className="mr-2 sm:mr-0 sm:bg-yellow-500 text-yellow-500 text-black/50 sm:text-white font-bold sm:font-semibold sm:px-3 sm:py-0.5 sm:rounded-full">
                        {genre.name}
                    </li>
                )
            })
        }
    </ul>
    )
}

export {
    MovieGenres,
    TvGenres
}