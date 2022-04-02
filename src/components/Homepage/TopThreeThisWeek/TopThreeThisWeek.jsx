import {useMemo} from 'react'

//Containers/Components
import HomepageSectionContainer from '../../../container/HomapageSectionContainer';
import { Swiper , SwiperSlide } from 'swiper/react';
import Slide from './Slide';
import 'swiper/css';

//API
import { useGetTrendingMovieQuery } from '../../../store/services/movieApi'

const TopThreeThisWeek = () => {
    const trendingMovies = useGetTrendingMovieQuery({ time: 'week', length: 3}) 

    return (
        <HomepageSectionContainer>
            <div className="title uppercase font-bold text-slate-700 mb-5 py-2 md:py-3 lg:py-5 text-lg md:text-2xl lg:text-3xl">
                top 3 this week
            </div>
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                >
            {
                trendingMovies.isLoading?
                <div className="w-full relative h-[35rem] mx-auto bg-zinc-400 animate-pulse"></div> :
                trendingMovies.data.map(movie => {
                    return (
                    <SwiperSlide key={movie.id}>
                        <Slide movie={movie}/>
                    </SwiperSlide>
                    )
                })
            }

            </Swiper>
        </HomepageSectionContainer>
    )
}

export default TopThreeThisWeek