import React from 'react'
import Button from '../../../ui/btn'
import { Link } from 'react-router-dom';
import Heading from '../../../ui/heading';

const handleAnimationComplete = () => {
    console.log('All letters have animated!');
};

export default function AboutUs() {
    return (
        <section className='bg-white py-28'>
            <div className='container mx-auto px-4'>
                <div className='flex justify-between '>
                    <div className='w-fit flex flex-col gap-5 justify-between'>
                        <Heading
                            text="What i do"
                            textColor='text-[#010101]'
                            onAnimationComplete={handleAnimationComplete}
                        />
                        <Button text="Let's Discuss" className='!bg-[#010101]' textClass='!text-[#fff]' onClick={() => alert("Get Started Clicked")} />
                    </div>
                    <div className='max-w-[800px] w-full'>
                        <p className='text-2xl tracking-tight text-[#010101] font-medium leading-relaxed'>A Digital Designer is a professional who creates visual content for digital platforms, using design principles to enhance user experience and brand identity. They work with various tools and software to design interfaces that are both aesthetically pleasing and functional.</p>

                        <Link
                            to="/about"
                            className='w-fit relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:transition-all after:duration-300 hover:after:w-full after:h-[1px] after:bg-[#010101] text-base pt-7 flex items-center gap-1  text-[#010101] font-medium leading-relaxed'>
                            <span>Read More</span>
                            <svg className='size-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path></svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}