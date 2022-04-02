import {useState} from 'react'

//Containers/Components
import HomepageSectionContainer from '../../../container/HomapageSectionContainer';
import SlideSection from './SlideSection';

//API
import { useGetTrendingMovieQuery } from '../../../store/services/movieApi'
import { useGetTrendingTvQuery  } from '../../../store/services/tvApi'

const Trending = () => {
    const [trendingTime, setTrendingTime] = useState('daily')

    return (
        <HomepageSectionContainer>
            <div className="title flex items-center text-slate-700 mb-5 py-2 md:py-3 lg:py-5 ">
                <div className="title uppercase font-bold text-lg md:text-2xl lg:text-3xl mr-10">Trending</div>
                 <div className="time-toggle flex gap-5 font-bold">
                     <div onClick={() => setTrendingTime('daily')} className={`transition-all daily cursor-pointer ${trendingTime==='daily' && 'text-blue-500'}`}>#Daily</div>
                     <div onClick={() => setTrendingTime('weekly')} className={`transition-all weekly cursor-pointer ${trendingTime==='weekly' && 'text-blue-500'}`}>#Weekly</div>
                 </div>
            </div>
            <TrendingMovie trendingTime={trendingTime}/>
            <TrendingTv trendingTime={trendingTime}/>
        </HomepageSectionContainer>
    )
}

const TrendingMovie = ({trendingTime}) => {
    const time = trendingTime === 'daily'? 'day' : 'week'
    const trendingMovies = useGetTrendingMovieQuery({ time, length: 10}) 
    return <SlideSection trendingShows={trendingMovies} title={'movie'} />
}

const TrendingTv = ({trendingTime}) => {
    const time = trendingTime === 'daily'? 'day' : 'week'
    const trendingTvs = useGetTrendingTvQuery({time, length: 10}) 
    return <SlideSection trendingShows={trendingTvs} title={'tv'} />
}


export default Trending