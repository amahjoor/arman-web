import PageLayout from '@/components/PageLayout';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import { FaCheck, FaArrowRight } from 'react-icons/fa';

export default function Services() {
  return (
    <>
      <Navbar />
      <PageLayout>
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <section className="mb-20 text-center opacity-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              Your Vision, Beautifully Crafted
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Whether you're a business, creator, or professional, I build stunning websites that help you stand out and connect with your audience.
            </p>
          </section>

          {/* Why Choose Me Section */}
          <section className="mb-20 opacity-0 animate-fade-in-delay">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                title="Modern & Beautiful"
                description="Clean, professional designs that make a lasting impression on your visitors."
              />
              <FeatureCard
                title="Built for Growth"
                description="Optimized for search engines and social sharing to help you reach more people."
              />
              <FeatureCard
                title="User-Focused"
                description="Intuitive interfaces that work perfectly on all devices and screen sizes."
              />
            </div>
          </section>

          {/* Portfolio Showcase Section */}
          <section className="mb-20 opacity-0 animate-fade-in-delay">
            <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* <ShowcaseItem
                title="Content Creators"
                category="Personal Brand"
                imagePath="/images/portfolio-example.jpg"
                description="Modern portfolio for a digital artist featuring a dynamic gallery and custom animations."
                link="https://kariyu101.com"
              /> */}
              <ShowcaseItem
                title="Project Management Platform"
                category="SaaS Application"
                imagePath="/images/startup-example.png"
                description="Comprehensive project management software with task tracking, team collaboration, analytics dashboards, and resource management capabilities."
                link="https://trycirclez.org"
              />
              <ShowcaseItem
                title="Music Artist Portfolio"
                category="Personal Brand"
                imagePath="/images/musician-example.png"
                description="Sleek portfolio website with integrated SoundCloud player for streaming tracks directly on site, comprehensive music platform links, and social media integration to connect with fans."
              />
              {/* <ShowcaseItem
                title="Restaurant Chain"
                category="Business Solution"
                imagePath="/images/restaurant-example.jpg"
                description="Full-featured website with online ordering, location finder, and menu management."
              /> */}
            </div>
          </section>

          {/* Services Section */}
          <section className="mb-20 opacity-0 animate-fade-in-delay">
            <h2 className="text-3xl font-bold mb-12 text-center">Services Offered</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ServiceCard
                title="Personal & Portfolio Websites"
                description="Stand out online with a professional website that showcases your work and personality."
                features={[
                  "Custom Design",
                  "Mobile Responsive",
                  "Portfolio Gallery",
                  "Social Media Integration",
                  "Blog Capability",
                  "Contact System"
                ]}
              />
              <ServiceCard
                title="Business Solutions"
                description="Establish a strong online presence that attracts customers and grows your business."
                features={[
                  "Brand-Aligned Design",
                  "SEO Optimization",
                  "Content Management",
                  "Analytics Integration",
                  "Lead Generation",
                  "Business Email Setup"
                ]}
              />
              <ServiceCard
                title="Custom Web Applications"
                description="Tailored solutions that streamline your workflows and enhance user experience."
                features={[
                  "User Management",
                  "Custom Features",
                  "Data Integration",
                  "Secure Hosting",
                  "Admin Controls",
                  "Regular Updates"
                ]}
              />
            </div>
          </section>

          {/* Process Section */}
          <section className="mb-20 opacity-0 animate-fade-in-delay-2">
            <h2 className="text-3xl font-bold mb-12 text-center">Development Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <ProcessStep
                number="01"
                title="Discovery"
                description="Understanding your business goals and requirements"
              />
              <ProcessStep
                number="02"
                title="Design"
                description="Creating wireframes and visual designs for approval"
              />
              <ProcessStep
                number="03"
                title="Development"
                description="Building your website with modern technologies"
              />
              <ProcessStep
                number="04"
                title="Launch"
                description="Testing, optimization, and deployment"
              />
            </div>
          </section>

          {/* CTA Section */}
          <section className="opacity-0 animate-fade-in-delay-2">
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Let's discuss how I can help bring your vision to life. Schedule a free consultation to explore the possibilities.
              </p>
              <Link
                href="mailto:amahjoor@gmu.edu?subject=Web Development Services Inquiry"
                className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full transition-colors text-lg"
              >
                Get in Touch <FaArrowRight className="text-sm" />
              </Link>
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}

// Helper Components
function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 rounded-lg bg-gray-800/50 border border-gray-700">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function ServiceCard({ title, description, features }: {
  title: string;
  description: string;
  features: string[];
}) {
  return (
    <div className="p-8 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-purple-500/50 transition-all hover:-translate-y-1">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <ul className="space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center text-gray-400">
            <FaCheck className="text-purple-400 mr-3 text-sm" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProcessStep({ number, title, description }: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-purple-400 mb-4">{number}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function ShowcaseItem({ title, category, imagePath, description, link }: {
  title: string;
  category: string;
  imagePath: string;
  description: string;
  link?: string;
}) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    if (link) {
      return (
        <Link href={link} target="_blank" rel="noopener noreferrer" className="block">
          {children}
        </Link>
      );
    }
    return <>{children}</>;
  };

  return (
    <Wrapper>
      <div className={`group relative overflow-hidden rounded-lg bg-gray-800/50 border border-gray-700 
        ${link ? 'hover:border-purple-500/50 cursor-pointer' : ''} transition-all`}>
        <div className="aspect-video relative">
          <Image
            src={imagePath}
            alt={title}
            fill
            className={`object-cover transition-transform duration-300 group-hover:scale-105`}
          />
        </div>
        <div className="p-6">
          <p className="text-purple-400 text-sm mb-2">{category}</p>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
    </Wrapper>
  );
} 