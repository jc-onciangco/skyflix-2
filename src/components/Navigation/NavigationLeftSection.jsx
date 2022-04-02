import NavigationLinks from './NavigationLinks'
import { navigationLinks } from './constant'

const NavigationLeftSection = () => {
    return (
        <section className="flex space-x-4 items-center lg:space-x-6 xl:space-x-8">
            <div className="logo text-xl font-bold flex items-center space-x-2">
                <img className="h-6 aspect-square" src="/skyflix-logo.svg" alt="skyflix-logo" />
                <div className="app-name-logo text-yellow-500">SKYFLIX</div>
            </div>

            <ul className="hidden space-x-2 md:flex lg:space-x-4 xl:space-x-6">
                {
                    navigationLinks.map(link => {
                        return (
                            <NavigationLinks linkData={link} key={link.id} />
                        )
                    })
                }
            </ul> 
        </section>
    )
}

export default NavigationLeftSection