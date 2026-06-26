
import { motion } from "framer-motion";
import { ArrowLeft, Search, Plus, Megaphone, DollarSign, FileText, Code, Share2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const templates = [
  { id: 'custom', name: 'Custom Template', icon: Settings, description: 'Create a custom AI team from scratch' },
  { id: 'marketing', name: 'Marketing Team', icon: Megaphone, description: 'AI-powered marketing and brand management' },
  { id: 'finance', name: 'Finance Team', icon: DollarSign, description: 'Financial analysis and management' },
  { id: 'accounting', name: 'Accounting Team', icon: FileText, description: 'Bookkeeping and financial reporting' },
  { id: 'software', name: 'Software Team', icon: Code, description: 'Software development and maintenance' },
  { id: 'social', name: 'Social Media Team', icon: Share2, description: 'Social media management and engagement' },
];

const CreateCompany = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleTemplateClick = (templateId: string) => {
    navigate(`/team-config/${templateId}`);
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Header */}
      <header className="bg-[#1c1c1e]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="mr-4 text-white hover:text-white/90"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-xl font-semibold text-white">Create AI Company</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Title */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Create an AI Team</h2>
            <p className="text-gray-400">Choose a template to get started with your AI team</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search AI team templates..."
                className="w-full pl-10 pr-4 py-3 bg-[#1c1c1e] border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  onClick={() => handleTemplateClick(template.id)}
                  className="p-6 glass-card cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/10 p-3 rounded-lg">
                      <template.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{template.name}</h3>
                      <p className="text-sm text-gray-400">{template.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default CreateCompany;
