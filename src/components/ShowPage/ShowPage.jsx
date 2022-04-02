import Image from 'next/image'

import LoadingIcon from './LoadingIcon';
import MainInfo from './MainInfo';
import {formatter,externalLinksToArray} from './utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faLink } from '@fortawesome/free-solid-svg-icons'
import { faFacebook , faImdb , faTwitter , faInstagram } from '@fortawesome/free-brands-svg-icons'
import { useDispatch } from 'react-redux';
import { showModal } from '../../store/slices/showSlice';

const ShowPage = ({details}) => {
    const { data , isLoading , isFetching } = details
    return (
    <div className="">   
        <div className="show-page w-full relative">
            <MainBackdrop details={details} />
            <div className="details mb-4 sm:mb-0 relative mt-2 sm:mt-0 translate-y-[0] sm:translate-y-[-100px] transition-all lg:translate-y-[-200px] z-[2] w-full">
                <div className="data w-full md:w-[98%] lg:w-[95%] rounded-md mx-auto bg-white/60 backdrop-blur-md shadow-md border-2 border-white/30 p-2 sm:p-4 lg:p-6">

                    <MainInfo details={details}/>

                    {
                        (isFetching || isLoading)? 
                        <div className="pt-20 pb-10">
                            <LoadingIcon size={'1.5rem'} />
                        </div> :
                        <>
                        <MainInfoMobile data={data} />
                        <StatInfoMobile data={data} />

                        {
                            data.seasons &&
                            <div className="casts w-full bg-white rounded-md flex-1 shadow-sm mt-6 sm:mt-10 pt-4 sm:pt-6 p-4 sm:p-10 border-t-4 border-yellow-500">
                                <div className="label text-xl lg:text-[1.40rem] font-bold mb-4">Seasons</div>
                                <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {
                                        data.seasons.map(season => {
                                            return (
                                                <Show key={season.id} data={season} ratio={"aspect-[4/5]"} type={"data"}/>
                                            )
                                        })
                                    }
                                </ul>
                            </div> 
                        }


                        <Casts data={data} />
                        <RecommendationsAndSimilar data={data} />
                        <ImagesAndVideos data={data} />

                        </>
                    }

                </div>
            </div>
        </div>

    </div>
    )
}

