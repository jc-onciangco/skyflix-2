import moment from 'moment';
import language from './lang.json'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay , faLink } from '@fortawesome/free-solid-svg-icons'
import { faFacebook , faImdb , faTwitter , faInstagram } from '@fortawesome/free-brands-svg-icons'
import {formatter, externalLinksToArray} from './utils'
import { useDispatch } from 'react-redux';
import { showModal } from '../../store/slices/showSlice';


//Container and Components
import ProgressCircle from './ProgressCircle';
import LoadingIcon from './LoadingIcon'

const MainInfo = ({details}) => {
    const dispatch = useDispatch()
    const {data, isFetching , isLoading} = details

    const brands = [
        {name: 'imdb', icon: faImdb},
        {name: 'facebook', icon: faFacebook},
        {name: 'twitter', icon: faTwitter},
        {name: 'instagram', icon: faInstagram},
    ]

    const handleShowModal = () => {
        dispatch(showModal({...data, type: 'play_trailer'}))
    }


    return (
    <div className="main-details flex">
        <MainPoster details={details} />
        {
            (isFetching || isLoading)?
            <div className="details ml-2 sm:ml-5 lg:ml-8 xl:ml-10 font-sans bg-white p-8 rounded-md flex-1 shadow-sm flex items-center justify-center">
                <LoadingIcon size={'1.5rem'} />
            </div> :
            <div className="flex-1 ml-2 sm:ml-5 lg:ml-8 xl:ml-10">
                <div className="details font-sans bg-white p-4 sm:p-6 lg:p-8 rounded-md flex-1 shadow-sm h-full sm:h-max">
                    <div className="year font-bold text-xs sm:text-base lg:text-lg leading-none">{(data.release_date || data.first_air_date).split('-')[0]}</div>
                    <div className="title text-xl sm:text-[1.6rem] md:text-3xl lg:text-4xl font-extrabold leading-slug sm:leading-none">{data.title || data.name}</div>
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 font-bold text-xs lg:text-sm sm:items-center py-1 lg:py-2 text-black/60">
                        <div className="date-release">{moment(data.release_date || data.first_air_date).format('LL')}</div> <span className="hidden sm:inline">-</span> 
                        <ul className="genres flex gap-2"> 
                            {
                                data.genres.map((genre, index) => {
                                    return (
                                        <li key={genre.id} className="hover:text-yellow-500 transition-all hover:underline cursor-pointer">{genre.name}</li>
                                    )
                                })
                            }
                        </ul> <span className="hidden sm:inline">-</span> 
                        {
                            (data.runtime<60 && data.episode_run_time[0]<60)?
                            <div className="runtime">{`${data.runtime || data.episode_run_time[0]}min`}</div> :
                            <div className="runtime">{`${Math.floor(data.runtime/60)}hr ${data.runtime - (Math.floor(data.runtime/60) * 60)}min`}</div>
                        }
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 py-2 pb-0 sm:py-4">
                        <div className="score flex items-center gap-2">
                            <ProgressCircle value={data.vote_average} />
                            <div className="label font-bold text-[0.84rem] sm:text-base">User Score</div>
                        </div>
                        <div onClick={() => handleShowModal()} className="play-trailer text-sm lg:text-base flex items-center justify-center gap-3 bg-yellow-500 text-white font-bold px-4 lg:px-6 py-3 rounded-md hover:contrast-[0.90] cursor-pointer transition-all active:contrast-[1.20] active:ring-2 active:ring-yellow-600">
                            Play Trailer
                            <div className="h-[1rem] aspect-square">
                                <FontAwesomeIcon icon={faPlay} color="#ffffff" height={'100%'} />
                            </div>
                        </div>
                    </div>

                    <div className="description hidden sm:block">
                        {
                            data.tagline &&
                            <div className="tagline w-full italic text-[0.95rem] lg:text-base font-normal text-black/60 ">{`- ${data.tagline}`}</div>
                        }
                        <div className="overview pt-6">
                            <div className="label md:text-[1.15rem] lg:text-xl font-bold mb-2">Overview</div>
                            <div className="description text-sm lg:text-base font-semibold leading-tight">{data.overview}</div>
                        </div>
                        <div className="crews pt-6">
                            <div className="label md:text-[1.15rem] lg:text-xl font-bold mb-2">Crews</div>
                            <ul className="flex md:gap-20 lg:gap-30 xl:gap-40">
                                {
                                    data.credits.crew.filter((crew, index) => index < 3)
                                                        .map((crew, index) => {
                                                            return (
                                                            <li key={index} className="crew leading-tight font-bold">
                                                                <div className="name text-[0.95rem] lg:text-base mb-2 lg:mb-0 leading-[1.10] lg:leading-normal">{crew.name}</div>
                                                                <div className="position text-xs text-black/60">{`${crew.department}, ${crew.job}`}</div>
                                                            </li>
                                                            )
                                                        })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="links font-sans bg-white p-8 rounded-md flex-1 shadow-sm mt-5 hidden sm:flex">
                    <div className="details flex flex-col gap-4 flex-1">
                        <div className="status">
                            <div className="label text-base lg:text-lg font-bold">Status</div>
                            <div className="description text-black/60 text-sm lg:text-base font-semibold leading-tight">{data.status}</div>
                        </div>
                        <div className="original-language">
                            <div className="label text-base lg:text-lg font-bold">Original Language</div>
                            <div className="description text-black/60 text-sm lg:text-base font-semibold leading-tight">{language[data.original_language].name}</div>
                        </div>
                        {
                            (data.budget || data.budget===0) &&
                            <div className="budget">
                                <div className="label text-base lg:text-lg font-bold">Budget</div>
                                <div className="description text-black/60 text-sm lg:text-base font-semibold leading-tight">{data.budget===0? 'N/A' : formatter.format(data.budget)}</div>
                            </div>
                        }
                    </div>
                    <div className="links flex-1">
                        <div className="links">
                            <div className="label text-base lg:text-lg font-bold mb-1">Links</div>
                            <div className="flex items-center gap-4">
                                <div className="homepage">
                                    <div className="h-[1.5rem] lg:h-[1.8rem] aspect-square">
                                        <a rel="noreferrer"  href={data.homepage} target="_blank">
                                            <FontAwesomeIcon icon={faLink} color="#DFAE14" height={'100%'} />
                                        </a>
                                    </div>
                                </div>
                                <ul className=" flex flex-wrap gap-4 description text-black/60 text-base font-semibold leading-tight">
                                    {
                                        externalLinksToArray(data.external_ids)
                                        .filter(link => (link.name !== 'imdb') )
                                        .map((id, index) => {
                                            return (
                                                <li key={id.id} className="h-[1.5rem] lg:h-[1.8rem] aspect-square">
                                                    <a without rel="noreferrer" href={`https://www.${id.name}.com/${id.external_id}`} target="_blank">
                                                        <FontAwesomeIcon icon={brands.find(brand => brand.name === id.name).icon} color="#DFAE14" height={'100%'} />
                                                    </a>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
    )
}

const MainPoster = ({details}) => {
    if (details.isLoading || details.isFetching) {
        return (
            <div className="poster relative w-[150px] sm:w-[200px] lg:w-[250px] xl:w-[300px] h-max aspect-[2/3] bg-slate-400 rounded-md animate-pulse"></div> 
        )
    } 

    const url = details.data.poster_path
    return (
    <div className="poster relative w-[150px] sm:w-[200px] lg:w-[250px] xl:w-[300px] h-max aspect-[2/3]">
        <Image  
            src={`https://image.tmdb.org/t/p/original/${url}`}
            alt="Picture of the author"
            layout='fill'
            objectFit='cover'
            objectPosition='10% 40%'
            className="rounded-md"
            placeholder='blur'
            blurDataURL={`https://image.tmdb.org/t/p/w500/${url}`}
        />
    </div>
    )
}

export default MainInfo