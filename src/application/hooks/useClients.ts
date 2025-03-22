
import { useState, useEffect } from "react";
import { Client, ClientFormValues, Subscription } from "@/domain/types";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";

export const useClients = (projectId: string | undefined, projectSubscriptions: Subscription[]) => {
  const [clients, setClients] = useState<Client[]>([]);
  const { toast } = useToast();
  const { t } = useTranslation();
  
  // This would normally come from a context or API call
  // For now, we're mocking this with static data
  useEffect(() => {
    if (projectId) {
      // Mock data - in a real app this would come from an API
      const mockClients: Client[] = [
        {
          id: "c1",
          name: "John Smith",
          email: "john@example.com",
          status: "active",
          plan: "Pro Plan",
          planId: "p1",
          spent: 299,
          lastPayment: "Jul 14, 2023",
          avatar: "",
        },
        {
          id: "c2",
          name: "Sarah Johnson",
          email: "sarah@example.com",
          status: "active",
          plan: "Team Plan",
          planId: "p2",
          spent: 749,
          lastPayment: "Jul 10, 2023",
          avatar: "",
        }
      ];
      
      setClients(mockClients);
    }
  }, [projectId]);

  const getFilteredClients = (searchTerm: string) => {
    return clients.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.plan.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const addClient = (data: ClientFormValues) => {
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

    setClients(prev => [...prev, newClient]);
    
    toast({
      title: t('success'),
      description: "Client added successfully",
    });
    
    return newClient;
  };

  const importClients = (file: File) => {
    // Process the uploaded file
    const reader = new FileReader();
    
    return new Promise<Client[]>((resolve, reject) => {
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
            setClients(prev => [...prev, ...importedClients]);
            resolve(importedClients);
          } else {
            reject(new Error("No valid clients found in the file"));
          }
        } catch (error) {
          console.error("Error parsing file:", error);
          reject(error);
        }
      };
      
      reader.onerror = () => {
        reject(new Error("Error reading file"));
      };
      
      // Read the file as text
      reader.readAsText(file);
    });
  };

  return {
    clients,
    setClients,
    getFilteredClients,
    addClient,
    importClients,
  };
};
