import { Link } from "react-router-dom";

import {
  Send,
  Users,
  BarChart3,
  Clock,
  CheckCircle,
  MessageSquare,
  Target,
  Zap,
  Shield,
  Calendar,
  Activity,
  ArrowRight,
} from 'lucide-react';

const BulkSmsPage = () => {
  // Campaign statistics
  const campaignStats = [
    { 
      label: 'Total Messages', 
      value: '1,247,839', 
      change: '+23.5%', 
      icon: <Send className="w-5 h-5" />,
      color: 'text-orange-500'
    },
    { 
      label: 'Delivery Rate', 
      value: '98.7%', 
      change: '+2.1%', 
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'text-green-500'
    },
    { 
      label: 'Active Campaigns', 
      value: '42', 
      change: '+8', 
      icon: <Activity className="w-5 h-5" />,
      color: 'text-blue-500'
    },
    { 
      label: 'Total Contacts', 
      value: '356,421', 
      change: '+15.3%', 
      icon: <Users className="w-5 h-5" />,
      color: 'text-purple-500'
    }
  ];

  // Recent campaigns
  const recentCampaigns = [
    { 
      id: 1,
      name: 'Flash Sale Alert', 
      recipients: 45231, 
      sent: '2024-01-15 14:30',
      status: 'completed',
      openRate: 92,
      conversion: 18.5,
      icon: <Zap className="w-4 h-4" />
    },
    { 
      id: 2,
      name: 'Newsletter Weekly', 
      recipients: 28194, 
      sent: '2024-01-14 09:00',
      status: 'completed',
      openRate: 78,
      conversion: 12.3,
      icon: <MessageSquare className="w-4 h-4" />
    },
    { 
      id: 3,
      name: 'Promotional Campaign', 
      recipients: 67215, 
      sent: '2024-01-13 18:00',
      status: 'active',
      openRate: 85,
      conversion: 22.7,
      icon: <Target className="w-4 h-4" />
    },
    { 
      id: 4,
      name: 'Customer Feedback', 
      recipients: 15267, 
      sent: '2024-01-12 11:15',
      status: 'pending',
      openRate: 0,
      conversion: 0,
      icon: <Calendar className="w-4 h-4" />
    }
  ];

  // Features
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Contact Management",
      description: "Import, organize, and segment your contact lists with ease. Support for CSV, Excel, and API integration."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Smart Targeting",
      description: "Advanced filtering and segmentation to reach the right audience with personalized messages."
    },
    {
      icon: <Send className="w-6 h-6" />,
      title: "High-Speed Delivery",
      description: "Send thousands of messages per minute with our optimized delivery infrastructure."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Real-time Analytics",
      description: "Track delivery, open rates, and conversion metrics with detailed dashboards and reports."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Scheduled Campaigns",
      description: "Plan and schedule your campaigns for optimal timing and maximum engagement."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Compliant",
      description: "Enterprise-grade security with GDPR and data privacy compliance built-in."
    }
  ];

  /*
  const pricingPlans = [
    {
      name: 'Starter',
      price: '$49',
      messages: '5,000 messages/month',
      features: [
        'Basic Contact Management',
        '5 Campaigns/month',
        'Standard Analytics',
        'Email Support',
        'API Access'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '$149',
      messages: '50,000 messages/month',
      features: [
        'Advanced Contact Management',
        'Unlimited Campaigns',
        'Real-time Analytics',
        'Priority Support',
        'Advanced Segmentation',
        'Custom Templates',
        'A/B Testing'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      messages: 'Custom messages',
      features: [
        'Dedicated Account Manager',
        'Custom Integration',
        'White-label Solutions',
        '24/7 Premium Support',
        'Advanced Security',
        'SLA Guarantee',
        'Custom Reporting'
      ],
      popular: false
    }
  ]; */

  // DLT Compliance
  const dltInfo = {
    header: 'DLT Compliant Messaging',
    description: 'Our platform is fully compliant with TRAI DLT regulations. We ensure proper header registration and content template approval for all your business communications.',
    features: [
      'Registered Headers & Templates',
      'Content Approval Workflow',
      'Automatic DLT Validation',
      'Audit Trail & Reporting',
      'Compliance Dashboard'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-orange-200/10 animate-pulse"
            style={{
              width: Math.random() * 15 + 5 + 'px',
              height: Math.random() * 15 + 5 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDuration: Math.random() * 15 + 10 + 's',
              animationDelay: Math.random() * 5 + 's'
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-300/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full mb-6 animate-bounce">
                <span className="text-orange-700 text-sm font-semibold">📱 Bulk SMS Marketing</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Reach Millions
                <span className="text-orange-500 block">With One Click</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Powerful bulk SMS marketing platform to engage your audience, drive conversions, 
                and grow your business. Send personalized messages at scale with enterprise-grade reliability.
              </p>
              <div className="flex flex-wrap gap-4">
                  <Link to="/contact">

                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg shadow-orange-200 group">
                  Start Free Trial <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                 </Link>

              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-orange-200 border-2 border-white flex items-center justify-center text-orange-700 font-bold text-sm">JD</div>
                  <div className="w-10 h-10 rounded-full bg-orange-300 border-2 border-white flex items-center justify-center text-orange-700 font-bold text-sm">MK</div>
                  <div className="w-10 h-10 rounded-full bg-orange-400 border-2 border-white flex items-center justify-center text-white font-bold text-sm">AL</div>
                  <div className="w-10 h-10 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center text-white font-bold text-sm">+5</div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Trusted by 5,000+ businesses</p>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((star) => (
                      <span key={star} className="text-orange-400">★</span>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">(4.8/5)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Campaign Dashboard</h3>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Live</span>
                </div>
                <div className="space-y-4">
                  {recentCampaigns.slice(0, 3).map((campaign) => (
                    <div key={campaign.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors cursor-pointer">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500">
                        {campaign.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm text-gray-900">{campaign.name}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            campaign.status === 'completed' ? 'bg-green-100 text-green-700' :
                            campaign.status === 'active' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {campaign.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{campaign.recipients.toLocaleString()} recipients</span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                          <span>{campaign.sent}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
                  Create New Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-y border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 min-[380px]:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {campaignStats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className={`${stat.color} group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                  <span className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</span>
                </div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <span className="text-xs text-green-500 bg-green-50 px-2 py-0.5 rounded-full inline-block mt-1">
                  {stat.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for <span className="text-orange-500">Bulk SMS</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to run successful SMS marketing campaigns and engage your audience effectively.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white border border-gray-100 rounded-2xl p-5 sm:p-8 transition-all duration-300 hover:shadow-xl hover:border-orange-200 hover:-translate-y-1"
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
      </div>

      {/* DLT Compliance Section */}
      <div className="bg-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-orange-200 rounded-full mb-4">
                <Shield className="w-4 h-4 text-orange-600 mr-2" />
                <span className="text-orange-700 text-sm font-semibold">DLT Compliant</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {dltInfo.header}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {dltInfo.description}
              </p>
              <div className="space-y-3">
                {dltInfo.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Compliance Status</h4>
                  <p className="text-sm text-green-600">✓ Fully Verified</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Header Registration</span>
                  <span className="text-sm font-medium text-green-600">Active</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Template Approval</span>
                  <span className="text-sm font-medium text-green-600">Approved</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">DLT ID</span>
                  <span className="text-sm font-medium text-gray-900">#DLT-2024-001</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Last Audit</span>
                  <span className="text-sm font-medium text-gray-900">2024-01-15</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Campaigns Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Recent Campaigns</h2>
              <p className="text-gray-600 mt-1">Monitor and manage your SMS campaigns</p>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              View All
            </button>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Campaign</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Recipients</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sent</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Open Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Conversion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-orange-50 transition-colors cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500">
                            {campaign.icon}
                          </div>
                          <span className="font-medium text-gray-900">{campaign.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{campaign.recipients.toLocaleString()}</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{campaign.sent}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          campaign.status === 'completed' ? 'bg-green-100 text-green-800' :
                          campaign.status === 'active' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-orange-500 rounded-full h-2 transition-all duration-1000"
                              style={{ width: `${campaign.openRate}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{campaign.openRate}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{campaign.conversion}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
     
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-6 sm:p-10 md:p-16 text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Supercharge Your Marketing?
          </h2>
          <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
            Start sending bulk SMS campaigns today and watch your engagement soar.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
  <Link to="/contact">
    <button className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg">
      Start Free Trial
    </button>
  </Link>

  <Link to="/contact">
    <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
      Schedule Demo
    </button>
  </Link>
</div>
        </div>
      </div>

      {/* Footer */}
   
    </div>
  );
};

export default BulkSmsPage;
