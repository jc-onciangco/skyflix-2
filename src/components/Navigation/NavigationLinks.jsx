import Link from 'next/link'
import { useRouter } from 'next/router'
import { reset } from '../../store/slices/showSlice'
import { useDispatch } from 'react-redux'

const NavigationLinks = ({linkData}) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const pathName = `/${router.pathname.split('/')[1]}`

    return (
        <li onClick={() => dispatch(reset())}>
            <Link href={linkData.url}>
                <a 
                    className={`font-semibold 
                                capitalize 
                                ${pathName===linkData.url? "bg-yellow-500 text-white" : "bg-slate-200 text-slate-800"}
                                hover:contrast-[0.90]
                                transition-all 
                                py-2 
                                px-4 
                                rounded-md
                                md:px-6`}>{linkData.name}</a>
            </Link>
        </li>
    )
}

export default NavigationLinks