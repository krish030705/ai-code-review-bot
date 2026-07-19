import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects, onOpen, onDelete, onRename }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onOpen={onOpen}
          onDelete={onDelete}
          onRename={onRename}
        />
      ))}
    </div>
  );
}
