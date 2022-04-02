import { useSelector } from 'react-redux';
import Image from 'next/image'
//Containers/Components
import LoadingIcon from '../../LoadingIcon';
import { Swiper , SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { MovieGenres , TvGenres } from './GetGenres';
import Link from 'next/link'

const SlideSection = ({trendingShows, title}) => {
    const currentWidth = useSelector(state => state.browserInterface.currentWidth)
    const {data:shows, isLoading} = trendingShows
    
    return (
    <div className='mb-10'>
        <ShowTitle title={title} />
        <div className="w-full rounded-lg">
            {
                isLoading? <Loader /> 
                :
                <Swiper spaceBetween={8} slidesPerView={currentWidth<=850? 3.5 : (currentWidth<1120? 4.5 : 5.5)}>
                        {
                            shows.map((show, index) => {
                                return (
                                    <SwiperSlide key={show.id}>
                                        <Show show={{...show, rank: index+1}}/>
                                    </SwiperSlide>
                                )
                            })
                        }
                        <div className="h-8 w-full"></div>
                </Swiper>
            }
        </div>
    </div> 
    )
}

const ShowTitle = ({title}) => {
    return (
        <div className="trending-title mb-5 text-slate-700/70 text-base lg:text-lg font-bold uppercase">
            {title}
        </div>
    )
}

const Loader = () => {
    return (
    <div className="loader w-full flex justify-center">
        <LoadingIcon />
    </div>    
    )
}

const Show = ({show}) => {
    return (
    <div className="show flex flex-col bg-white rounded-md md:rounded-lg lg:rounded-xl shadow-lg">
        <div className="poster-wrapper relative h-[15rem] sm:h-[20rem] md:h-[18rem] lg:h-[20rem] rounded-t-md md:rounded-t-lg lg:rounded-t-xl">
            <Poster poster_path={show.poster_path} className="rounded-t-md md:rounded-t-lg lg:rounded-t-xl"/>
        </div>

        <div className="content relative w-full pb-4 rounded-b-md md:rounded-b-lg lg:rounded-b-xl">
            <div className="rank absolute z-[12] top-0 right-2 -translate-y-2/4 bg-slate-800 text-xl border-2 border-slate-300 text-slate-100 font-extrabold h-10 lg:h-12 aspect-square rounded-full flex justify-center items-center">
                {show.rank}
            </div>
            <div className="title w-4/5 text-base lg:text-lg py-1 lg:py-2 pl-3 text-slate-700 font-bold">
                <Link href={`${show.media_type}/${show.id}`}>
                    <a>
                        {show.title || show.name}
                    </a>
                </Link>
            </div>
            {
                show.media_type==='movie' ? <MovieGenres movie={show} /> : <TvGenres tv={show} /> 
            }
        </div>
    </div>
    )
}

const Poster = ({poster_path, className}) => {
    return (
        <Image  
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            blurDataURL={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt="Picture of the author"
            layout='fill'
            objectFit='cover'
            objectPosition='center'
            className={className}
            placeholder='blur'
        />
    )
}

export default SlideSection

