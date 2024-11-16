import GradientText from '@/components/GradientText';
import Navbar from '@/components/Navbar';
import PageLayout from '@/components/PageLayout';
import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <Navbar />
      <PageLayout>
        <section className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] gap-6 md:gap-8">
          <div className="opacity-0 animate-fade-in">
            <GradientText>
              Arman Mahjoor
            </GradientText>
          </div>

          <p className="text-base md:text-lg lg:text-xl text-gray-400 max-w-2xl text-center px-4 opacity-0 animate-fade-in-delay">
            Software Engineer based in Virginia. <br className="hidden sm:block" />
            Currently building innovative solutions at <Link href="https://trycirclez.org" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-gray-400 transition-colors">Circlez</Link> and <Link href="https://cvrve.me" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-gray-400 transition-colors">Cvrve</Link>. <br className="hidden sm:block" />
            Passionate about tech, reading, and continuous learning.
          </p>

          <div className="flex space-x-6 text-lg md:text-xl lg:text-2xl opacity-0 animate-fade-in-delay-2">
            <Link 
              href="https://github.com/amahjoor" 
              className="hover:text-gray-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </Link>
            <Link 
              href="https://linkedin.com/in/armanmahjoor" 
              className="hover:text-gray-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </Link>
            <Link 
              href="mailto:armansmahjoor@gmail.com" 
              className="hover:text-gray-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaEnvelope />
            </Link>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
