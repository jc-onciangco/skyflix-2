import Image from 'next/image'

//Containers/Components
import LinkWrapper from '../../LinkWrapper';
import 'swiper/css';
import Genres from './Genres';

const Slide = ({movie}) => {
    return (
        <div className="w-full relative aspect-[16/6] mx-auto">
            <div className="absolute w-full h-full " style={{zIndex: '12'}}>
                <div className="content absolute flex pb-3 justify-between sm:justify-start items-end sm:items-start sm:flex-col bottom-0 left-2/4 -translate-x-2/4 h-[40%] sm:h-2/4 w-[96%] sm:w-[94%] md:w-11/12">
                    <div className="w-full sm:w-[80%]"> 
                        <div className="movie-title md:py-1 text-white text-[1.30rem] sm:text-2xl md:text-3xl lg:text-4xl font-bold w-full sm:w-3/4 truncate mb-2">
                            {movie.title}
                        </div>
                        <Genres movie={movie} />
                    </div>
                    <LinkWrapper href={`/movie/${movie.id}`}>
                        <button className="view-movie mt-3 md:mt-5 lg:mt-10 bg-yellow-500 hover:contrast-125 transition-all text-slate-100 text-sm md:text-md lg:text-lg font-semibold w-max px-3 py-1 md:px-5 lg:px-7 md:py-2 lg:py-3 rounded-[0.3rem] md:rounded-lg">
                            View
                        </button>
                    </LinkWrapper>
                </div>
            </div>
            <div className="absolute rounded-md md:rounded-xl lg:rounded-3xl top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-600/90 to-blue-500/10" style={{zIndex: '11'}}></div>
            <MovieImage movie={movie} />
        </div>
    )
}

const MovieImage = ({movie}) => {
    return (
        <Image  
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt="Picture of the author"
            layout='fill'
            objectFit='cover'
            objectPosition='10% 40%'
            className="rounded-md md:rounded-xl lg:rounded-3xl"
            placeholder='blur'
            blurDataURL={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            />
    )
}

export default Slide