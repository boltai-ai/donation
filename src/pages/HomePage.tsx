import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, BarChart3, Truck, Users, Package, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';

const HomePage: React.FC = () => {
  const { theme } = useTheme();
  
  const features = [
    {
      icon: Heart,
      title: 'AI-Powered Matching',
      description: 'Our intelligent algorithms match donations with recipients based on urgent needs, location, and other factors.',
    },
    {
      icon: BarChart3,
      title: 'Impact Tracking',
      description: 'Visualize the real-world impact of your donations with detailed analytics and transparency.',
    },
    {
      icon: Truck,
      title: 'Smart Logistics',
      description: 'Optimize delivery routes using advanced routing algorithms to reduce transportation costs and delivery time.',
    },
    {
      icon: Package,
      title: 'Inventory Management',
      description: 'AI-powered inventory system helps NGOs track donations in real-time and manage resources efficiently.',
    },
  ];
  
  const testimonials = [
    {
      quote: "The AI matching system transformed how we distribute donations. We're now reaching people most in need with 40% less resource waste.",
      author: "Sarah Johnson",
      role: "Director, Hope Community Center"
    },
    {
      quote: "The transparency provided by the blockchain system gives our donors confidence that their contributions are making a real difference.",
      author: "Michael Chen",
      role: "Fundraising Manager, Global Aid Initiative"
    },
    {
      quote: "As a regular donor, I can now see exactly where my donations go and the impact they're making. It's incredibly rewarding.",
      author: "Emily Rodriguez",
      role: "Monthly Donor"
    }
  ];
  
  return (
    <div className="space-y-20 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl opacity-90"></div>
        <div className="relative px-8 py-16 md:py-24 rounded-2xl overflow-hidden">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              AI-Powered Charity Network
            </h1>
            <p className="text-lg md:text-xl text-white opacity-90 mb-8">
              Revolutionizing donations through artificial intelligence and blockchain technology. Connect donors with recipients in real-time, maximize impact, and ensure complete transparency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Make a Donation
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:bg-opacity-20"
              >
                Learn How It Works
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Stats */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-5xl px-4">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } rounded-xl shadow-lg p-8`}>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">2,856</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Donations Made</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">97</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Partner NGOs</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">14,280</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">People Helped</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">$124K</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Funds Distributed</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="pt-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform combines AI, blockchain, and logistics optimization to create a seamless donation experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`p-6 rounded-xl text-center ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-blue-100 dark:bg-blue-900 animate-ping opacity-25"></div>
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">1</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Donate</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Register and make a donation. Upload photos of items or specify monetary amounts.
              </p>
            </div>
            
            <div className={`p-6 rounded-xl text-center ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-teal-100 dark:bg-teal-900 animate-ping opacity-25"></div>
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900">
                  <span className="text-xl font-bold text-teal-600 dark:text-teal-400">2</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Matching</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI system matches your donation with the most suitable recipients based on urgency and need.
              </p>
            </div>
            
            <div className={`p-6 rounded-xl text-center ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-orange-100 dark:bg-orange-900 animate-ping opacity-25"></div>
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900">
                  <span className="text-xl font-bold text-orange-600 dark:text-orange-400">3</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Impact</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor the journey of your donation through our transparent blockchain system and see the impact.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              variant="primary" 
              size="lg"
              rightIcon={<ArrowRight size={16} />}
            >
              See Detailed Process
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform leverages cutting-edge technology to optimize the entire donation process.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className={`p-6 rounded-xl ${
                theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
              } shadow-md transition-colors cursor-pointer`}>
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                    <feature.icon size={24} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold ml-3">{feature.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} rounded-2xl`}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What People Are Saying</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Hear from our partners and donors about the impact of our platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`p-6 rounded-xl ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-white'
              } shadow-md`}>
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className={`rounded-2xl overflow-hidden ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } shadow-xl`}>
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Join our platform today and start contributing to meaningful causes. Whether you're a donor, an NGO, or a recipient, we have the tools to help you make an impact.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/auth">
                    <Button variant="primary" size="lg">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button variant="outline" size="lg">
                      Explore Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-12 flex items-center justify-center">
                <div className="text-center">
                  <Users size={64} className="text-white mb-4 mx-auto" />
                  <p className="text-xl font-bold text-white mb-2">Join Our Community</p>
                  <p className="text-white text-opacity-90">
                    97 NGOs and 1,427 donors already on the platform
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;