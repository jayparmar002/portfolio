import React, { useState, useEffect, useRef } from "react";
import Heading from "../../../ui/heading";
import ServiceCard from "../../../ui/serviceCard";

export default function Services() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const handleAnimationComplete = () => {
        console.log("All letters have animated!");
    };

    // 👇 Services data array
    const servicesData = [
        {
            id: "01",
            number: "01",
            title: "UI/UX Design",
            description:
                "A Digital Designer is a professional who creates visual content for digital platforms, using design principles to enhance user experience and brand identity.",
            link: "/services/ui-ux-design",
        },
        {
            id: "02",
            number: "02",
            title: "Web Design",
            description:
                "We build high-performance, responsive websites with modern technologies to ensure your business stands out online and delivers seamless user experiences.",
            link: "/services/web-design",
        },
        {
            id: "03",
            image: "src/assets/image/mockup.png"
        },
        {
            id: "04",
            image: "src/assets/image/mockup-two.png"
        },
        {
            id: "05",
            number: "03",
            title: "Digital Marketing",
            description:
                "Our team crafts mobile applications that are user-friendly, scalable, and optimized for both iOS and Android platforms.",
            link: "/services/digital-marketing",
        },
        {
            id: "06",
            number: "04",
            title: "SEO Optimization",
            description:
                "Our team crafts mobile applications that are user-friendly, scalable, and optimized for both iOS and Android platforms.",
            link: "/services/seo-optimization",
        },
    ];

    // Intersection Observer for section visibility
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="py-28">
            <div className="container mx-auto px-4">
                <div className="flex flex-col">
                    {/* Section Title */}
                    <Heading
                        text="SERVICES"
                        textColor='text-white'
                        onAnimationComplete={handleAnimationComplete}
                    />

                    {/* Service Cards Loop */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {servicesData.map((service, index) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                index={index}
                                isVisible={isVisible}
                                animationDelay={200}
                                useSplitText={true}
                                showIcon={true}
                                showCategory={true}
                                imageOnly={service.id === "03" || service.id === "04"}
                                onAnimationComplete={handleAnimationComplete}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
