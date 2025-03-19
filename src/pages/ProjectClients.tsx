
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Types
interface Project {
  id: string;
  name: string;
  description: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  status: string;
  plan: string;
  planId: string;
  spent: number;
  lastPayment: string;
  avatar: string;
}

interface Subscription {
  id: string;
  name: string;
  price: number;
}
import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useProjectData } from "@/context/ProjectDataContext";
import { ClientsPageHeader } from "@/components/project/ClientsPageHeader";
import { ClientsSearchBar } from "@/components/project/ClientsSearchBar";
import { ClientsTable } from "@/components/project/ClientsTable";
import { ClientFormDialog, ClientFormValues } from "@/components/project/ClientFormDialog";
import { ImportClientsDialog } from "@/components/project/ImportClientsDialog";

const ProjectClients = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { projectsData, subscriptionsByProject, clientsByProject } = useProjectData();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [projectClients, setProjectClients] = useState<Client[]>([]);
  const [projectDetails, setProjectDetails] = useState<Project | null>(null);
  const [projectSubscriptions, setProjectSubscriptions] = useState<Subscription[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);

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

  const handleImportClick = () => {
    setImportDialogOpen(true);
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

  const handleImport = (file: File) => {
    // Process the uploaded file
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedClients: Client[] = [];
        
        // Basic CSV parsing
        if (file.name.toLowerCase().endsWith('.csv')) {
          const lines = content.split('\n');
          
          // Skip header row
          for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue; // Skip empty lines
            
            const values = line.split(',');
            if (values.length >= 3) {
              const name = values[0].trim();
              const email = values[1].trim();
              const planId = values[2].trim();
              
              if (name && email) {
                const selectedPlan = projectSubscriptions.find(plan => plan.id === planId);
                
                importedClients.push({
                  id: `import-${Date.now()}-${i}`,
                  name,
                  email,
                  status: "active",
                  plan: selectedPlan?.name || "Basic Plan",
                  planId: selectedPlan?.id || projectSubscriptions[0]?.id || "1",
                  spent: 0,
                  lastPayment: "Just now",
                  avatar: "",
                });
              }
            }
          }
        } else {
          // For Excel files, we would use a library like xlsx in a real app
          // For now, just add some mock data for demonstration
          importedClients.push(
            {
              id: `import-${Date.now()}-1`,
              name: "Imported Excel Client 1",
              email: "excel1@example.com",
              status: "active",
              plan: projectSubscriptions[0]?.name || "Basic Plan",
              planId: projectSubscriptions[0]?.id || "1",
              spent: 0,
              lastPayment: "Just now",
              avatar: "",
            },
            {
              id: `import-${Date.now()}-2`,
              name: "Imported Excel Client 2",
              email: "excel2@example.com",
              status: "active",
              plan: projectSubscriptions[0]?.name || "Basic Plan",
              planId: projectSubscriptions[0]?.id || "1",
              spent: 0,
              lastPayment: "Just now",
              avatar: "",
            }
          );
        }
        
        if (importedClients.length > 0) {
          setProjectClients(prev => [...prev, ...importedClients]);
          toast({
            title: t('success'),
            description: `${importedClients.length} clients imported successfully from ${file.name}`,
          });
        } else {
          toast({
            title: t('error'),
            description: "No valid clients found in the file",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error parsing file:", error);
        toast({
          title: t('error'),
          description: "Error parsing file. Please check the format and try again.",
          variant: "destructive",
        });
      }
    };
    
    reader.onerror = () => {
      toast({
        title: t('error'),
        description: "Error reading file",
        variant: "destructive",
      });
    };
    
    // Read the file as text
    reader.readAsText(file);
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
