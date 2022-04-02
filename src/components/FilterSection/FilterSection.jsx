import { useEffect , useState } from 'react'
import {useRouter} from 'next/router'
import { useSelector , useDispatch } from 'react-redux'

//STATE ACTIONS
import { saveInitialGenres , selectGenre , removeGenre , resetSelectedQueries  } from '../../store/slices/FilterSlice'
import { openFilter } from '../../store/slices/showSlice'

//Containers and Components
import OutsideClickHandler from 'react-outside-click-handler'

//API
import { useGetMovieGenresQuery } from '../../store/services/movieApi'
import { useGetTvGenresQuery } from '../../store/services/tvApi'

//CONSTANT
import { movieSort , tvSort } from './constant'

const FilterSection = () => {
    const {isFilterShow} = useSelector(state => state.show)
    return (
        <section className={`relative w-full lg:w-[18rem] ${isFilterShow? 'block' : 'hidden'} lg:block`}>
            <SearchSection />
        </section>
    )
}

const SearchSection = () => {
    const dispatch = useDispatch()
    return (
        <section className={`filter w-full lg:w-[18rem]`}>
            <div className="back w-[80%] sm:w-[60%] md:w-[50%] lg:w-full mx-auto">
                <div className="button py-4 flex lg:hidden justify-end">
                    <button onClick={() => dispatch(openFilter())} className="bg-yellow-500 px-4 py-1 rounded-md text-white font-semibold active:ring-2 active:ring-yellow-600">Back</button>
                </div>
                <Container name={'Sort'}>
                    <Dropdown />
                </Container>
                <Container name={'Filter'}>
                    <FilterGenres />
                </Container>
            </div>
        </section>
    )
}

const Container = ({children, name}) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const path = router.asPath
    const sortByQuery = router.query.sort_by
    const genresQuery = router.query.with_genres

    const handleReset = () => {
        if (name === 'Sort') {
            router.push(path.replace(`&sort_by=${sortByQuery}`,''))
        } 
        else {
            router.push(path.replace(`&with_genres=${genresQuery}`,''))
            dispatch(resetSelectedQueries())
        }
    }

    return (
    <div className="sort divide-y-2 divide-slate-100 rounded-xl shadow-sm mb-6">
        <div className="flex justify-between items-center label px-5 py-3 capitalize text-lg font-semibold bg-yellow-500 rounded-t-xl text-white">
            <div className="name">{name}</div>
            <button onClick={() => handleReset()} className="reset text-xs text-yellow-800 font-bold cursor-pointer active:ring-2 active:ring-yellow-600 transition-all bg-white/0 hover:bg-white/30 px-3 py-1 rounded-md">Reset</button>
        </div>
        <div className="dropdown px-5 py-5 bg-white rounded-b-xl">
        {children}
        </div>
    </div>
    )
}


