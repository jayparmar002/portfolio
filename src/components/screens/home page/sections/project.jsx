import React from 'react'
import Heading from '../../../ui/heading'

// Project data array - exactly 5 projects for the 2-1-2 layout
const projectsData = [
    {
        id: 1,
        title: "Smart Home Automation",
        year: "2025",
        client: "Eco.dev",
        image: "/src/assets/image/mockup.png"
    },
    {
        id: 2,
        title: "E-Commerce Platform",
        year: "2024",
        client: "ShopTech",
        image: "/src/assets/image/mockup-two.png"
    },
    {
        id: 3,
        title: "Mobile Banking App",
        year: "2024",
        client: "FinanceFlow",
        image: "/src/assets/image/mockup.png"
    },
    {
        id: 4,
        title: "Healthcare Dashboard",
        year: "2023",
        client: "MediCare+",
        image: "/src/assets/image/mockup-two.png"
    },
    {
        id: 5,
        title: "Learning Management System",
        year: "2023",
        client: "EduTech",
        image: "/src/assets/image/mockup.png"
    }
];

// Project Card Component
const ProjectCard = ({ project, index, layout = 'default' }) => {
    const getCardClasses = () => {
        switch (layout) {
            case 'right-aligned':
                return 'w-full md:w-1/2 flex justify-end';
            case 'left-aligned':
                return 'w-full md:w-1/2';
            case 'centered':
                return 'w-full md:w-1/2';
            case 'bottom-aligned':
                return 'w-full md:w-1/2 flex items-end';
            default:
                return 'w-full md:w-1/2';
        }
    };

    const getInnerClasses = () => {
        switch (layout) {
            case 'right-aligned':
            case 'bottom-aligned':
                return 'w-4/5 flex flex-col gap-5';
            default:
                return 'w-full flex flex-col gap-5';
        }
    };

    return (
        <div className={getCardClasses()}>
            <div className={getInnerClasses()}>
                <img
                    src={project.image}
                    className='w-full aspect-video object-cover rounded-lg'
                    alt={project.title}
                />
                <div className='w-full flex gap-5'>
                    <span className='text-[#010101]/50 text-base uppercase font-medium'>
                        {String(index + 1).padStart(3, '0')}.
                    </span>
                    <div className='flex flex-col flex-1'>
                        <h6 className='text-base uppercase font-medium'>{project.title}</h6>
                        <p className='text-base text-[#010101]/50 font-medium'>{project.year}</p>
                    </div>
                    <span className='text-[#010101]/50 text-base uppercase font-medium'>
                        {project.client}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default function Project() {
    const handleAnimationComplete = () => {
        console.log("All letters have animated!");
    };

    return (
        <section className='py-28 bg-white'>
            <div className="container mx-auto px-4">
                <div className='flex flex-col'>
                    <Heading
                        text="PROJECTS"
                        textColor='text-[#010101]'
                        onAnimationComplete={handleAnimationComplete}
                    />

                    {/* Row 1: Two projects */}
                    <div className="flex flex-col md:flex-row gap-5">
                        <ProjectCard
                            project={projectsData[0]}
                            index={0}
                            layout="left-aligned"
                        />
                        <ProjectCard
                            project={projectsData[1]}
                            index={1}
                            layout="right-aligned"
                        />
                    </div>

                    {/* Row 2: One centered project */}
                    <div className="flex flex-col md:flex-row justify-center gap-5 mt-5">
                        <ProjectCard
                            project={projectsData[2]}
                            index={2}
                            layout="centered"
                        />
                    </div>

                    {/* Row 3: Two projects */}
                    <div className="flex flex-col md:flex-row gap-5 mt-5">
                        <ProjectCard
                            project={projectsData[3]}
                            index={3}
                            layout="bottom-aligned"
                        />
                        <ProjectCard
                            project={projectsData[4]}
                            index={4}
                            layout="left-aligned"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}