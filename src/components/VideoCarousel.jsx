import React, { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constant'
import { pauseImg, playImg, replayImg } from '../constant/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
const VideoCarousel = () => {
    const videoRef = useRef([
    ]);
    const videoRefSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: true,
        videoid: 0,
        isLastVideo: false,
        isPlaying: false
    }
    )

    
    const { isEnd, startPlay, videoid, isLastVideo, isPlaying } = video;

    const [loadedData, setloadedData] = useState([])

    useGSAP(()=>{
        gsap.to('#video',{
            scrollTrigger:{
                trigger:'#video',
                toggleActions:'resart none none none'
            },
            onComplete:()=>{{
                setVideo((prev=>({
                    ...prev,
                    startPlay:true,
                    isPlaying:true
                })))
            }}
        })

    })

    useEffect(() => {
        console.log(videoRef.current);
    }, [videoid]);

    useEffect(() => {
        if (loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoid].pause()
            } else {
                startPlay && videoRef.current[videoid].play()
            }
        }


    }, [startPlay, videoid, isPlaying, loadedData])

    useEffect(() => {
        const currentProgress = 0;
        let span = videoRefSpanRef.current[videoid];
    }, [videoid, startPlay])


    const handleProccess = (type,i)=>{
        switch(type){
            case 'video-end':
                setVideo((pre)=> ({...pre,isEnd:true,videoid:i+1}))
                break;

            case'video-last':
                setVideo((pre)=> ({...pre,isLastVideo:true}))
                break;

            case 'video-reset':
                setVideo((pre)=> ({...pre,isLastVideo:false,
                    videoid:0
                }))
                break;
            case 'play':
                setVideo((prev)=> ({...prev,isPlaying:!prev.isPlaying
                    
                }))
                break

             default:   
             
        }

    }


    return (
        <>
            <div className='flex items-center'>
                {hightlightsSlides.map((list, i) => (
                    <div key={i} id='slider' className='sm:pr-20 pr-10'>
                        <div className='video-carousel_container'>
                            <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                                <video id='video'
                                    playsInline={true}
                                    muted
                                    preload='auto'
                                    ref={(el) => { videoRef.current[i] = el }}
                                    onPlay={() => {
                                        setVideo((prevVideo) => ({
                                            ...prevVideo, isPlaying: true
                                        }))
                                    }}
                                >
                                    <source src={list.video} type='video' />
                                </video>


                            </div>
                            <div className='absolute top-12 left-[5%] z-10'>
                                {list.textLists.map((text) => (
                                    <p key={text} className='md:text-2xl text-xl font-medium'>
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='relative flex-center mt-10'>
                <div className='flex-center py-5 px-7 bg-gray-800 backdrop-blur rounded-full
                relative cursor-pointer
                '>
                    {videoRef.current.map((_, i) => (
                        <span key={i}
                            ref={(el) => (videoDivRef.current[i] = el)}
                            className='mx-2 w-3 h-3 bg-gray-100 rounded-full'
                        >
                            <span className='absolute h-full w-full 
                            rounded-full 
                            '
                            ref={(el)=>(videoDivRef.current[i]=el)}
                            ></span>

                        </span>
                    ))}
                </div>
                <button className='control-btn'>
                    <img src={isLastVideo ? replayImg :!isPlaying ? playImg : pauseImg} 
                    alt={isLastVideo ? 'replay':'pause' }
                    onClick={isLastVideo ? ()=> handleProccess('video-reset')
                        :!isPlaying
                        ?()=>handleProccess('play')
                        :
                        ()=>handleProccess('pause')
                    }
                    />

                </button>
            </div>
        </>
    )
}

export default VideoCarousel