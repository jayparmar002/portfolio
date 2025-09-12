import React, { useRef, useMemo } from 'react';

const GradualBlur = ({
    position = 'bottom',
    strength = 2,
    height = '6rem',
    divCount = 5,
    opacity = 1,
    zIndex = 1000,
    className = '',
    style = {}
}) => {
    const containerRef = useRef(null);

    const getGradientDirection = (pos) => {
        const directions = {
            top: 'to top',
            bottom: 'to bottom',
            left: 'to left',
            right: 'to right'
        };
        return directions[pos] || 'to bottom';
    };

    const blurDivs = useMemo(() => {
        const divs = [];
        const increment = 100 / divCount;
        const direction = getGradientDirection(position);

        for (let i = 1; i <= divCount; i++) {
            const progress = i / divCount;
            const blurValue = 0.0625 * (progress * divCount + 1) * strength;

            const p1 = Math.round((increment * i - increment) * 10) / 10;
            const p2 = Math.round(increment * i * 10) / 10;
            const p3 = Math.round((increment * i + increment) * 10) / 10;
            const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

            let gradient = `transparent ${p1}%, black ${p2}%`;
            if (p3 <= 100) gradient += `, black ${p3}%`;
            if (p4 <= 100) gradient += `, transparent ${p4}%`;

            const divStyle = {
                position: 'absolute',
                inset: '0',
                maskImage: `linear-gradient(${direction}, ${gradient})`,
                WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
                backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
                WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
                opacity
            };

            divs.push(<div key={i} style={divStyle} />);
        }

        return divs;
    }, [position, strength, divCount, opacity]);

    const containerStyle = useMemo(() => {
        const isVertical = ['top', 'bottom'].includes(position);
        const isHorizontal = ['left', 'right'].includes(position);

        const baseStyle = {
            position: 'fixed',
            pointerEvents: 'none',
            zIndex,
            ...style
        };

        if (isVertical) {
            baseStyle.height = height;
            baseStyle.width = '100%';
            baseStyle[position] = 0;
            baseStyle.left = 0;
            baseStyle.right = 0;
        } else if (isHorizontal) {
            baseStyle.width = height;
            baseStyle.height = '100%';
            baseStyle[position] = 0;
            baseStyle.top = 0;
            baseStyle.bottom = 0;
        }

        return baseStyle;
    }, [position, height, zIndex, style]);

    return (
        <div
            ref={containerRef}
            className={`gradual-blur ${className}`}
            style={containerStyle}
        >
            <div className="gradual-blur-inner relative w-full h-full">
                {blurDivs}
            </div>
        </div>
    );
};

export default React.memo(GradualBlur);
