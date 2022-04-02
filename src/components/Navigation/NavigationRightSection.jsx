import Image from 'next/image'

const NavigationRightSection = () => {
    return (
        <section className="flex space-x-6 items-center">
            <div className="search-logo h-8 aspect-square rounded-full bg-secondary-color-1 hover:bg-secondary-color-1.5 transition-all p-2 cursor-pointer" title="search">
                <SearchIcon />
            </div>
            <div className="user-icon h-8 aspect-square rounded-full relative overflow-hidden">
                <Image  src="/user-profile.png"
                        alt="Picture of the author"
                        layout="fill"
                        objectFit="cover"
                        />
            </div>
        </section>
    )
}

export const SearchIcon = () => {
    return (
        <svg viewBox="0 0 1664 1664" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1152 704C1152 580.667 1108.17 475.167 1020.5 387.5C932.833 299.833 827.333 256 704 256C580.667 256 475.167 299.833 387.5 387.5C299.833 475.167 256 580.667 256 704C256 827.333 299.833 932.833 387.5 1020.5C475.167 1108.17 580.667 1152 704 1152C827.333 1152 932.833 1108.17 1020.5 1020.5C1108.17 932.833 1152 827.333 1152 704ZM1664 1536C1664 1570.67 1651.33 1600.67 1626 1626C1600.67 1651.33 1570.67 1664 1536 1664C1500 1664 1470 1651.33 1446 1626L1103 1284C983.667 1366.67 850.667 1408 704 1408C608.667 1408 517.5 1389.5 430.5 1352.5C343.5 1315.5 268.5 1265.5 205.5 1202.5C142.5 1139.5 92.5 1064.5 55.5 977.5C18.5 890.5 0 799.333 0 704C0 608.667 18.5 517.5 55.5 430.5C92.5 343.5 142.5 268.5 205.5 205.5C268.5 142.5 343.5 92.5 430.5 55.5C517.5 18.5 608.667 0 704 0C799.333 0 890.5 18.5 977.5 55.5C1064.5 92.5 1139.5 142.5 1202.5 205.5C1265.5 268.5 1315.5 343.5 1352.5 430.5C1389.5 517.5 1408 608.667 1408 704C1408 850.667 1366.67 983.667 1284 1103L1627 1446C1651.67 1470.67 1664 1500.67 1664 1536Z" fill="black"/>
        </svg>
    )
}

export default NavigationRightSection