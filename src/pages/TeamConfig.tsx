
import { motion } from "framer-motion";
import { ArrowLeft, Save, UserPlus, BookPlus, Upload, Database, Bot, Building } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { aiAgents } from "@/data/aiAgents";

const teamNames = {
  marketing: "Marketing Team",
  finance: "Finance Team",
  accounting: "Accounting Team",
  software: "Software Team",
  social: "Social Media Team",
  custom: "Custom Team",
};

const defaultAgents = [
  {
    id: "team-manager",
    name: "Team Manager",
    role: "Manages and coordinates the AI team's activities",
    icon: "Bot",
  },
  {
    id: "team-analyst",
    name: "Team Analyst",
    role: "Analyzes data and provides insights",
    icon: "Database",
  },
];

const TeamConfig = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { teamId } = useParams();
  const teamName = teamId ? teamNames[teamId as keyof typeof teamNames] : "Team";
  
  const [addedAgents, setAddedAgents] = useState<typeof aiAgents>(() => {
    const saved = localStorage.getItem(`team-${teamId}-agents`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(`team-${teamId}-agents`, JSON.stringify(addedAgents));
  }, [addedAgents, teamId]);

  const handleFileUpload = () => {
    toast({
      title: "Upload Started",
      description: "Your files are being processed...",
    });
  };

  const handleAddAgent = () => {
    navigate(`/ai-marketplace/${teamId}`);
  };

  const handleAddToCompany = () => {
    // Store the team configuration in localStorage
    const existingCompanyTeams = JSON.parse(localStorage.getItem('company-teams') || '[]');
    const teamConfig = {
      id: teamId,
      name: teamName,
      agents: [...defaultAgents, ...addedAgents]
    };
    
    if (!existingCompanyTeams.some((team: any) => team.id === teamId)) {
      const updatedTeams = [...existingCompanyTeams, teamConfig];
      localStorage.setItem('company-teams', JSON.stringify(updatedTeams));
      
      toast({
        title: "Success",
        description: "Team has been added to the company!",
      });
    } else {
      toast({
        title: "Note",
        description: "This team is already in the company.",
      });
    }
    
    navigate('/'); // Navigate to company page
  };

  // Helper function to render icon component
  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    if (!IconComponent) {
      console.warn(`Icon ${iconName} not found`);
      return <Bot size={24} color="white" />;
    }
    return <IconComponent size={24} color="white" />;
  };

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
                onClick={() => navigate('/create-company')}
                className="mr-4 text-white hover:text-white/90"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-xl font-semibold text-white">Configure {teamName}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={handleAddToCompany} className="bg-white text-black hover:bg-white/90">
                <Building className="h-4 w-4 mr-2" />
                Add to Company
              </Button>
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
          {/* AI Agents Section */}
          <Card className="bg-[#1c1c1e] border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-white">AI Agents</CardTitle>
                  <CardDescription>Configure your team's AI agents</CardDescription>
                </div>
                <Button onClick={handleAddAgent} className="bg-white text-black hover:bg-white/90">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Agent
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {defaultAgents.map((agent) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/5 rounded-lg p-4 flex items-center space-x-4"
                >
                  <div className="bg-white/10 p-2 rounded-lg">
                    {renderIcon(agent.icon)}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{agent.name}</h3>
                    <p className="text-gray-400 text-sm">{agent.role}</p>
                  </div>
                </motion.div>
              ))}
              
              {/* Added Agents */}
              {addedAgents.map((agent) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/5 rounded-lg p-4 flex items-center space-x-4"
                >
                  <div className="bg-white/10 p-2 rounded-lg">
                    {renderIcon(agent.icon as string)}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{agent.name}</h3>
                    <p className="text-gray-400 text-sm">{agent.description}</p>
                  </div>
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
                  <CardDescription>Upload files and data to train your AI team</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleFileUpload} className="bg-white text-black hover:bg-white/90">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </Button>
                  <Button onClick={() => {}} variant="outline" className="border-white/10 text-white hover:bg-white/5">
                    <BookPlus className="h-4 w-4 mr-2" />
                    Add URLs
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-white/5 rounded-lg p-8 text-center">
                <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-white font-medium mb-2">No data uploaded yet</h3>
                <p className="text-gray-400 text-sm">
                  Upload files or add URLs to build your team's knowledge base
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Team Overview */}
          <Card className="bg-[#1c1c1e] border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Team Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Total Agents</p>
                  <p className="text-2xl font-semibold text-white">{defaultAgents.length + addedAgents.length}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Knowledge Base Size</p>
                  <p className="text-2xl font-semibold text-white">0 MB</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Status</p>
                  <p className="text-2xl font-semibold text-white">Ready</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default TeamConfig;
