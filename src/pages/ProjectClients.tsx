
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useProjectData } from "@/context/ProjectDataContext";
import { ClientsPageHeader } from "@/components/project/ClientsPageHeader";
import { ClientsSearchBar } from "@/components/project/ClientsSearchBar";
import { ClientsTable } from "@/components/project/ClientsTable";
import { ClientFormDialog, ClientFormValues } from "@/components/project/ClientFormDialog";

const ProjectClients = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { projectsData, subscriptionsByProject, clientsByProject } = useProjectData();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [projectClients, setProjectClients] = useState<any[]>([]);
  const [projectDetails, setProjectDetails] = useState<any>(null);
  const [projectSubscriptions, setProjectSubscriptions] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const project = projectsData.find(p => p.id === projectId);
    setProjectDetails(project || null);

    const clients = clientsByProject[projectId as keyof typeof clientsByProject] || [];
    setProjectClients(clients);

    const subscriptions = subscriptionsByProject[projectId as keyof typeof subscriptionsByProject] || [];
    setProjectSubscriptions(subscriptions);
  }, [projectId, projectsData, clientsByProject, subscriptionsByProject]);

  const filteredClients = projectClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.plan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBackClick = () => {
    navigate(`/projects/${projectId}`);
    toast({
      title: t('returningToProject'),
      description: projectDetails?.name || t('project'),
    });
  };

  const handleExportClick = () => {
    // Export functionality would go here
    toast({
      title: t('success'),
      description: "Clients exported successfully",
    });
  };

  const handleCreateClick = () => {
    setDialogOpen(true);
  };

  const handleSubmit = (data: ClientFormValues) => {
    const selectedPlan = projectSubscriptions.find(plan => plan.id === data.planId);

    const newClient = {
      id: `${Date.now()}`,
      name: data.name,
      email: data.email,
      status: "active",
      plan: selectedPlan?.name || "Unknown Plan",
      planId: data.planId,
      spent: 0,
      lastPayment: "Just now",
      avatar: "",
    };

    setProjectClients(prev => [...prev, newClient]);
    setDialogOpen(false);
  };

  if (!projectDetails) {
    return <div>Project not found</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-6"
    >
      <ClientsPageHeader 
        projectName={projectDetails.name}
        onBackClick={handleBackClick}
        onExportClick={handleExportClick}
        onCreateClick={handleCreateClick}
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <ClientsSearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </motion.div>

      <ClientsTable clients={filteredClients} />

      <ClientFormDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        projectName={projectDetails.name}
        subscriptions={projectSubscriptions}
      />
    </motion.div>
  );
};

export default ProjectClients;
