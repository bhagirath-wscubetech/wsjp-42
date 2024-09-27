import React from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Container from './Container';
import ProductBox from './ProductBox';

export default function TopResChain() {
    return (
        <Container>
            <hr className='my-4' />
            <div className='flex my-4 justify-between items-center'>
                <h1 className='text-[24px] font-bold'>
                    Top restaurant chains in Jaipur
                </h1>
                <div className='flex gap-5'>
                    <FaArrowLeft fontSize={20} style={{ cursor: "pointer" }} />
                    <FaArrowRight fontSize={20} style={{ cursor: "pointer" }} />
                </div>
            </div>
            <div className='mb-[400px] flex gap-3'>
                <ProductBox className="w-[400px] md:w-[275px] h-[185px]"/>
                <ProductBox className="w-[400px] md:w-[275px] h-[185px]"/>
                <ProductBox className="w-[400px] md:w-[275px] h-[185px]"/>
                <ProductBox className="w-[400px] md:w-[275px] h-[185px]"/>
            </div>
        </Container>
    )
}
