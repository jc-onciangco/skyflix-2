import Image from 'next/image'

const ImageOverlay = ({children, imgUrl, imgClassName}) => {
    return (
        <div className="w-full relative mx-auto">
            <div className="absolute w-full h-full " style={{zIndex: '12'}}>
                {children}
            </div>
            <Image  
                src={imgUrl.src}
                alt="Picture of the author"
                layout='fill'
                objectFit='cover'
                objectPosition='10% 40%'
                className={imgClassName}
                placeholder='blur'
                blurDataURL={imgUrl.blur}
                />
        </div>
    )
}

export default ImageOverlay