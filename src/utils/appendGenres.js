const appendGenres = (movies, genres) => {
    return movies.map(movie => {
                        return {
                            ...movie,
                            genre_ids: movie.genre_ids.map(genreId => {
                                return genres.find(genre => genre.id === genreId)
                            })
                        }
                    })
}

export default appendGenres