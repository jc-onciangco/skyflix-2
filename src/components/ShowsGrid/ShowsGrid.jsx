import Image from 'next/image'
import { useSelector , useDispatch } from "react-redux"
import { movieModes , tvModes , showTypeModes } from './constant'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faFilter } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import moment from 'moment'
import {useEffect,useRef} from 'react'
import {openFilter} from '../../store/slices/showSlice'

const ShowsGrid = ({shows, totalPages, showType}) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const {mode:showMode, page: currentPage, show} = router.query
    const mode = show || showMode
    const checkMode = ['tv', 'popular', 'movie'].includes(mode)

    return ( 
    <section className=" flex-1">
        {
            showType!=="person" &&
            <div className="flex items-center justify-between">
                <ModeFilter showType={showType} />
                <div className="filter-icon block lg:hidden">
                    <div onClick={() => dispatch(openFilter())} className="button flex items-center gap-2 bg-yellow-500 px-2 py-[0.20rem] rounded-md active:ring-2 active:ring-yellow-600">
                        <span className="text-white font-semibold text-sm">Filter</span> 
                        <div className="h-[0.9rem] aspect-square bg">
                            <FontAwesomeIcon icon={faFilter} color="#ffffff" height={'100%'} />
                        </div>
                    </div>
                </div>
            </div> 
        }
        <div className="page-info mb-2 font-bold text-slate-500 text-xs md:text-sm">
            {(shows.isFetching || shows.isLoading)? '0' : shows.data.total_results} Results
        </div>
        <div className="movies">
            {
                shows.isLoading? 
                <Loader /> :
                (shows.isFetching? <Loader /> :
                (shows.data.results.length===0?
                    <div className="bg-slate-300 h-screen w-full grid place-content-center text-xl uppercase font-bold text-slate-500 rounded-md">No Results</div> :
                    <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-6">
                        {
                            shows.data.results.map(show => {
                                return (
                                    <Show key={show.id} show={show} showType={showType} />
                                )
                            })
                        }
                    </ul>)
                    )

            }
        </div>
        {
            totalPages? <Pagination totalPages={totalPages} /> : <div className=""></div>
        }
    </section>
    )
}

const Button = ({data}) => {
    return (
        <button className={`px-6 py-4 text-sm bg-yellow-500 text-slate-100 font-bold ${data.class} transition-all`}>
            {data.name}
        </button>
    )
}

const Pagination = ({totalPages}) => {
    const router = useRouter()
    const {show, mode:showMode, page: currentPage} = router.query
    const mode = show || showMode
    const path = router.asPath
    const pageInputRef = useRef()
    const checkMode = ['tv', 'popular', 'movie'].includes(mode)
    const withGenres = router.query.with_genres
    const checkGenres = withGenres? (totalPages>500? 500 : totalPages) : 500

    useEffect(() => {
        if (router.query.page) {
            pageInputRef.current.value = currentPage
        }
        pageInputRef.current.max = checkMode? checkGenres : totalPages
    },[router])

    const handleGotoPage = e => {
        const value = e.target.value
        const maxPage = checkMode? checkGenres : totalPages 

        if (e.key === 'Enter') {
            if (value > maxPage || value <= 0) return
            router.push(path.replace(`page=${currentPage}`, `page=${value}`))
        }

    }

    const handleSetUncahnged = () => {
        pageInputRef.current.value = currentPage
    }

    console.log(currentPage, path)
    
    return (
    <div className="load-more mt-6 bg-slate-300 text-center rounded-xl flex justify-center">
        <div className="flex justify-between items-center w-full gap-4">
            {
                Number(router.query.page)===1? <Button data={{name: 'Prev', class: 'rounded-l-xl cursor-default opacity-0'}} /> : 
                <Link href={path.replace(`page=${currentPage}`, `page=${Number(currentPage)-1}`)}>
                    <a>
                        <Button data={{name: 'Prev', class: 'rounded-l-xl hover:contrast-[1.20]'}} />
                    </a>
                </Link>
            }
            <div className="number-input h-full flex items-center gap-2 font-semibold">
                Page
                <input onBlur={() => handleSetUncahnged()} ref={pageInputRef} required onKeyDown={e => handleGotoPage(e)} min="1" type="number" className="h-[70%] w-[3rem] border-0 rounded-lg focus:ring-yellow-500 focus:invalid:ring-red-400 focus:ring-2 invalid:bg-red-100" />
                <style jsx>{`

                        input[type=number]::-webkit-inner-spin-button, 
                        input[type=number]::-webkit-outer-spin-button { 
                            -webkit-appearance: none; 
                            margin: 0; 
                        }

                    `}</style> 
                of {checkMode? checkGenres : totalPages}
            </div>
            {
                Number(router.query.page)===(checkMode?checkGenres:totalPages)? <Button data={{name: 'Prev', class: 'rounded-r-xl cursor-default opacity-0'}} /> : 
                <Link href={path.replace(`page=${currentPage}`, `page=${Number(currentPage)+1}`)}>
                    <a>
                        <Button data={{name: 'Next', class: 'rounded-r-xl hover:contrast-[1.20]'}} />
                    </a>
                </Link>
            }
        </div>
    </div>
    )
}

