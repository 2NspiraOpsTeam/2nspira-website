import React from 'react';

interface ResourceCardProps {
  title: string;
  description: string;
  icon: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, icon }) => (
  <article className="rounded-xl overflow-hidden shadow-md bg-white border border-slate-200 h-full flex flex-col">
    <div className="p-6">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  </article>
);

export default ResourceCard;
