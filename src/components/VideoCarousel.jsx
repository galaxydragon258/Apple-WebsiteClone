import React, { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { hightlightsSlides } from '../constant'
import { pauseImg, playImg, replayImg } from '../constant/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
    const videoRef = useRef([])
    const [loadedData, setloadedData] = useState([])
    const videoRefSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [videoProgress, setVideoProgress] = useState([])


    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: true,
        videoid: 0,
        isLastVideo: false,
        isPlaying: false
    })

    const { isEnd, startPlay, videoid, isLastVideo, isPlaying } = video;

    useGSAP(() => {

        gsap.to('#slider',{
            transform: `translateX(${-100 * videoid}%)`,
            duration:2,
            ease:'power2.inOut'
        })

        gsap.to('#video', {
            scrollTrigger: {
                trigger: '#video',
                toggleActions: 'restart none none none'
            },
            onComplete: () => {
                {
                    setVideo((prev => ({
                        ...prev,
                        startPlay: true,
                        isPlaying: true
                    })))
                }
            }
        })

    }, [videoid])

    useEffect(() => {
        if (loadedData.length >= 3) {
            if (!isPlaying) {
                videoRef.current[videoid].pause()
            } else {
                startPlay && videoRef.current[videoid].play()
            }
        }
    }, [startPlay, videoid, isPlaying, loadedData]);


    const handleMetaData = (i, e) => setloadedData((prev) => [...prev, e])

    useEffect(() => {
        let span = videoDivRef.current[videoid];

        if (span) {
            
            console.log(span)
            let currentProgress = 0;
            const progresBar = videoRefSpanRef.current[videoid]
            let anim = gsap.to(span, {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100);

                    if (progress !== currentProgress) {
                        currentProgress = progress

                        setVideoProgress(currentProgress)

                        gsap.to(videoDivRef.current[videoid], {
                            width: window.innerWidth < 760 ?
                                '10vw' :
                                window.innerWidth < 1200 ?
                                    '10vh'
                                    :
                                    '10vh',
                            duration: 0.5,
                            ease: 'power1.inOut',
                        })

                        gsap.to(videoRefSpanRef.current[videoid],{
                            width: `${currentProgress}%`,
                            backgroundColor:'white',
                            duration:5
                        })

                        

                    }
                },
                
            })
        }


    }, [videoid, startPlay, isPlaying])

    const handleProccess = (type, i) => {
        switch (type) {
            case 'video-end':
                setVideo((pre) => ({ ...pre, isEnd: true, videoid: i + 1 }))
                break;

            case 'video-last':
                setVideo((pre) => ({ ...pre, isLastVideo: true }))
                break;

            case 'video-reset':
                setVideo((pre) => ({
                    ...pre, isLastVideo: false,
                    videoid: 0
                }))
                break;
            case 'play':
                setVideo((prev) => ({
                    ...prev, isPlaying: !prev.isPlaying
                }))
                break
            case 'pause':
                setVideo((prev) => ({
                    ...prev, isPlaying: false
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
                                    onEnded={()=> 
                                        i !== 3 ? handleProccess('video-end',i)
                                        :
                                        handleProccess('video-last',i)
                                     }
                                    onLoadedMetadata={(e) => handleMetaData(i, e)}
                                >
                                    <source src={list.video} type='video/mp4' />
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
                        <span
                            key={i}
                            className='mx-2 bg-gray-600 w-3 h-3 rounded-full overflow-hidden'
                            ref={(el) => (videoDivRef.current[i] = el)}
                        >
                            <span
                                className='w-0 h-full bg-white rounded-full block'
                                ref={(el)=>(videoRefSpanRef.current[i] = el)}
                            >

                            </span>

                        </span>
                    ))}
                </div>
                <button className='control-btn'>
                    <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                        alt={isLastVideo ? 'replay' : 'pause'}
                        onClick={isLastVideo ? () => handleProccess('video-reset')
                            : !isPlaying
                                ? () => handleProccess('play')
                                :
                                () => handleProccess('pause')
                        }
                    />
                </button>
            </div>
        </>
    )
}
export default VideoCarousel