const Show = ({show, showType}) => {
    const router = useRouter()
    return (
    <li className="bg-white rounded-lg border-[1px] border-slate-500/30 shadow-md">
        <div className="poster relative aspect-[1/1.5] rounded-t-lg overflow-hidden">
            {
                (show.poster_path || show.profile_path)? 
                <Image  
                    src={`https://image.tmdb.org/t/p/original/${show.poster_path || show.profile_path}`}
                    blurDataURL={`https://image.tmdb.org/t/p/w500/${show.poster_path || show.profile_path}`}
                    placeholder='blur'
                    alt="Picture of the author"
                    layout='fill'
                    objectFit='cover'
                    objectPosition='center'
                /> :
                <div className="w-full h-full flex justify-center items-center font-bold text-2xl bg-slate-500 text-white">SKYFLIX</div>
            }
        </div>
        <div className="details px-2 py-3">
            <Link href={`${router.query.show? '/'+router.query.show : `/${showType}`}/${show.id}`}>
                <a className="title text-sm font-bold text-slate-700 md:hover:text-yellow-500 transition-all">
                    {show.title || show.name}
                </a>
            </Link>
            {
                showType==='person'?
                <div className="date-release text-sm font-semibold text-slate-500/80">
                    <ul className="flex flex-wrap gap-1">
                        {
                            show.known_for.map((knowShow, index) => {
                                return (
                                    <li key={knowShow.id} className="hover:text-slate-500 hover:underline transition-all">
                                        <Link href={`${knowShow.media_type}/${knowShow.id}`}>
                                            <a>
                                                {
                                                    (index < show.known_for.length - 1)?
                                                    `${knowShow.title || knowShow.name},` :
                                                    (knowShow.title || knowShow.name)
                                                }
                                            </a>
                                        </Link>
                                    </li>
                                ) 
                            })
                        }
                    </ul>
                </div> :
                <div className="date-release text-sm font-semibold text-slate-500/70">
                    {
                        moment(show.release_date || show.first_air_date).format('LL') 
                    }
                </div> 
            }
        </div>
    </li>
    )
}

const Loader = () => {
    return (
    <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-6">
        {
            [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(index => {
                return (
                <li key={index} className="bg-slate-400 animate-pulse aspect-[1/1.5] rounded-lg">

                </li>
                )
            })
        }
    </ul>
    )
}

const ModeFilter = ({showType}) => {
    const router = useRouter()
    const modes = showType==="movie"? movieModes : (showType==='tv'? tvModes : showTypeModes) 
    const page = useSelector(state => state.show.page)
    const activeMode = router.query.mode || router.query.show

    return (
    <ul className="movie-filter flex gap-2 sm:gap-3 md:gap-6 mb-4 text-xs sm:text-sm font-bold pt-4 sm:pt-0">
        {
            modes.map(mode => {
                return (
                    <li key={mode.id}> 
                        <Link 
                            href={{
                                pathname: `/${showType}/[mode]`,
                                query: { mode: encodeURIComponent(mode.slug) , page },
                            }}>
                            <a className={`${activeMode===mode.slug? 'bg-yellow-500 text-white' : 'bg-slate-300 text-slate-500'} cursor-pointer hover:contrast-[1.10] transition-all px-4 py-2 sm:px-5 md:px-8 sm:py-2 uppercase rounded-sm`}>
                                {mode.name}
                            </a>
                        </Link>
                    </li>
                )
            })
        }
    </ul>
    )
}

export default ShowsGrid