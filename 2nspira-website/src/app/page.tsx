import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image - High Resolution, No Lazy Load */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url("/hero-human-warmth.jpg")' 
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg md:text-xl font-medium mb-3">
            For leaders of small and mission-driven organizations
          </p>
          
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Human-centered technology transformation and practical AI adoption
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            2Nspira helps you turn technology change into durable outcomes — practical AI enablement, process optimization, and fractional technology leadership, built so your teams trust their systems instead of managing them.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/ai-enablement"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore AI enablement
            </Link>
            
            <Link 
              href="/fractional-cio"
              className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Explore fractional leadership
            </Link>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            What we do
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* AI Enablement */}
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <Link href="/ai-enablement" className="block group">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 mb-3">
                  AI Enablement & Governance
                </h3>
                <p className="text-gray-600 mb-4">
                  Pragmatic AI strategy and governance frameworks for responsible implementation — readiness, guardrails, and workflows your people will actually use.
                </p>
                <div className="flex items-center text-blue-600 font-medium">
                  Outcome: a clear, responsible path to AI adoption your teams can follow.
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>

            {/* Systems & Process */}
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <Link href="/systems-process" className="block group">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 mb-3">
                  Systems & Process Optimization
                </h3>
                <p className="text-gray-600 mb-4">
                  Streamlined operations powered by appropriate technology — mapping friction, designing efficient workflows, and building sustainable improvements.
                </p>
                <div className="flex items-center text-blue-600 font-medium">
                  Outcome: less friction in day-to-day operations, and processes that hold up over time.
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>

            {/* Technology Leadership */}
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <Link href="/fractional-cio" className="block group">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 mb-3">
                  Technology Leadership
                </h3>
                <p className="text-gray-600 mb-4">
                  Fractional CTO guidance, architecture reviews, and transformation pathways that align technology investment with business outcomes.
                </p>
                <div className="flex items-center text-blue-600 font-medium">
                  Outcome: technology decisions that follow your business priorities, not the other way around.
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Our approach
          </h2>
          
          <p className="text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto">
            Technology must serve people — not the other way around. Our human-centered philosophy ensures that AI systems, workflow changes, and technology implementations are designed for actual use.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {/* People First */}
            <div>
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">People First</h3>
              <p className="text-gray-600">Technology serves people, never the reverse.</p>
            </div>

            {/* Process Clarity */}
            <div>
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Process Clarity</h3>
              <p className="text-gray-600">Work flows your team can follow without a manual.</p>
            </div>

            {/* Data Integrity */}
            <div>
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 12c0 5.591 3.898 10.29 9 11.622V21M7.29 21h15.42M9 12h6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Integrity</h3>
              <p className="text-gray-600">Decisions grounded in information you can trust.</p>
            </div>

            {/* Practical AI */}
            <div>
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Practical AI</h3>
              <p className="text-gray-600">Solutions that solve real problems today.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-center text-gray-400 text-sm">
        © 2026 2Nspira. All rights reserved.
      </footer>
    </div>
  );
}
