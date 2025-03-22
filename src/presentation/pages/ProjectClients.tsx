
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
import { ImportClientsDialog } from "@/components/project/ImportClientsDialog";
import { useClients } from "@/application/hooks";
import { Project, Subscription } from "@/domain/types";
import { useProjects } from "@/application/hooks";

const ProjectClients = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { projectsData, subscriptionsByProject } = useProjectData();
  const { getProjectById } = useProjects();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [projectDetails, setProjectDetails] = useState<Project | null>(null);
  const [projectSubscriptions, setProjectSubscriptions] = useState<Subscription[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);

  // Initialize project details and subscriptions
  useEffect(() => {
    // Get complete project details using the useProjects hook
    const project = getProjectById(projectId);
    setProjectDetails(project);

    const subscriptions = subscriptionsByProject[projectId as keyof typeof subscriptionsByProject] || [];
    setProjectSubscriptions(subscriptions);
  }, [projectId, projectsData, subscriptionsByProject, getProjectById]);

  // Use the clients hook
  const { 
    clients: projectClients,
    getFilteredClients,
    addClient,
    importClients 
  } = useClients(projectId, projectSubscriptions);

  const filteredClients = getFilteredClients(searchTerm);

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

  const handleImportClick = () => {
    setImportDialogOpen(true);
  };

  const handleCreateClick = () => {
    setDialogOpen(true);
  };

  const handleSubmit = (data: ClientFormValues) => {
    addClient(data);
    setDialogOpen(false);
  };

  const handleImport = (file: File) => {
    importClients(file).then(
      (importedClients) => {
        toast({
          title: t('success'),
          description: `${importedClients.length} clients imported successfully from ${file.name}`,
        });
        setImportDialogOpen(false);
      },
      (error) => {
        toast({
          title: t('error'),
          description: error.message || "Error importing clients",
          variant: "destructive",
        });
      }
    );
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
        onImportClick={handleImportClick}
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

      <ImportClientsDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
        onImport={handleImport}
        projectName={projectDetails.name}
      />
    </motion.div>
  );
};

export default ProjectClients;
