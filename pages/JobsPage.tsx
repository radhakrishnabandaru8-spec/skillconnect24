import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Job } from '../types';
import { Link } from 'react-router-dom';

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
    return (
        <div className="bg-surface border border-zinc-700 p-6 rounded-lg shadow-lg flex flex-col justify-between hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
            <div>
                <h3 className="text-xl font-bold text-primary-light mb-1">{job.title}</h3>
                <p className="text-text font-semibold text-sm mb-2">{job.company}</p>
                <p className="text-text-muted text-sm mb-4">{job.location}</p>
                <p className="text-text-muted mb-4 line-clamp-3">{job.description}</p>
                <div className="mb-4">
                    <h4 className="font-semibold text-text text-sm">Required Skills:</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {job.requiredSkills.map(skill => (
                            <span key={skill} className="text-xs bg-zinc-700 text-text-muted px-2 py-1 rounded-full">{skill}</span>
                        ))}
                    </div>
                </div>
            </div>
             <Link
                to={`/jobs/${job.id}`}
                className="w-full text-center mt-4 py-2 px-4 text-white bg-primary rounded-md font-semibold hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary transition-colors"
            >
                View Details
            </Link>
        </div>
    );
};

const JobPostingForm: React.FC<{ onPost: () => void }> = ({ onPost }) => {
    const { postJob } = useAuth();
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState('');
    const [contact, setContact] = useState('');
    
    const inputClasses = "w-full p-2 bg-background border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newJob = {
            title,
            company,
            location,
            description,
            requiredSkills: skills.split(',').map(s => s.trim()),
            contactInfo: contact
        };
        postJob(newJob);
        // Reset form
        setTitle('');
        setCompany('');
        setLocation('');
        setDescription('');
        setSkills('');
        setContact('');
        onPost();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-surface border border-zinc-700 p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-2xl font-bold text-text">Post a New Job</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} required className={inputClasses}/>
                <input type="text" placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} required className={inputClasses}/>
            </div>
            <div>
                 <input type="text" placeholder="Location (e.g., Remote, New York, NY)" value={location} onChange={(e) => setLocation(e.target.value)} required className={inputClasses}/>
            </div>
            <div>
                <textarea placeholder="Job Description" value={description} onChange={(e) => setDescription(e.target.value)} required className={inputClasses} rows={4}/>
            </div>
            <div>
                <input type="text" placeholder="Required Skills (comma-separated)" value={skills} onChange={(e) => setSkills(e.target.value)} required className={inputClasses}/>
            </div>
            <div>
                <input type="text" placeholder="Contact Info (Email/Link)" value={contact} onChange={(e) => setContact(e.target.value)} required className={inputClasses}/>
            </div>
            <button type="submit" className="w-full py-2 px-4 text-white bg-success rounded-md font-semibold hover:bg-green-600 transition-colors">Post Job</button>
        </form>
    );
};

const JobsPage: React.FC = () => {
  const { jobs } = useAuth();
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text">Job Opportunities</h1>
        <button onClick={() => setShowForm(!showForm)} className="py-2 px-4 text-white bg-primary rounded-md font-semibold hover:bg-primary-dark transition-colors">
            {showForm ? 'Close Form' : 'Post a Job'}
        </button>
      </div>
      
      {showForm && (
        <div className="mb-8">
            <JobPostingForm onPost={() => setShowForm(false)} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobsPage;