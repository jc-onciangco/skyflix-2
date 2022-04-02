import { useSelector , useDispatch } from "react-redux"
import Image from "next/image"
import { showModal } from "../../store/slices/showSlice"
import React from 'react'
import ReactPlayer from 'react-player'
const Modal = () => {
    const dispatch = useDispatch()
    const {modalData} = useSelector(state => state.show)

    const handleTrailerVideo = video => {
        return modalData.videos.results.find(video => video.type === 'Trailer').key
    }

    if (modalData.type === "view_image") {
        return (
            <div onClick={() => dispatch(showModal())} className="fixed modal h-screen w-full bg-black/50 backdrop-blur-md z-[100] flex justify-center items-center">
                <Images data={modalData}/>
            </div>
        )
    }

    if (modalData.type === "play_trailer") {
        return (
            <div onClick={() => dispatch(showModal())} className="fixed modal h-screen w-full bg-black/80 backdrop-blur-md z-[100] flex justify-center items-center">
                <iframe className="aspect-video w-[95%] lg:w-[80%] rounded-md" src={`https://www.youtube.com/embed/${handleTrailerVideo()}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>

                </iframe>
            </div>
        )
    }

}

const Images = ({data}) => {
    return (
        <div className="relative w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] xl:w-[70%] aspect-video shadow-md">
            <Poster url={data.file_path} />
        </div>
    )
}

const Poster = ({url}) => {
    return (
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
    )
}



export default Modal