import React, { memo, useState, useEffect, useRef } from 'react'
import SplitText from './SplitText'
import { Link } from 'react-router-dom'

const ServiceCard = memo(({
    service,
    index = 0,
    isVisible = true,
    animationDelay = 200,
    useSplitText = true,
    className = "",
    onAnimationComplete,
    showIcon = false,
    showCategory = false,
    customLinkText = "Read More",
    enableHoverEffects = true,
    imageOnly = false
}) => {
    const [cardVisible, setCardVisible] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                setCardVisible(true);
            }, index * animationDelay);
            return () => clearTimeout(timer);
        }
    }, [isVisible, index, animationDelay]);

    const handleAnimationComplete = () => {
        if (onAnimationComplete) {
            onAnimationComplete(service);
        }
    };

    // If imageOnly mode, show only the image
    if (imageOnly && service.image) {
        return (
            <div
                ref={cardRef}
                className={`bg-[#0a0a0a] rounded-[24px] group transition-all duration-500 overflow-hidden ${enableHoverEffects ? 'hover:bg-[#111111]' : ''
                    } ${cardVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                    } ${className}`}
            >
                <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                />
            </div>
        );
    }

    return (
        <div
            ref={cardRef}
            className={`bg-[#0a0a0a] p-8 rounded-[24px] group flex flex-col transition-all duration-500 ${enableHoverEffects ? 'hover:bg-[#111111]' : ''
                } ${cardVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                } ${className}`}
        >
            <div className="flex flex-col gap-1.5 pb-8 border-b border-white/10">
                <div className="flex items-center gap-3 pb-2">
                    <span className="text-[#2EF943] text-base font-medium">
                        {service.number}.
                    </span>
                </div>


                {useSplitText ? (
                    <SplitText
                        text={service.title}
                        className="text-3xl text-white font-medium leading-none"
                        delay={100}
                        duration={0.6}
                        ease="power3.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 40 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="-100px"
                        textAlign="left"
                        onLetterAnimationComplete={handleAnimationComplete}
                    />
                ) : (
                    <h3 className="text-3xl text-white font-medium leading-none">
                        {service.title}
                    </h3>
                )}
            </div>

            <div className="flex-1 flex flex-col">
                <p className="text-white/50 text-sm font-normal pt-8 leading-relaxed">
                    {service.description}
                </p>

                {service.link && (
                    <Link
                        to={service.link}
                        className={`mt-auto w-fit relative text-white after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:transition-all after:duration-300 group-hover:after:w-full after:h-[1px] after:bg-[white] text-base pt-7 flex items-center gap-1 font-medium leading-relaxed ${enableHoverEffects ? 'hover:text-[#2EF943] transition-colors duration-300' : ''
                            }`}
                    >
                        <span>{customLinkText}</span>
                        <svg
                            className={`size-4 ${enableHoverEffects ? 'transition-transform duration-300 group-hover:translate-x-1' : ''}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
                        </svg>
                    </Link>
                )}
            </div>
        </div>
    )
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;