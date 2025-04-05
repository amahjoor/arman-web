import PageLayout from '@/components/PageLayout';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope, FaMicrophoneAlt } from 'react-icons/fa';

export default function About() {
  return (
    <>
      <Navbar />
      <PageLayout>
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <section className="mb-16 opacity-0 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">About Me</h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Computer Science student at George Mason University, passionate about leveraging technology for social good and building innovative solutions. Currently researching in robotics and developing full-stack applications.
            </p>
          </section>

          {/* Education Section */}
          <section className="mb-16 opacity-0 animate-fade-in-delay">
            <h2 className="text-2xl font-bold mb-4">Education</h2>
            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-semibold">George Mason University</h3>
              <p className="text-gray-400">B.S. Computer Science • Expected December 2025</p>
              <p className="text-gray-400">GPA: 3.5 • Positive Influence Award '23-'24 • Dean's List F22, S23, F24</p>
              <p className="text-gray-400 mt-4">Relevant Coursework:</p>
              <p className="text-gray-400">Data Structures and Algorithms, Data Mining, Autonomous Robotics, Deterministic Optimization, Linear Algebra, Discrete Mathematics, Low-Level Programming, Calculus III, Logic and Language Models for Computer Science</p>
            </div>
          </section>

          {/* Skills Section */}
          <section className="mb-16 opacity-0 animate-fade-in-delay">
            <h2 className="text-2xl font-bold mb-4">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SkillCategory 
                title="Proficient" 
                skills={[
                  "TypeScript/JavaScript",
                  "Next.js",
                  "React",
                  "TailwindCSS",
                  "Java",
                  "Python",
                  "Node.js",
                  "Git/GitHub",
                  "Unix",
                  "Vim",
                  "TensorFlow",
                  "scikit-learn",
                  "OpenCV",
                  "PostgreSQL",
                  "LLMs"
                ]} 
              />
              <SkillCategory 
                title="Experienced" 
                skills={[
                  "Microsoft Azure",
                  "C",
                  "HTML/CSS",
                  "PyTorch",
                  "Spring Boot",
                  "LaTeX",
                  "Flutter",
                  "Swift",
                  "ROS",
                  "R",
                  "AMPL"
                ]} 
              />
            </div>
          </section>

          {/* Experience Section */}
          <section className="mb-16 opacity-0 animate-fade-in-delay-2">
            <h2 className="text-2xl font-bold mb-4">Experience</h2>
            <div className="space-y-8">
              <ExperienceItem 
                title="Cofounder and CTO"
                company="Circlez"
                period="October 2024 - Present"
                description="Developed a full-stack application for project management within the manufacturing industry with Next.js, Typescript, React, TailwindCSS, PostgreSQL, Cloudflare."
              />
              <ExperienceItem 
                title="Software Engineer Intern"
                company="Cvrve"
                period="August 2024 - Present"
                description="Worked on Next.js frontend for a full-stack hackathon aggregation platform used by an average 1.5k users daily."
              />
              <ExperienceItem 
                title="Research Assistant"
                company="Autonomous Robotics Lab @ George Mason (RobotiXX)"
                period="September 2024 - Present"
                description="Annotated 200+ Spot robot images with predicted actions and instructions across diverse scenarios. Generated semantic map of GMU from LiDAR data, segmenting terrain into 5 classes."
              />
              <ExperienceItem 
                title="Researcher"
                company="OSCAR Undergraduate Student Research Program"
                period="May 2024 - August 2024"
                description="Trained 6 TensorFlow neural networks on 80k–160k math sequences to classify correctness and 4 error types, achieving 83% accuracy. Built a math error detection tool for handwritten worksheets using MathPIX OCR and GPT-4 for detailed feedback."
              />
              <ExperienceItem 
                title="Teaching Assistant"
                company="George Mason University Computer Science Department"
                period="January 2023 - May 2024"
                description="Created 13 intro to programming assignments, impacting over 100 students per semester since Spring 2023. Created 123 minutes of YouTube content on basic programming concepts. Assisted students in programming labs."
              />
              <ExperienceItem 
                title="Lead Mathematics Instructor"
                company="Mathnasium"
                period="December 2021 - January 2023"
                description="Managed 60+ student learning plans, trained 8 instructors, and developed a comprehensive instructor handbook."
              />
              <ExperienceItem 
                title="Center Assistant"
                company="Kumon"
                period="August 2018 - December 2021"
                description="Assisted in grading 24,000+ student folders with near-perfect accuracy, trained 6 instructors in teaching methodologies."
              />
            </div>
          </section>

          {/* Projects Section */}
          <section className="mb-16 opacity-0 animate-fade-in-delay-2">
            <h2 className="text-2xl font-bold mb-4">Featured Projects</h2>
            <div className="space-y-6">
              <ProjectItem 
                title="TED Talk Speech Assistant"
                tech="Next.js, Typescript, React, TailwindCSS, Firebase"
                description="Building a full-stack speech-writing assistant in collaboration with TEDx Wilmington, fine-tuning an LLM on TEDx frameworks like the 65-25-10 rule and Pledge–Turn–Prestige."
              />
              <ProjectItem 
                title="Aircraft Marshalling Pose Detection"
                tech="Python, MediaPipe, OpenCV, Scikit-learn, CSV, KNN"
                description="Built a real-time gesture classifier using MediaPipe to detect 3D body poses from custom video data. Developed a frame extraction and preprocessing pipeline and trained a KNN model for signal classification."
              />
              <ProjectItem 
                title="iWannaGraduate"
                tech="Next.js, TypeScript, React Flow, Python, BeautifulSoup"
                description="Engineered an interactive course dependency graph visualization with dynamic node highlighting & relationship tracking. Implemented category-based filtering and built data pipeline to extract academic course information."
              />
              <ProjectItem 
                title="Fluid Facilitator"
                tech="Python, OpenCV, Rust, Arduino, ArUco"
                description="Developed computer vision pipeline using OpenCV to detect & track ArUco markers for automated drink dispensing. Won 'Conquer the World' prize at George Mason University's PatriotHacks 2024."
              />
              <ProjectItem 
                title="Cvrve"
                tech="Next.js, React, TypeScript"
                description="Co-developing a full-stack event management platform for hackathons with over 5,000 users waitlisted."
                link="https://www.cvrve.me"
              />
              <ProjectItem 
                title="StrucSure"
                tech="Microsoft Azure, React, JavaScript, Node.js, Next.js, Vercel"
                description="Developed an AI-powered bridge damage detection system with 78% recall rate. Won 3rd Place for Best use of AI/ML Innovation."
              />
            </div>
          </section>

          {/* Leadership Section */}
          <section className="mb-16 opacity-0 animate-fade-in-delay-2">
            <h2 className="text-2xl font-bold mb-4">Leadership</h2>
            <div className="space-y-6">
              <LeadershipItem 
                title="Founding President"
                organization="Tech for Good"
                period="July 2023 – December 2024"
                description="Founded & grew Tech for Good from 0 to 200+ members. Launched initiative with Northern VA elderly centers, providing tech support and tutoring—resolved 30+ tech issues. Led hardware refurbishment with nonprofit partner; restored 200+ laptops for donation to underserved communities."
              />
              <LeadershipItem 
                title="Undersecretary for Information Technology"
                organization="George Mason University Student Government"
                period="September 2022 – October 2024"
                description="Represented 40,000+ students on technology policy at campus."
              />
            </div>
          </section>

          {/* Speaking Section */}
          <section className="mb-16 opacity-0 animate-fade-in-delay-2">
            <h2 className="text-2xl font-bold mb-4">Speaking</h2>
            <div className="space-y-6">
              <SpeakingItem
                title="Fireside Chat"
                venue="Penn State University"
                date="October 2024"
                topic="About Circlez: Journey from Idea to Implementation"
                description="Shared insights on balancing entrepreneurship with life, leadership lessons learned, and the personal journey behind co-founding Circlez."
                showIcon={false}
              />
              <SpeakingItem
                title="Technical Workshop"
                venue="George Mason University"
                date="April 2024"
                topic="Introduction to Artificial Intelligence"
                description="Led an interactive workshop introducing fundamental AI concepts, machine learning basics, and practical applications in modern software development."
                showIcon={true}
                link="https://youtu.be/Y5DEyoElLOI"
              />
              <SpeakingItem
                title="Workshop"
                venue="George Mason University"
                date="April 2024"
                topic="How to Have a Successful Hackathon Experience"
                description="Shared insights on hackathon preparation, team formation, project planning, and effective presentation techniques."
                showIcon={true}
                link="https://youtu.be/5b4tQbQWHgo"
              />
            </div>
          </section>

          {/* Contact Section */}
          <section className="opacity-0 animate-fade-in-delay-2">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <div className="flex space-x-6 text-xl">
              <Link 
                href="https://linkedin.com/in/armanmahjoor"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                <FaLinkedin />
              </Link>
              <Link 
                href="mailto:amahjoor@gmu.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                <FaEnvelope />
              </Link>
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}

// Helper Components
function SkillCategory({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span key={skill} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function ExperienceItem({ title, company, period, description }: { 
  title: string;
  company: string;
  period: string;
  description: string;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-400">{company} • {period}</p>
      <p className="text-gray-400 mt-2">{description}</p>
    </div>
  );
}

function ProjectItem({ title, tech, description, link }: {
  title: string;
  tech: string;
  description: string;
  link?: string;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-500 text-sm">{tech}</p>
      <p className="text-gray-400 mt-2">{description}</p>
      {link && (
        <Link href={link} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 mt-2 inline-block">
          View Project →
        </Link>
      )}
    </div>
  );
}

function LeadershipItem({ title, organization, period, description }: {
  title: string;
  organization: string;
  period: string;
  description: string;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-400">{organization} • {period}</p>
      <p className="text-gray-400 mt-2">{description}</p>
    </div>
  );
}

function SpeakingItem({ title, venue, date, topic, description, showIcon = true, link }: {
  title: string;
  venue: string;
  date: string;
  topic: string;
  description: string;
  showIcon?: boolean;
  link?: string;
}) {
  const Content = () => (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-400">{venue} • {date}</p>
        </div>
        {showIcon && (
          <div className="text-purple-400">
            <FaMicrophoneAlt />
          </div>
        )}
      </div>
      <p className="text-gray-300 mt-1">{topic}</p>
      <p className="text-gray-400 mt-2">{description}</p>
    </div>
  );

  if (link) {
    return (
      <Link href={link} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">
        <Content />
      </Link>
    );
  }

  return <Content />;
}