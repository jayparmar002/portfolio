import React from 'react'
import HeroSection from './sections/heroSection'
import AboutUs from './sections/aboutUs'
import Services from './sections/services'
import Project from './sections/project'

export default function Home() {
    return (
        <>
            <HeroSection />
            <AboutUs />
            <Services />
            <Project />

        </>
    )
}