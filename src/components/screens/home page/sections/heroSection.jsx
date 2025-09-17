import React from 'react';
import Prism from '../../../ui/prism';
import SplitText from '../../../ui/splitText.jsx';
import CountUp from '../../../ui/countUp';
import Button from '../../../ui/btn';


const handleAnimationComplete = () => {
    console.log('All letters have animated!');
};

const stats = [
    { id: 1, from: 0, to: 12, suffix: "+", label: "Years of experience" },
    { id: 2, from: 0, to: 200, suffix: "+", label: "Successful project" },
    { id: 3, from: 0, to: 98, suffix: "%", label: "Satisfied clients" },
];

export default function HeroSection() {
    return (
        <section className='min-h-svh bg-[#010101] flex items-end overflow-hidden relative'>
            <div className='relative z-10 min-h-[calc(100dvh-80px)] w-full py-10 flex'>
                <div className='container mx-auto h-auto flex flex-col px-4'>
                    <div className='my-auto'>
                        <SplitText
                            text="Clavicle*"
                            className="text-[250px] leading-none font-semibold text-white text-center"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                            onLetterAnimationComplete={handleAnimationComplete}
                        />
                    </div>
                    <div className='flex justify-between items-end'>
                        <div className='max-w-[670px] w-full'>
                            <div className="grid grid-cols-3 gap-4">
                                {stats.map((stat) => (
                                    <div
                                        key={stat.id}
                                        className="border-b border-white/10 flex flex-col pb-2.5"
                                    >
                                        <div>
                                            <CountUp
                                                from={stat.from}
                                                to={stat.to}
                                                separator=","
                                                direction="up"
                                                duration={1}
                                                className="count-up-text text-white text-2xl font-semibold"
                                            />
                                            <span className="text-white text-2xl font-semibold pl-1">
                                                {stat.suffix}
                                            </span>
                                        </div>
                                        <p className="text-white text-base font-normal opacity-30">
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='max-w-[375px] items-start w-full flex flex-col gap-7'>
                            <p className='text-lg font-normal text-white'>Hi, I am Cliva i am digital <span className='opacity-30'>designer and highly telented 3d</span> renderer with over a decade of experience in the field.</p>
                            <Button text="Get Started" onClick={() => alert("Get Started Clicked")} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-full absolute top-0 left-0'>
                <Prism
                    animationType="3drotate"
                    timeScale={1.5}
                    height={3.5}
                    baseWidth={4}
                    scale={5}
                    hueShift={0}
                    colorFrequency={1}
                    noise={0.2}
                    glow={0.5}
                />
            </div>
        </section>
    )
}