const FilterGenres = () => {
    const dispatch = useDispatch()
    const { selectedGenres , previousSelectedGenres } = useSelector(state => state.filter)
    const router = useRouter()
    const moviesGenres = useGetMovieGenresQuery() 
    const tvsGenres = useGetTvGenresQuery()
    const genres = router.query.show==='movie'? moviesGenres : tvsGenres
   
    //trigger when "selectedGenres" change by means of selecting genre.
    useEffect(() => {
        if (!selectedGenres.length) return

        const stringifyGenres = selectedGenres.join(',')
        const currentPath = router.asPath

        //call router push after dispatching "selectGenre" action if it has lenght.
        if (router.query.with_genres) {
            const previosGenresStringify = previousSelectedGenres.join(',')
            router.push(currentPath.replace(previosGenresStringify, stringifyGenres))
            return
        }
        
        router.push(`${currentPath}&with_genres=`+stringifyGenres)
    }, [selectedGenres])

    useEffect(() => {
        //if router is ready, then initial path will be cache in a state as "initalPath".
        if (router.isReady && router.query.with_genres) {
            dispatch(saveInitialGenres(router.query.with_genres))
        }
    }, [router.isReady])

    //selecting genre
    const handleSelectGenre = genre => {
        //if included, then then genre will remove.
        if (selectedGenres.includes(genre)) {
            //push to initial route before removing in a "selectedGenres" state.
            if (selectedGenres.length === 1) {
                console.log('previos: ', router.query.with_genres)
                router.push(router.asPath.replace(`&with_genres=${router.query.with_genres}`,''))
            }
            //remove genre on a "selectedGenres" state if it has more than 1 genre.
            dispatch(removeGenre(genre))
            return
        }

        //dispatch if not exist in a "selectedGenres" state.
        dispatch(selectGenre(genre))
    }


    return (
        <div className="">
            <ul className="w-full flex flex-wrap gap-2">
                {
                    genres.isLoading? <div className="">Loading...</div>:
                    genres.data.genres.map(genre => {
                        return (
                            <li key={genre.id} onClick={() => handleSelectGenre(genre.id)} className={`${selectedGenres.includes(genre.id)? 'bg-yellow-500 text-slate-100' : 'bg-slate-100'} transition-all hover:contrast-[0.90] active:ring-2 active:ring-yellow-600 font-semibold text-sm px-4 py-1 rounded-md cursor-pointer`}>{genre.name}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

const Dropdown = () => {
    const router = useRouter()
    let {sort_by} = router.query
    const sortByData = router.query.show==='movie'? movieSort : tvSort 
    sort_by = sort_by || 'popularity.desc'
    const [openSelector, setOpenSelector] = useState(false)

    const handleCloseSelector = () => {
        setOpenSelector(false)
    }

    return (
        <div className={`relative select flex bg-slate-100 rounded-md justify-between cursor-pointer border-2 ${openSelector? 'border-yellow-400' : 'border-transparent'} z-[3]`}>
            <div onClick={() => setOpenSelector(prevState => !prevState)} className="flex justify-between w-full">
                <div className={`selected-option flex-1 py-2 px-3 capitalize font-semibold truncate`}>
                    {
                        sort_by && sortByData.find(option => option.slug === sort_by).name
                    }
                </div>
                <div className="caret aspect-square h-full flex items-center bg-slate-200 rounded-r-md  justify-center">v</div>
            </div>

        <OutsideClickHandler onOutsideClick={() => setOpenSelector(false)}>
            <div onClick={() => handleCloseSelector()} className={`${openSelector? 'block' : 'hidden'}`}>
                <div id="options" className="h-[10rem] overflow-auto options absolute shadow-md divide-y-2 divide-slate-100 bottom-[-4px] left-0 w-full translate-y-full bg-white border-[1px] border-slate-300 rounded-md">
                    {
                        sortByData.map(sortByOption => {
                            return (
                                <Option key={sortByOption.id} option={sortByOption} />
                            )
                        })
                    }
                </div>
            </div>
        </OutsideClickHandler >
        </div>
    )
}

const Option = ({option}) => {
    const router = useRouter()
    const path = router.asPath
    const sortByQuery = router.query.sort_by
    const handleSort = slug => {
        //Selecting option that currently active.
        if ((slug === sortByQuery) || (slug==='popularity.desc' && typeof sortByQuery === 'undefined'))  return
        
        //Selecting other option that has already active.
        if (router.query.sort_by) {
            //Push to default route which is no sort_by query when selecting popularity.desc
            if (slug === 'popularity.desc') {
                router.push(path.replace(`&sort_by=${sortByQuery}`,''))
                return
            }

            router.push(path.replace(sortByQuery,slug))
            return
        }

        //Initial sorting.
        if (router.isReady) {
            router.push(path+`&sort_by=${slug}`)
        }
    }

    return (
        <div onClick={() => handleSort(option.slug)} className={`${(sortByQuery === option.slug) || (!sortByQuery && option.slug==='popularity.desc')? 'bg-slate-100' : 'bg-white'} capitalize text-slate-500 option px-3 py-3 text-sm font-semibold hover:contrast-[0.90] hover:text-slate-900`}>{option.name}</div>
    )
}

export default FilterSection