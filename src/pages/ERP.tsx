import { 
  CheckCircle, 
  Settings, 
  Users, 
  BarChart3, 
  Package, 
  FileText,
  ArrowRight,
  Zap,
  Shield,
  Cloud,
  Headphones,
  Database
} from 'lucide-react';

const ERPPage = () => {
  const features = [
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Customizable Modules",
      description: "Tailor every aspect of the system to match your unique business workflows."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "User Management",
      description: "Role-based access control with detailed permissions for every team member."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Real-time Analytics",
      description: "Make data-driven decisions with live dashboards and comprehensive reports."
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Inventory Management",
      description: "Track stock levels, automate reordering, and optimize supply chain."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Document Management",
      description: "Centralize all your business documents with version control and secure access."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Integration",
      description: "Seamlessly connect with your existing tools and third-party services."
    }
  ];

  const benefits = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Increased Efficiency",
      description: "Automate repetitive tasks and streamline operations across departments."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enhanced Security",
      description: "Enterprise-grade security with encrypted data and regular backups."
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud-Based Access",
      description: "Access your business data anytime, anywhere, from any device."
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Dedicated support team available around the clock to assist you."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-orange-50 via-white to-orange-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full mb-6">
                <span className="text-orange-700 text-sm font-semibold">🚀 Next-Gen ERP Solution</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Transform Your Business
                <span className="text-orange-500 block">With Our ERP Software</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We develop comprehensive ERP solutions that integrate all your business processes 
                into one powerful, intuitive platform. Built to scale with your business.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg shadow-orange-200">
                  Get Started <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                  Contact Sales
                </button>
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-orange-200 border-2 border-white flex items-center justify-center text-orange-700 font-bold text-sm">JD</div>
                  <div className="w-10 h-10 rounded-full bg-orange-300 border-2 border-white flex items-center justify-center text-orange-700 font-bold text-sm">MK</div>
                  <div className="w-10 h-10 rounded-full bg-orange-400 border-2 border-white flex items-center justify-center text-orange-700 font-bold text-sm">AL</div>
                  <div className="w-10 h-10 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center text-white font-bold text-sm">+5</div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Trusted by 500+ companies</p>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((star) => (
                      <span key={star} className="text-orange-400">★</span>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">(4.9/5)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl shadow-2xl overflow-hidden border-4 border-white">
                <img 
                  src="/assets/images/erp.png" 
                  alt="ERP Software Dashboard" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-transparent"></div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-4 border border-orange-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">100% Customizable</p>
                    <p className="text-xs text-gray-500">Built for your business</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need To <span className="text-orange-500">Succeed</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our ERP software comes packed with powerful features to streamline your operations 
            and drive growth across your organization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-white border border-gray-100 hover:border-orange-200 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-orange-50"
            >
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/assets/images/erp2.png" 
                alt="ERP Analytics" 
                className="rounded-2xl shadow-2xl border-4 border-white"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Our <span className="text-orange-500">ERP Solution</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We develop ERP software that's not just a tool, but a strategic partner in your 
                business growth. Here's what makes us different.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 border border-orange-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="text-orange-500 mb-3">{benefit.icon}</div>
                    <h4 className="font-bold text-gray-900 mb-2">{benefit.title}</h4>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-6 sm:p-10 md:p-16 text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss how our ERP software can be customized to meet your specific needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg">
              Request Demo
            </button>
            <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
              View Pricing
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      
    </div>
  );
};

// FIXED: Added default export
export default ERPPage;
