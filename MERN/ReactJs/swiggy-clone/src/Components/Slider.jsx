import React, { useState } from 'react'
import Container from './Container';
import categories from '../data/category';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


export default function Slider() {
    const [sliderCount, setSliderCount] = useState(0);
    return (
        <Container>
            <div className='flex my-4 justify-between items-center'>
                <h1 className='text-[24px] font-bold'>What's on your mind?</h1>
                <div className='flex gap-5'>
                    <FaArrowLeft onClick={() => setSliderCount(sliderCount - 2)} fontSize={20} style={{ cursor: "pointer" }} />
                    <FaArrowRight onClick={() => setSliderCount(sliderCount + 2)} fontSize={20} style={{ cursor: "pointer" }} />
                </div>
            </div>
            <div className='w-full flex overflow-hidden'>
                {
                    categories.map(
                        (cat, index) => {
                            return <img key={index} className='duration-[400ms] px-[16px] w-[200px]' style={{
                                transform: `translateX(-${sliderCount * 100}%)`
                            }} src={`images/${cat.image}`} />
                        }
                    )
                }
            </div>
        </Container>
    )
}
