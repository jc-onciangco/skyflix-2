//API
import { useGetMovieGenresQuery } from '../../../store/services/movieApi'

const Genres = ({movie}) => {
    const movieGenres = useGetMovieGenresQuery()

    if (movieGenres.isLoading) {
        return (
            <div className=""></div>
        )
    }

    const genres = movie.genre_ids.map(genreId => {
        return movieGenres.data.genres.find(genre => genre.id === genreId)
    })
    
    return (
    <ul className="movie-genres flex space-x-1 md:space-x-2 lg:space-x-3 text-[0.6rem] md:text-xs lg:text-sm font-semibold">
        {
            genres.map(genre => {
                return (
                <Genre  key={genre.id} genre={genre} />
                )
            })
        }   
    </ul>
    )
}

const Genre = ({genre}) => {
    return (
        <li className="bg-yellow-500/50 text-white px-2.5 py-[0.20rem] md:px-4 md:py-1 rounded-full backdrop-blur-2xl">
            {genre.name}
        </li>
    )
}

export default Genres