'use client';

import PageLayout from '@/components/PageLayout';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useState } from 'react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  image?: string;
  status?: string;
  date: string;
}

const projects: Project[] = [
  {
    title: "Circlez",
    description: "PM software for manufacturing facilities.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind", "Vercel", "MongoDB"],
    link: "https://www.circlez-online.com",
    status: "In Development",
    date: "August 2024 - Present"
  },
  {
    title: "Cvrve",
    description: "A full-stack hackathon and job aggregation platform. currently has 60,000+ users.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind", "Vercel"],
    link: "https://www.cvrve.me",
    status: "In Development",
    date: "August 2024 - Present"
  },
  {
    title: "Fluid Facilitator",
    description: "Built a two-axis robot with computer vision pipeline that identifies and tracks Aruco markers for automated drink delivery. Won award at PatriotHacks 2024.",
    tech: ["Python", "OpenCV", "Arduino", "Computer Vision"],
    link: "https://devpost.com/software/fluid-flicker",
    status: "Completed",
    date: "October 2024"
  },
  {
    title: "StrucSure",
    description: "AI-powered bridge damage detection system using Azure Custom Vision. Achieved 78% recall and 57.6% mAP rates for identifying damaged bridge points. Won 3rd Place for Best use of AI/ML Innovation at UMD Hackathon.",
    tech: ["Microsoft Azure", "React", "JavaScript", "Node.js", "Next.js", "Vercel"],
    github: "https://github.com/amahjoor/strucsure",
    link: "https://devpost.com/software/strucsure",
    status: "Completed",
    date: "April 2024"
  },
  {
    title: "GrocerAi",
    description: "A web app that creates personalized shopping lists and finds the most efficient route through stores using Dijkstra's algorithm. Integrated with Kroger API and LangChain for NLP.",
    tech: ["React", "Node.js", "Python", "LangChain", "Azure", "JavaScript"],
    link: "https://devpost.com/software/grocerai",
    status: "Completed",
    date: "February 2024"
  },
  {
    title: "Pomodoro Timer",
    description: "A hardware-based timer designed to assist veterans with PTSD and Combat Stress in maintaining focus. Features 25-minute work intervals with customizable break periods, LED indicators, and an adjustable LCD display.",
    tech: ["Arduino", "C", "Hardware", "LCD", "Electronics"],
    link: "https://devpost.com/software/pomodoro-timer-2nhiq1",
    status: "Completed",
    date: "September 2024"
  },
  {
    title: "EmojAi",
    description: "An AI-powered emoji generator that creates unique text-based emojis based on user descriptions using Azure OpenAI. Built with a focus on expanding beyond traditional emoji limitations.",
    tech: ["Python", "Azure", "OpenAI", "Flask", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/amahjoor/emojAi",
    status: "Completed",
    date: "January 2024"
  }
];

const allTechnologies = Array.from(
  new Set(projects.flatMap(project => project.tech))
).sort();

export default function Projects() {
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  const filteredProjects = projects.filter(project => 
    selectedTech.length === 0 || 
    selectedTech.some(tech => project.tech.includes(tech))
  );

  const toggleTech = (tech: string) => {
    setSelectedTech(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  return (
    <>
      <Navbar />
      <PageLayout>
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 opacity-0 animate-fade-in">
            Projects
          </h1>
          
          <div className="mb-8 opacity-0 animate-fade-in-delay">
            <h2 className="text-lg font-semibold mb-3">Technology</h2>
            <div className="flex flex-wrap gap-2">
              {allTechnologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => toggleTech(tech)}
                  className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                    selectedTech.includes(tech)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-0 animate-fade-in-delay-2">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <p className="text-gray-400 text-center mt-8">
              No projects found with the selected technologies.
            </p>
          )}
        </div>
      </PageLayout>
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group bg-gray-900/50 rounded-lg p-6 hover:bg-gray-900/70 transition-all duration-300 flex flex-col h-full relative">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold mb-2">{project.title}</h2>
          <p className="text-gray-400 text-sm">{project.date}</p>
        </div>
        <div className="flex gap-4">
          {project.github && (
            <Link 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaGithub size={20} />
            </Link>
          )}
          {project.link && (
            <Link 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaExternalLinkAlt size={18} />
            </Link>
          )}
        </div>
      </div>

      <p className="text-gray-300 mb-4 flex-grow">{project.description}</p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tech.map((tech, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-gray-800/50 rounded-full text-sm text-gray-300"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.status && (
        <div className={`absolute top-4 ${project.github ? 'right-24' : project.link ? 'right-16' : 'right-4'}`}>
          <span className={`px-3 py-1 rounded-full text-sm ${
            project.status === "Completed" 
              ? 'bg-green-900/50 text-green-300' 
              : 'bg-purple-900/50 text-purple-300'
          }`}>
            {project.status}
          </span>
        </div>
      )}
    </div>
  );
}