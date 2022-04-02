import { navigationLinks } from './constant'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { reset } from '../../store/slices/showSlice'
import { useDispatch } from 'react-redux'
const NavigationMobileLinks = ({openMenu}) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const pathName = `/${router.pathname.split('/')[1]}`

    return (
        <div className={`${openMenu? 'block' : 'hidden'} absolute py-6 px-4 -bottom-2 left-0 translate-y-full mobile-nav w-full bg-white shadow-md rounded-md md:hidden`}>
            <ul className="flex flex-col space-y-4">
                {
                    navigationLinks.map(link => {
                        return (
                            <li key={link.id} onClick={() => dispatch(reset())} className="">
                                <Link href={link.url}>
                                    <a className={`block active:bg-slate-200 ${pathName===link.url? "bg-yellow-500 text-white" : "bg-white text-slate-800"} py-3 px-4 font-semibold rounded-md capitalize`}>{link.name}</a>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default NavigationMobileLinks