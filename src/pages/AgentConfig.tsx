
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Upload, BookPlus, Bot } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { aiAgents } from "@/data/aiAgents";

const defaultActions = {
  "social-media-manager": [
    "Schedule social media posts",
    "Analyze engagement metrics",
    "Generate content ideas",
    "Monitor brand mentions"
  ],
  "analytics-expert": [
    "Generate performance reports",
    "Track KPIs",
    "Analyze user behavior",
    "Create data visualizations"
  ],
};

const AgentConfig = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { teamId, agentId } = useParams();
  
  const agent = aiAgents.find(a => a.id === agentId);
  const actions = defaultActions[agentId as keyof typeof defaultActions] || [];

  // Helper function to render icon component
  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    if (!IconComponent) {
      console.warn(`Icon ${iconName} not found`);
      return <Bot size={24} color="white" />;
    }
    return <IconComponent size={24} color="white" />;
  };

  const handleAddToTeam = () => {
    if (agent) {
      const existingAgents = JSON.parse(localStorage.getItem(`team-${teamId}-agents`) || '[]');
      
      if (!existingAgents.some((a: typeof agent) => a.id === agent.id)) {
        const updatedAgents = [...existingAgents, agent];
        localStorage.setItem(`team-${teamId}-agents`, JSON.stringify(updatedAgents));
        
        toast({
          title: "Success",
          description: "AI agent has been added to your team!",
        });
      } else {
        toast({
          title: "Note",
          description: "This AI agent is already in your team.",
        });
      }
    }
    navigate(`/team-config/${teamId}`);
  };

  const handleFileUpload = () => {
    toast({
      title: "Upload Started",
      description: "Your files are being processed...",
    });
  };

  if (!agent) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Header */}
      <header className="bg-[#1c1c1e]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/ai-marketplace/${teamId}`)}
                className="mr-4 text-white hover:text-white/90"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-xl font-semibold text-white">Configure {agent.name}</h1>
            </div>
            <Button onClick={handleAddToTeam} className="bg-white text-black hover:bg-white/90">
              Add to Team
            </Button>
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
          {/* Agent Info */}
          <Card className="bg-[#1c1c1e] border-white/10">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  {renderIcon(agent.icon)}
                </div>
                <div>
                  <CardTitle className="text-2xl text-white">{agent.name}</CardTitle>
                  <CardDescription>{agent.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Actions Section */}
          <Card className="bg-[#1c1c1e] border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-white">Actions</CardTitle>
                  <CardDescription>Configure what this agent can do</CardDescription>
                </div>
                <Button className="bg-white text-black hover:bg-white/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Action
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {actions.map((action, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/5 rounded-lg p-4"
                >
                  <p className="text-white">{action}</p>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Knowledge Base Section */}
          <Card className="bg-[#1c1c1e] border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-white">Knowledge Base</CardTitle>
                  <CardDescription>Upload documents and instructions</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleFileUpload} className="bg-white text-black hover:bg-white/90">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </Button>
                  <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                    <BookPlus className="h-4 w-4 mr-2" />
                    Add Instructions
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-white/5 rounded-lg p-6">
                <div className="text-center">
                  <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-white font-medium mb-2">Add Knowledge</h3>
                  <p className="text-gray-400 text-sm">
                    Upload documents or add instructions to help your AI agent learn and perform better
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default AgentConfig;
