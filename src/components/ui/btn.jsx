import React from 'react';

export default function Button({ text, onClick, className = "", textClass = "", svgClass = "" }) {
    return (
        <button
            onClick={onClick}
            className={`py-2.5 pl-5 pr-2.5 group cursor-pointer rounded-full bg-white flex items-center gap-5 ${className}`}
        >
            <div className={`flex flex-col h-[30px] justify-center overflow-hidden text-[#010101] relative text-base font-medium ${textClass}`}>
                <span className='translate-y-0 group-hover:-translate-y-[30px] group-hover:opacity-0 transition-all duration-300 w-max'>{text}</span>
                <span className='absolute top-full left-0  group-hover:-translate-y-[27px] opacity-0 group-hover:opacity-100 transition-all duration-300'>{text}</span>
            </div>
            <div className='size-9 rounded-full overflow-hidden bg-[#2EF943] relative flex justify-center items-center'>
                <div className='flex justify-center items-center translate-x-0 group-hover:translate-x-[30px] group-hover:opacity-0 transition-all duration-300'>
                    <svg className={`size-5 text-[#010101] ${svgClass}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path></svg>
                </div>
                <div className='transition-all duration-300 flex justify-center absolute items-center -translate-x-5 opacity-0 group-hover:translate-x-[0px] group-hover:opacity-100'>
                    <svg className={`size-5 text-[#010101] ${svgClass}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path></svg>
                </div>
            </div>
        </button>
    );
}