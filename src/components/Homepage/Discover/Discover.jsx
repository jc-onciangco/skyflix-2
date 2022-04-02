import {useMemo} from 'react'
import Image from 'next/image'

//Containers/Components
import LinkWrapper from '../../LinkWrapper';
import LoadingIcon from '../../LoadingIcon';
import HomepageSectionContainer from '../../../container/HomapageSectionContainer';

//API
import { useGetDiscoverMoviesQuery , useGetMovieGenresQuery } from '../../../store/services/movieApi'

//CUSTOM HOOKS
import useAppendGenres from '../../../hooks/useAppendGenres';


const Discover = () => {
    const movieGenres = useGetMovieGenresQuery()
    const discoverMovies = useGetDiscoverMoviesQuery({ page : 1})

    const threeDiscoverMovies = useAppendGenres(discoverMovies, movieGenres,3)

    return (
        <HomepageSectionContainer>
            <div className="title uppercase font-bold text-slate-700 mb-5 py-2 md:py-3 lg:py-5 text-lg md:text-2xl lg:text-3xl">
                discover
            </div>
            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 lg:space-x-8">
                {
                    discoverMovies.isLoading?
                    <div className="loader w-full flex justify-center">
                        <LoadingIcon />
                    </div> :
                    threeDiscoverMovies.map(movie => {
                        return (
                            <Movie key={movie.id} movie={movie}/>
                        )
                    })
                }
            </div>
        </HomepageSectionContainer>
    )
}


const Movie = ({movie}) => {
    return (
        <div className="relative w-full aspect-video md:flex-1 md:aspect-[1/1.4] xl:aspect-[1/1.2] overflow-hidden rounded-md md:rounded-lg lg:rounded-xl shadow-xl">
            <div className="absolute w-full h-full" style={{zIndex: '12'}}>
                <div className="absolute flex justify-between items-center bottom-0 w-full h-[30%] md:h-[20%] bg-black/20 backdrop-blur-xl content">
                    <div className="title-genres pl-5 w-[75%]">
                        <LinkWrapper href={`/movie/${movie.id}`}>
                            <div className="title truncate text-lg xl:text-xl font-bold capitalize text-white cursor-pointer lg:hover:text-yellow-100 transition-all">
                                {movie.title}
                            </div>
                        </LinkWrapper>
                        <Genres movie={movie}/>
                    </div>
                    <div className="h-full shrink-0 flex items-center">
                        <div className="w-[2px] h-5/6 bg-white/80"></div>
                        <div className="rate flex gap-2 items-center justify-center aspect-square h-full text-yellow-500 font-bold">
                            <Star /> 4.3
                        </div>
                    </div>
                </div>
            </div> 
            <Poster poster_path={movie.poster_path} />
        </div> 
    )
}

const Genres = ({movie}) => {
    return (
    <div className="genres text-xs sm:text-sm md:text-xs lg:text-sm font-bold text-zinc-300">
        {
            movie.genre_ids.filter((movie, index) => index < 2)
                            .map((genre, index) => {
                                if (index ===  0) {
                                    return `${genre.name} / `
                                }

                                return genre.name
                            })
        }
    </div>
    )
}

const Star = () => {
    return (
        <svg className="h-5 aspect-square" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32.2537 14.3477C32.6254 14.0708 32.9011 13.6845 33.0422 13.2431C33.1832 12.8016 33.1826 12.327 33.0403 11.886C32.8981 11.4449 32.6214 11.0594 32.249 10.7835C31.8765 10.5076 31.4271 10.3552 30.9637 10.3477L21.9637 10.0077C21.9195 10.0046 21.8771 9.98881 21.8416 9.9622C21.8061 9.93558 21.7791 9.89928 21.7637 9.85765L18.6537 1.45765C18.4975 1.03029 18.2137 0.661269 17.8408 0.400548C17.4678 0.139826 17.0238 0 16.5687 0C16.1137 0 15.6697 0.139826 15.2967 0.400548C14.9238 0.661269 14.64 1.03029 14.4837 1.45765L11.3837 9.88765C11.3684 9.92928 11.3414 9.96558 11.3059 9.9922C11.2704 10.0188 11.228 10.0346 11.1837 10.0377L2.18375 10.3777C1.72035 10.3852 1.27095 10.5376 0.898541 10.8135C0.526136 11.0894 0.249407 11.4749 0.107157 11.916C-0.035093 12.357 -0.0357313 12.8316 0.105332 13.2731C0.246395 13.7145 0.522086 14.1008 0.893747 14.3777L7.95375 19.9277C7.98908 19.9555 8.01549 19.993 8.02971 20.0357C8.04393 20.0783 8.04533 20.1242 8.03375 20.1677L5.60375 28.7777C5.47783 29.2161 5.49002 29.6827 5.63869 30.1139C5.78735 30.5452 6.06525 30.9202 6.4346 31.1879C6.80394 31.4556 7.24679 31.6031 7.7029 31.6102C8.15901 31.6173 8.60624 31.4837 8.98375 31.2277L16.4437 26.2277C16.4805 26.2023 16.5241 26.1887 16.5687 26.1887C16.6134 26.1887 16.657 26.2023 16.6937 26.2277L24.1537 31.2277C24.5261 31.4925 24.9718 31.6348 25.4287 31.6348C25.8857 31.6348 26.3313 31.4925 26.7037 31.2277C27.0732 30.9625 27.3514 30.5893 27.5 30.1595C27.6486 29.7297 27.6604 29.2644 27.5337 28.8277L25.0837 20.1877C25.0708 20.1443 25.0715 20.098 25.0858 20.055C25.1001 20.0121 25.1273 19.9746 25.1637 19.9477L32.2537 14.3477Z" fill="#EAB308"/>
        </svg>
    )
}

const Poster = ({poster_path}) => {
    return (
        <Image  
        src={`https://image.tmdb.org/t/p/original${poster_path}`}
        alt="Picture of the author"
        layout='fill'
        objectFit='cover'
        objectPosition='10% 40%'
        className="rounded-md md:rounded-lg lg:rounded-xl"
        placeholder='blur'
        blurDataURL={`https://image.tmdb.org/t/p/w500${poster_path}`}
        />
    )
}


export default Discover