const StatInfoMobile = ({data}) => {
    const brands = [
        {name: 'imdb', icon: faImdb},
        {name: 'facebook', icon: faFacebook},
        {name: 'twitter', icon: faTwitter},
        {name: 'instagram', icon: faInstagram},
    ]
    return (
    <div className="links font-sans bg-white p-8 rounded-md flex-1 shadow-sm mt-2 flex sm:hidden">
        <div className="details flex flex-col gap-4 flex-1">
            <div className="status">
                <div className="label text-[0.9rem] sm:text-base lg:text-lg font-bold">Status</div>
                <div className="description text-black/60 text-[0.82rem] sm:text-sm lg:text-base font-semibold leading-tight">{data.status}</div>
            </div>
            <div className="original-language">
                <div className="label text-[0.9rem] sm:text-base lg:text-lg font-bold">Original Language</div>
                <div className="description text-black/60 text-[0.82rem] sm:text-sm lg:text-base font-semibold leading-tight">{data.spoken_languages.name}</div>
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
                            <a without rel="noreferrer" href={data.homepage} target="_blank">
                                <FontAwesomeIcon icon={faLink} color="#DFAE14" height={'100%'} />
                            </a>
                        </div>
                    </div>
                    <ul className=" flex flex-wrap gap-4 description text-black/60 text-base font-semibold leading-tight">
                        {
                            externalLinksToArray(data.external_ids)
                            .filter(link => (link.name !== 'imdb'))
                            .map((id, index) => {
                                return (
                                    <li key={id.id} className="h-[1.6rem] lg:h-[1.8rem] aspect-square">
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
    )
}

const MainInfoMobile = ({data}) => {
    return (
    <div className="block sm:hidden description w-full bg-white rounded-md flex-1 shadow-sm mt-2 p-5">
        {
            data.tagline &&
            <div className="tagline w-full italic text-[0.95rem] lg:text-base font-normal text-black/60 ">{`- ${data.tagline}`}</div>
        }
        <div className="overview pt-3">
            <div className="label md:text-[1.15rem] lg:text-xl font-bold mb-2">Overview</div>
            <div className="description text-sm lg:text-base font-semibold leading-tight">{data.overview}</div>
        </div>
        <div className="crews pt-3">
            <div className="label md:text-[1.15rem] lg:text-xl font-bold mb-2">Crews</div>
            <ul className="flex gap-14 md:gap-20 lg:gap-30 xl:gap-40">
                {
                    data.credits.crew.filter((crew, index) => index < 3)
                                        .map((crew, index) => {
                                            return (
                                            <li key={index} className="crew leading-tight font-bold">
                                                <div className="name text-[0.84rem] lg:text-base mb-1 md:mb-2 lg:mb-0 leading-[1.10] lg:leading-normal">{crew.name}</div>
                                                <div className="position text-xs text-black/60">{`${crew.department}, ${crew.job}`}</div>
                                            </li>
                                            )
                                        })
                }
            </ul>
        </div>
    </div>
    )
}

const Casts = ({data}) => {
    return (
    <div className="casts w-full bg-white rounded-md flex-1 shadow-sm mt-6 sm:mt-10 pt-4 sm:pt-6 p-4 sm:p-10 border-t-4 border-yellow-500">
        <div className="label text-xl lg:text-[1.40rem] font-bold mb-4">Casts</div>
        <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {
                data.credits.cast.filter((x,index) => index < 7)
                .map(cast => {
                    return (
                        <Show key={cast.id} data={cast} ratio={"aspect-[4/5]"} type={"data"}/>
                    )
                })
            }
        </ul>
    </div> 
    )
}

const RecommendationsAndSimilar = ({data}) => {
    return (
    <div className="casts flex flex-col gap-10 w-full bg-white rounded-md flex-1 shadow-sm mt-6 sm:mt-10 pt-4 sm:pt-6 p-4 sm:p-10 border-t-4 border-yellow-500">
        <div className="">
            <div className="label text-xl lg:text-[1.40rem] font-bold mb-4">Recommendations</div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {
                    data.recommendations.results.filter((x,index) => index < 4)
                    .map(recommendation => {
                        return (
                            <Show key={recommendation.id} data={recommendation} ratio={"aspect-video"} type={"data"}/>
                        )
                    })
                }
            </ul>
        </div>
        <div className="">
            <div className="label text-xl lg:text-[1.40rem] font-bold mb-4">Similar Shows</div>
            <ul className="grid grid-cols-3 gap-4">
                {
                    data.similar.results.filter((x,index) => index < 3)
                    .map(similar => {
                        return (
                            <Show key={similar.id} data={similar} ratio={"aspect-video"} type={"data"}/>
                        )
                    })
                }
            </ul>
        </div>
    </div>
    )
}

const ImagesAndVideos = ({data}) => {
    return (
    <div className="casts flex flex-col gap-10 w-full bg-white rounded-md flex-1 shadow-sm mt-6 sm:mt-10 pt-4 sm:pt-6 p-4 sm:p-10 border-t-4 border-yellow-500">
        <div className="">
            <div className="label text-xl lg:text-[1.40rem] font-bold mb-4">Images</div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    data.images.backdrops.filter((x,index) => index < 6)
                    .map(image => {
                        return (
                            <Show key={image.file_path} data={image} ratio={"aspect-video"} type={"media"} />
                        )
                    })
                }
            </ul>
        </div>
        {/* <div className="">
            <div className="label text-xl lg:text-[1.40rem] font-bold mb-4">Videos</div>
            <ul className="grid grid-cols-3 gap-4">
                {
                    data.videos.results.filter((x,index) => index < 3)
                    .map(video => {
                        return (
                            <div key={video.id} className="col-span-1 rounded-md overflow-hidden">
                                <iframe className="col-span-1 w-full aspect-video" src={`https://www.youtube.com/embed/${video.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>

                                </iframe>
                            </div>
                        )
                    })
                }
            </ul>
        </div> */}
    </div>
    )
}

const MainBackdrop = ({details}) => {
    if (details.isLoading || details.isFetching) {
        return (
            <div className="backdrop relative aspect-[16/6] mx-auto z-[1] bg-slate-400 rounded-md md:rounded-xl lg:rounded-3xl animate-pulse"></div> 
        )
    } 

    const url = details.data.backdrop_path

    return (
        <div className="backdrop relative aspect-[16/6] mx-auto z-[1] rounded-md md:rounded-xl lg:rounded-3xl">
            <Image  
                src={`https://image.tmdb.org/t/p/original/${url}`}
                alt="Picture of the author"
                layout='fill'
                objectFit='cover'
                objectPosition='10% 40%'
                className="rounded-md md:rounded-xl lg:rounded-3xl"
                placeholder='blur'
                blurDataURL={`https://image.tmdb.org/t/p/w500/${url}`}
            />
        </div>
    )
}


const Show = ({data, ratio, type}) => {
    const dispatch = useDispatch()
    const handleShowModal = () => {
        dispatch(showModal({...data, type: 'view_image'}))
    }

    return (
    <div onClick={() => handleShowModal()} className="show flex flex-col bg-white rounded-md md:rounded-lg lg:rounded-xl shadow-md">
        <div className={`poster-wrapper relative ${ratio} rounded-t-md md:rounded-t-lg lg:rounded-t-xl`}>
            <Poster poster_path={data.poster_path || data.profile_path || data.backdrop_path || data.file_path} className={`${data.file_path? "rounded-md hover:contrast-[1.20] cursor-pointer" : "rounded-t-md md:rounded-t-lg lg:rounded-t-xl"}`}/>
        </div>
        {
            type==="data" &&
            <div className="content relative w-full pb-2 rounded-b-md md:rounded-b-lg lg:rounded-b-xl">
                <div className="title w-4/5 text-[0.84rem] sm:text-sm lg:text-base py-1 lg:py-2 pl-3 text-slate-700 font-bold">
                    <div className="name">{data.name || data.title}</div>
                    {
                        data.character &&
                        <div className="role font-semibold text-xs lg:text-sm text-black/60">{`(${data.character})`}</div>
                    }
                    {
                        data.episode_count &&
                        <div className="role font-semibold text-xs lg:text-sm text-black/60">{`(${data.episode_count} episodes)`}</div>
                    }
                </div>
            </div>
        }
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

export default ShowPage