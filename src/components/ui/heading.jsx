import React, { memo } from 'react'
import SplitText from './splitText'

const Heading = memo(({
    text = "HEADING",
    className = "",
    containerClassName = "",
    showDot = true,
    dotColor = "bg-[#2EF943]",
    dotSize = "size-3",
    useSplitText = true,
    splitTextProps = {},
    onAnimationComplete,
    textAlign = "center",
    textSize = "text-xl",
    textWeight = "font-semibold",
    textColor = "",
    isUppercase = true,
    spacing = "pb-10"
}) => {
    const handleAnimationComplete = () => {
        if (onAnimationComplete) {
            onAnimationComplete(text);
        }
    };

    const defaultSplitTextProps = {
        text,
        className: `${textSize} ${isUppercase ? 'uppercase' : ''} ${textColor} ${textWeight} leading-none`,
        delay: 100,
        duration: 0.6,
        ease: "power3.out",
        splitType: "chars",
        from: { opacity: 0, y: 40 },
        to: { opacity: 1, y: 0 },
        threshold: 0.1,
        rootMargin: "-100px",
        textAlign,
        onLetterAnimationComplete: handleAnimationComplete,
        ...splitTextProps
    };

    return (
        <div className={`flex items-center gap-1.5 ${spacing} ${containerClassName}`}>
            {showDot && (
                <span className={`${dotSize} ${dotColor}`}></span>
            )}
            {useSplitText ? (
                <SplitText {...defaultSplitTextProps} />
            ) : (
                <h2 className={`${textSize} ${isUppercase ? 'uppercase' : ''} ${textColor} ${textWeight} leading-none ${className}`}>
                    {text}
                </h2>
            )}
        </div>
    )
});

Heading.displayName = 'Heading';

export default Heading;