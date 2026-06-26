
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Play, ClipboardList, Users2, Database, Briefcase, Zap, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const steps = [
    {
      icon: ClipboardList,
      title: "1. Create Your AI Company",
      description: "Start by setting up your AI company with a clear mission and objectives",
    },
    {
      icon: Users2,
      title: "2. Build Your Teams",
      description: "Assemble specialized AI teams for marketing, development, legal, and more",
    },
    {
      icon: Database,
      title: "3. Add Knowledge Base",
      description: "Upload documents and resources to train your AI teams with company knowledge",
    },
    {
      icon: Briefcase,
      title: "4. Configure Actions",
      description: "Select and customize actions from our repository for each AI agent",
    },
    {
      icon: Zap,
      title: "5. Deploy AI Agents",
      description: "Add autonomous AI agents to your teams and configure their roles",
    },
    {
      icon: PlayCircle,
      title: "6. Launch Operations",
      description: "Start your autonomous AI company and monitor its performance",
    }
  ];

  const handleCreateCompany = () => {
    navigate('/create-company');
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="inline-block px-4 py-1 mb-6 text-sm font-medium bg-white/10 text-white rounded-full backdrop-blur-sm">
            Welcome to The Water Company
          </span>
          <h1 className="text-5xl font-bold tracking-tight mb-6 text-white bg-clip-text">
            Build Your Autonomous AI Company
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Create, manage, and deploy AI teams that work together seamlessly.
            Transform your vision into an autonomous digital workforce.
          </p>
          <Button
            onClick={handleCreateCompany}
            size="lg"
            className="hover-lift bg-white text-black hover:bg-white/90"
          >
            <Plus className="mr-2 h-4 w-4" /> Create AI Company
          </Button>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-[#0c0c0c]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">How It Works</h2>
            <p className="text-xl text-gray-400">Follow these steps to build your autonomous AI company</p>
          </div>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  onMouseEnter={() => setIsHovered(step.title)}
                  onMouseLeave={() => setIsHovered(null)}
                  className="p-6 glass-card hover-lift cursor-pointer relative overflow-hidden"
                >
                  <div className="relative z-10 flex items-center">
                    <step.icon
                      className={`h-12 w-12 min-w-[3rem] mr-6 ${
                        isHovered === step.title
                          ? "text-blue-400"
                          : "text-gray-300"
                      }`}
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                  </div>
                  <div 
                    className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 ${
                      isHovered === step.title ? "opacity-20" : ""
                    }`}
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-[#000000]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <Card className="p-12 glass-card">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Ready to Start Your AI Company?
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Join us in shaping the future of autonomous business operations.
            </p>
            <Button
              onClick={handleCreateCompany}
              size="lg"
              className="hover-lift bg-white text-black hover:bg-white/90"
            >
              <Play className="mr-2 h-4 w-4" /> Get Started
            </Button>
          </Card>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
