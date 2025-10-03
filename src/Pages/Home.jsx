import React from "react";

// Using lucide-react for modern, clean icons.
// You might need to install it: npm install lucide-react
import {
  DollarSign,
  BarChart2,
  Zap,
  BrainCircuit,
  ShieldCheck,
  MoveRight,
  Star,
} from "lucide-react";

// --- Reusable Components ---

const FeatureCard = ({ icon, title, children }) => (
  <div className="bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-blue-500/20 transition-shadow duration-300 transform hover:-translate-y-1 border border-slate-700">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-900/50 text-blue-400 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-100 mb-2">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{children}</p>
  </div>
);

const TestimonialCard = ({ name, role, avatar, children }) => (
  <div className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700 text-center">
    <img
      src={avatar}
      alt={name}
      className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-blue-500"
    />
    <p className="text-slate-400 italic mb-4">"{children}"</p>
    <div className="flex justify-center items-center text-yellow-500 mb-2">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-current" />
      ))}
    </div>
    <h4 className="font-bold text-slate-100">{name}</h4>
    <p className="text-sm text-slate-500">{role}</p>
  </div>
);

// --- Main Page Sections ---

const HeroSection = () => (
  <section className="pt-32 pb-20 bg-slate-900 text-center">
    <div className="container mx-auto px-6">
      <h1 className="text-4xl md:text-6xl font-extrabold text-slate-100 leading-tight mb-4">
        Master Your Money with <span className="text-blue-500">AI-Powered</span>{" "}
        Insights
      </h1>
      <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-8">
        NidhiBook is the smartest way to track your expenses, manage your
        income, and make intelligent financial decisions. Stop guessing, start
        growing.
      </p>
      <div className="flex justify-center items-center space-x-4">
        <a
          href="/signup"
          className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
        >
          Get Started for Free
        </a>
        <a
          href="#features"
          className="flex items-center text-slate-300 font-semibold group"
        >
          Learn More{" "}
          <MoveRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
      <div className="mt-16">
        <img
          src="https://placehold.co/1000x500/1E293B/A3BFFA?text=NidhiBook+Dashboard+UI"
          alt="NidhiBook Dashboard"
          className="rounded-xl shadow-2xl mx-auto border-4 border-slate-700"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/1000x500/1E293B/A3BFFA?text=App+Preview";
          }}
        />
      </div>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section id="features" className="py-20 bg-black">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Everything You Need for Financial Clarity
        </h2>
        <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
          Track, analyze, and optimize your finances with our powerful suite of
          tools.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard icon={<DollarSign />} title="Effortless Tracking">
          Quickly log your daily income and expenses on the go. Categorize
          transactions to see where your money truly goes.
        </FeatureCard>
        <FeatureCard icon={<BarChart2 />} title="Visual Reports">
          Understand your financial health at a glance with beautiful,
          easy-to-read charts and graphs.
        </FeatureCard>
        <FeatureCard icon={<Zap />} title="Smart Budgeting">
          Create custom budgets that work for you. We'll notify you when you're
          approaching your limits to keep you on track.
        </FeatureCard>
        <FeatureCard icon={<BrainCircuit />} title="AI-Powered Advice">
          Our AI analyzes your spending habits to provide personalized tips and
          uncover potential savings you might have missed.
        </FeatureCard>
        <FeatureCard icon={<ShieldCheck />} title="Bank-Level Security">
          Your financial data is encrypted and secure. We prioritize your
          privacy and safety above all else.
        </FeatureCard>
        <FeatureCard icon={<MoveRight />} title="Goal Setting">
          Define your financial goals, from saving for a vacation to a down
          payment, and track your progress effortlessly.
        </FeatureCard>
      </div>
    </div>
  </section>
);

const AiPowerSection = () => (
  <section id="ai-power" className="py-20 bg-slate-900">
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2">
          <img
            src="https://placehold.co/600x500/3B82F6/FFFFFF?text=AI+Decision+Engine"
            alt="AI helping with financial decisions"
            className="rounded-xl shadow-2xl"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/600x500/3B82F6/FFFFFF?text=AI+Feature";
            }}
          />
        </div>
        <div className="lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
            Let Our AI Be Your Financial Co-Pilot
          </h2>
          <p className="text-slate-400 mb-6 leading-relaxed">
            NidhiBook's intelligent core does more than just count your money.
            It acts as your personal financial analyst, working 24/7 to help you
            make smarter decisions.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <Zap className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-1" />
              <span>
                <strong className="text-slate-200">Identify Trends:</strong>{" "}
                Automatically detects your spending patterns and highlights
                areas for improvement.
              </span>
            </li>
            <li className="flex items-start">
              <Zap className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-1" />
              <span>
                <strong className="text-slate-200">Forecast Future:</strong>{" "}
                Predicts upcoming bills and potential cash flow issues so you
                can plan ahead.
              </span>
            </li>
            <li className="flex items-start">
              <Zap className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-1" />
              <span>
                <strong className="text-slate-200">Personalized Nudges:</strong>{" "}
                Get timely, actionable advice tailored to your unique financial
                situation to help you save more.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section id="testimonials" className="py-20 bg-black">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Loved by Users Worldwide
        </h2>
        <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our users are saying.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TestimonialCard
          name="Priya Sharma"
          role="Software Developer"
          avatar="https://placehold.co/100x100/E0E7FF/4338CA?text=PS"
        >
          NidhiBook has completely changed how I manage my finances. The AI
          insights are a game-changer! I've saved more in the last 3 months than
          I did in the entire previous year.
        </TestimonialCard>
        <TestimonialCard
          name="Rahul Verma"
          role="Freelance Designer"
          avatar="https://placehold.co/100x100/DBEAFE/1E40AF?text=RV"
        >
          As a freelancer, my income fluctuates. This app helps me stay on top
          of everything. The budgeting tools are simple, powerful, and keep me
          from overspending.
        </TestimonialCard>
        <TestimonialCard
          name="Anjali Mehta"
          role="Marketing Manager"
          avatar="https://placehold.co/100x100/C7D2FE/4F46E5?text=AM"
        >
          I finally feel in control of my money. The visual reports make it so
          easy to see where my money is going. Highly recommend to anyone
          looking to improve their financial literacy.
        </TestimonialCard>
      </div>
    </div>
  </section>
);

const CtaSection = () => (
  <section className="bg-blue-600 text-white">
    <div className="container mx-auto px-6 py-20 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Ready to Transform Your Financial Future?
      </h2>
      <p className="text-blue-200 max-w-2xl mx-auto mb-8">
        Join thousands of users who are building a better financial life with
        NidhiBook. It's free to get started!
      </p>
      <a
        href="#"
        className="bg-white text-blue-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-blue-100 transition-all duration-300 shadow-2xl transform hover:scale-105"
      >
        Sign Up Now - It's Free!
      </a>
    </div>
  </section>
);

// --- The Main Home Page Component ---

const Home = () => {
  return (
    <div className="bg-slate-900 font-sans text-slate-300">
      <main>
        <HeroSection />
        <FeaturesSection />
        <AiPowerSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
    </div>
  );
};

export default Home;
