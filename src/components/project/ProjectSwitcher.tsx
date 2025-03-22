
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Check, ChevronsUpDown, Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { useProjectData } from "@/context/ProjectDataContext";
import { useTranslation } from "@/hooks/useTranslation";

export function ProjectSwitcher() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { projectsData } = useProjectData();
  const { t } = useTranslation();
  const [currentProject, setCurrentProject] = useState<{name: string} | null>(null);

  useEffect(() => {
    if (projectId) {
      const project = projectsData.find(p => p.id === projectId);
      if (project) {
        setCurrentProject(project);
      }
    } else {
      setCurrentProject(null);
    }
  }, [projectId, projectsData]);

  const handleSelectProject = (selectedProjectId: string) => {
    setOpen(false);
    if (projectId) {
      // We're already in a project route, navigate to the same section in the new project
      const currentPath = window.location.pathname;
      const pathParts = currentPath.split('/');
      
      if (pathParts.includes('clients')) {
        navigate(`/projects/${selectedProjectId}/clients`);
      } else if (pathParts.includes('subscriptions')) {
        navigate(`/projects/${selectedProjectId}/subscriptions`);
      } else {
        navigate(`/projects/${selectedProjectId}`);
      }
    } else {
      // We're not in a project route yet
      navigate(`/projects/${selectedProjectId}`);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={t('switchProject')}
          className="w-[200px] justify-between overflow-hidden border-dashed transition-all hover:border-primary"
        >
          <div className="flex items-center gap-2 truncate">
            <Folder className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="truncate">
              {currentProject ? currentProject.name : t('selectProject')}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={t('searchProjects')} className="h-9" />
          <CommandEmpty>{t('noProjectsFound')}</CommandEmpty>
          <CommandList>
            <CommandGroup heading={t('projects')}>
              {projectsData.map((project) => (
                <CommandItem
                  key={project.id}
                  value={project.name}
                  onSelect={() => handleSelectProject(project.id)}
                  className="text-sm cursor-pointer"
                >
                  <div className="flex items-center gap-2 w-full">
                    <Folder className="h-4 w-4" />
                    <span className="truncate">{project.name}</span>
                  </div>
                  {currentProject?.name === project.name && (
                    <Check className="ml-auto h-4 w-4 text-primary" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
