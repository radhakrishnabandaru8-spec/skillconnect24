import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Modal from '../components/Modal';

const JobDetailPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const { jobs } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const job = jobs.find(j => j.id === jobId);

  if (!job) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-text">Job not found.</h2>
        <Link to="/jobs" className="text-primary-light hover:underline mt-4 inline-block">Back to Jobs</Link>
      </div>
    );
  }
  
  const isEmail = job.contactInfo.includes('@');
  const applyLink = isEmail ? `mailto:${job.contactInfo}` : job.contactInfo;

  const handleApplyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="Application Direction"
    >
      <p className="text-text-muted mb-4">
        You are about to be redirected to apply for the <strong>{job.title}</strong> role.
        Click the link below to proceed.
      </p>
      <a 
          href={applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary-light break-all hover:underline"
      >
          {applyLink}
      </a>
      <div className="mt-6 flex justify-end">
          <button onClick={() => setIsModalOpen(false)} className="py-2 px-4 text-text-muted bg-zinc-700 rounded-md font-semibold hover:bg-zinc-600">
              Close
          </button>
      </div>
    </Modal>
    <div className="bg-surface p-8 rounded-lg shadow-lg border border-zinc-700 max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="text-primary-light hover:underline mb-6">&larr; Back to Jobs</button>

        <h1 className="text-4xl font-bold text-text">{job.title}</h1>
        <p className="text-xl text-primary-light font-semibold mt-1">{job.company}</p>
        <p className="text-md text-text-muted mb-6">{job.location}</p>

        <p className="text-text-muted leading-relaxed mb-6">{job.description}</p>

        <div className="mb-6">
            <h3 className="text-lg font-semibold text-text mb-2">Required Skills:</h3>
            <div className="flex flex-wrap gap-2">
                {job.requiredSkills.map(skill => (
                    <span key={skill} className="bg-zinc-700 text-text-muted px-3 py-1 rounded-full text-sm">{skill}</span>
                ))}
            </div>
        </div>

        <div className="border-t border-zinc-700 pt-6">
            <button 
                onClick={handleApplyClick}
                className="inline-block py-2 px-6 bg-success text-white rounded-md font-semibold hover:bg-green-600"
            >
                Apply Now
            </button>
            <p className="text-sm text-text-muted mt-2">Contact: {job.contactInfo}</p>
        </div>
    </div>
    </>
  );
};

export default JobDetailPage;