import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SpaceCard from './SpaceCard';
import TextMorph from './TextMorph';
import { Parallax } from 'react-scroll-parallax';
const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    category: 'Web Development',
    image: '/images/projects/ecommerce.jpg',
    description: 'A modern e-commerce platform with real-time inventory management.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: '#'
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    category: 'Mobile Development',
    image: '/images/projects/banking.jpg',
    description: 'Secure mobile banking application with biometric authentication.',
    technologies: ['React Native', 'Firebase', 'Redux', 'JWT'],
    link: '#'
  },
  {
    id: 3,
    title: 'Design System',
    category: 'UI/UX Design',
    image: '/images/projects/design-system.jpg',
    description: 'Comprehensive design system for enterprise applications.',
    technologies: ['Figma', 'Storybook', 'React', 'Styled Components'],
    link: '#'
  },
  {
    id: 4,
    title: 'Cloud Migration',
    category: 'Cloud Solutions',
    image: '/images/projects/cloud.jpg',
    description: 'Enterprise cloud migration and infrastructure optimization.',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    link: '#'
  },
  {
    id: 5,
    title: 'Social Media Dashboard',
    category: 'Web Development',
    image: '/images/projects/dashboard.jpg',
    description: 'Real-time social media analytics and management platform.',
    technologies: ['React', 'GraphQL', 'D3.js', 'Node.js'],
    link: '#'
  },
  {
    id: 6,
    title: 'IoT Platform',
    category: 'Cloud Solutions',
    image: '/images/projects/iot.jpg',
    description: 'IoT device management and data analytics platform.',
    technologies: ['AWS IoT', 'React', 'Python', 'TensorFlow'],
    link: '#'
  }
];

const categories = ['All', 'Web Development', 'Mobile Development', 'UI/UX Design', 'Cloud Solutions'];

export default function ThemeWithFilter() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [ref, inView] = useInView({ triggerOnce: true });

  const filteredProjects = projects.filter(project => 
    selectedCategory === 'All' || project.category === selectedCategory
  );

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-20">
      <Parallax speed={10}>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className=" orbitron rubik-glitch text-4xl md:text-5xl font-bold text-center text-gray-300 mb-12 bg-gradient-to-b from-gray-700 via-gray-700 via-gray-700 to-cyan-400 text-transparent bg-clip-text"
          >
            SPECTRUMS
          </motion.h2>
          {/* <div className="w-1/2 mx-auto h-40 relative mt-8">

          <motion.div 
            className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent h-[2px] w-3/4 blur-sm"
            animate={{
              opacity: [0.5, 1, 0.5],
              scaleX: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent h-[5px] w-3/4"
            animate={{
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent h-[5px] w-1/4 blur-sm"
            animate={{
              opacity: [0.3, 1, 0.3],
              scaleY: [1, 1.5, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="absolute inset-x-70 top-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent h-[5px] w-1/4"
            animate={{
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />

          

        </div> */}
        </Parallax>

      </div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {categories.map((category) => (
          <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`relative px-6 py-2 rounded-full font-orbit transition-all duration-300 overflow-hidden
            ${selectedCategory === category
              ? 'bg-purple-600 text-white'
              : 'bg-black border border-cyan-400 text-white'
            } glitch-btn`}
        >
          <span className="relative z-10">{category}</span>
        </button>
        
        ))}
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        <AnimatePresence mode="wait">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <SpaceCard
                shineColor="rgba(255, 255, 255, 0.2)"
                className="h-full"
              >
                {/* Project Image */}
                <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-black/80 to-transparent" />
                </div>

                {/* Project Info */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-orbit text-space-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-space-white/70 mb-4">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-space-white/10 rounded-full text-sm
                          text-space-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View Project Link */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-space-white hover:text-space-white/80
                      transition-colors duration-300"
                  >
                    View Project
                    <span className="ml-2">→</span>
                  </a>
                </div>
              </SpaceCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mt-20"
      >
        <SpaceCard className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-orbit text-space-white mb-6">
            Ready to Start Your Project?
          </h2>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-space-white text-space-black
              rounded-full font-orbit hover:bg-space-white/90 transition-colors duration-300"
          >
            Get in Touch
          </a>
        </SpaceCard>
      </motion.div>
    </div>
  );
} 