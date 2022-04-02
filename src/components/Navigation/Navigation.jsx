import NavigationLeftSection from './NavigationLeftSection'
import NavigationRightSection from './NavigationRightSection'
import NavigationMobileLinks from './NavigationMobileLinks'
import { useSelector } from 'react-redux'
import {useState} from 'react'

const Navigation = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const isDarkmode = useSelector(state => state.darkmode.isDarkmode)

    return (
        <>
            <nav className="fixed z-50 h-[4.5rem] flex items-center w-full px-2 sm:h-[6rem] xl:px-5">
                <div className="relative bg-white/80 shadow-md backdrop-blur-xl pr-4 h-5/6 w-full mx-auto flex items-center justify-between rounded-md md:px-3 xl:max-w-[1320px] xl:px-4">
                    <div className="absolute cursor-pointer h-full aspect-square bg-skyflix-label-color grid place-items-center rounded-l-md md:hidden">
                        <img onClick={() => setOpenMenu(prevState => !prevState)} className={`${openMenu? `h-4` : `h-6`} aspect-square block md:hidden`} src={openMenu? `/close-icon.svg` : `/menu-icon.svg`} alt="menu-icon" />
                    </div>
                    <img className="h-6 aspect-square block md:hidden" src="/menu-icon.svg" alt="menu-icon" />
                    <NavigationLeftSection />   
                    <NavigationRightSection />
                    <NavigationMobileLinks openMenu={openMenu} />
                </div>
            </nav>
            {
                openMenu && <div className="block h-screen w-screen bg-black/80 backdrop-blur-md fixed z-20 md:hidden"></div>
            }
        </>
    )
}

export default Navigation