import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SplitText = ({
    text,
    className = '',
    delay = 100,
    duration = 0.6,
    ease = 'power3.out',
    splitType = 'chars',
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    threshold = 0.1,
    rootMargin = '-100px',
    textAlign = 'center',
    tag = 'p',
    onLetterAnimationComplete
}) => {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current || !text) return;

        const el = ref.current;
        const startPct = (1 - threshold) * 100;
        const start = `top ${startPct}%${rootMargin}`;

        // Simple text splitting without GSAP SplitText
        const splitText = (text, type) => {
            if (type === 'chars') {
                return text.split('').map((char, i) =>
                    char === ' ' ? ' ' : `<span class="split-char" style="display: inline-block;">${char}</span>`
                ).join('');
            } else if (type === 'words') {
                return text.split(' ').map(word =>
                    `<span class="split-word" style="display: inline-block;">${word}</span>`
                ).join(' ');
            }
            return text;
        };

        el.innerHTML = splitText(text, splitType);
        const targets = el.querySelectorAll('.split-char, .split-word');

        if (targets.length === 0) return;

        // Set initial state
        gsap.set(targets, from);

        // Create animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start,
                once: true,
                onComplete: onLetterAnimationComplete
            }
        });

        tl.to(targets, {
            ...to,
            duration,
            ease,
            stagger: delay / 1000
        });

        return () => {
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger === el) st.kill();
            });
        };
    }, [text, delay, duration, ease, splitType, from, to, threshold, rootMargin, onLetterAnimationComplete]);

    const Tag = tag;
    const style = {
        textAlign,
        wordWrap: 'break-word'
    };
    const classes = `split-parent overflow-hidden inline-block whitespace-normal ${className}`;

    return (
        <Tag ref={ref} style={style} className={classes}>
            {text}
        </Tag>
    );
};

export default SplitText;
