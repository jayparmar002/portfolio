import { useEffect, useRef, useState } from 'react';

export default function CountUp({
    to,
    from = 0,
    direction = 'up',
    delay = 0,
    duration = 2,
    className = '',
    startWhen = true,
    separator = '',
    onStart,
    onEnd
}) {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const [currentValue, setCurrentValue] = useState(direction === 'down' ? to : from);

    const getDecimalPlaces = num => {
        const str = num.toString();
        if (str.includes('.')) {
            const decimals = str.split('.')[1];
            if (parseInt(decimals) !== 0) {
                return decimals.length;
            }
        }
        return 0;
    };

    const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

    // Intersection Observer for in-view detection
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    // Animation logic
    useEffect(() => {
        if (!isInView || !startWhen) return;

        if (typeof onStart === 'function') onStart();

        const startValue = direction === 'down' ? to : from;
        const endValue = direction === 'down' ? from : to;

        const startTime = Date.now() + delay * 1000;
        const totalDuration = duration * 1000;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / totalDuration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = startValue + (endValue - startValue) * easeOut;

            setCurrentValue(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                if (typeof onEnd === 'function') onEnd();
            }
        };

        const timeoutId = setTimeout(animate, delay * 1000);
        return () => clearTimeout(timeoutId);
    }, [isInView, startWhen, direction, from, to, delay, duration, onStart, onEnd]);

    // Format and display number
    useEffect(() => {
        if (ref.current) {
            const hasDecimals = maxDecimals > 0;
            const options = {
                useGrouping: !!separator,
                minimumFractionDigits: hasDecimals ? maxDecimals : 0,
                maximumFractionDigits: hasDecimals ? maxDecimals : 0
            };

            const formattedNumber = Intl.NumberFormat('en-US', options).format(currentValue);
            ref.current.textContent = separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
        }
    }, [currentValue, separator, maxDecimals]);

    return <span className={className} ref={ref} />;
}
