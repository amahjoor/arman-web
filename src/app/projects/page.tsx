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
    title: "cvrve",
    description: "A full-stack event management platform focused on building a comprehensive resource for hackathon searches. Currently has a waitlist of over 5,000 users.",
    tech: ["Next.js", "React", "TypeScript"],
    link: "https://www.cvrve.me",
    status: "In Development",
    date: "August 2024 - Present"
  },
  {
    title: "StrucSure",
    description: "AI-powered bridge damage detection system using Azure Custom Vision. Achieved 78% recall and 57.6% mAP rates for identifying damaged bridge points. Won 3rd Place for Best use of AI/ML Innovation at UMD Hackathon.",
    tech: ["Microsoft Azure", "React", "JavaScript", "Node.js", "Next.js", "Vercel"],
    date: "April 2024"
  },
  {
    title: "LLM-powered RAG Model",
    description: "Developing a Retrieval-Augmented Generation model to enhance internal productivity for GMU Student Government.",
    tech: ["Python", "OpenAI API", "TensorFlow"],
    date: "2024"
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
            <h2 className="text-lg font-semibold mb-3">Filter by Technology</h2>
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
    <div className="group bg-gray-900/50 rounded-lg p-6 hover:bg-gray-900/70 transition-all duration-300 flex flex-col h-full">
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
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-purple-900/50 rounded-full text-sm text-purple-300">
            {project.status}
          </span>
        </div>
      )}
    </div>
  );
}