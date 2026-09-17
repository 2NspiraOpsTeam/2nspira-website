import React from 'react';

interface ResourceCardProps {
  title: string;
  description: string;
  icon: string;
  solidBackground?: boolean;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, icon, solidBackground = true }) => {
  // Force solid white background on mobile if requested
  const mobileStyles = solidBackground ? 
    'bg-white backdrop-none' : 
    'bg-slate-50/10 backdrop-blur-sm';

  return (
    <article className={`rounded-xl overflow-hidden shadow-md border border-slate-200 h-full flex flex-col ${mobileStyles}`}>
      <div className="p-6">
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </div>
    </article>
  );
};

export default ResourceCard;