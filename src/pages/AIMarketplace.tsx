
import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { aiAgents } from "@/data/aiAgents";

const AIMarketplace = () => {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAgents = aiAgents.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAgentClick = (agentId: string) => {
    navigate(`/agent-config/${teamId}/${agentId}`);
  };

  // Helper function to render icon component
  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    if (!IconComponent) {
      console.warn(`Icon ${iconName} not found`);
      return null;
    }
    return <IconComponent size={16} className="text-white" />;
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Header */}
      <header className="bg-[#1c1c1e]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/team-config/${teamId}`)}
              className="mr-4 text-white hover:text-white/90"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-semibold text-white">AI Agent Marketplace</h1>
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
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search AI agents..."
              className="pl-10 bg-[#1c1c1e] border-white/10 text-white placeholder:text-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAgents.map((agent) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="bg-[#1c1c1e] border-white/10 overflow-hidden cursor-pointer"
                  onClick={() => handleAgentClick(agent.id)}
                >
                  <div className="h-32 bg-white/5 relative">
                    <img
                      src={`https://images.unsplash.com/${agent.image}`}
                      alt={agent.name}
                      className="w-full h-full object-cover opacity-75"
                    />
                    <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-xs text-white">
                      {agent.category}
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="bg-white/10 p-1.5 rounded">
                        {renderIcon(agent.icon)}
                      </div>
                      <h3 className="text-sm font-medium text-white">{agent.name}</h3>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2">{agent.description}</p>
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

export default AIMarketplace;
