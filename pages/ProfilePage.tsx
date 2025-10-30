import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User } from '../types';
import Modal from '../components/Modal';

const EditProfileModal: React.FC<{ user: User, onSave: (data: User) => void, onClose: () => void }> = ({ user, onSave, onClose }) => {
    const [formData, setFormData] = useState<User>(user);
    
    const inputClasses = "w-full p-2 bg-background border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text";
    
    useEffect(() => {
        setFormData(user);
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, skills: e.target.value.split(',').map(s => s.trim()) });
    };

    const handleArrayChange = (section: 'experience' | 'education', index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newArray = [...formData[section]];
        const item = newArray[index] as any;
        item[e.target.name] = e.target.value;
        setFormData({ ...formData, [section]: newArray });
    };

    const addArrayItem = (section: 'experience' | 'education') => {
        const newItem = section === 'experience'
        ? { company: '', role: '', years: '' }
        : { institution: '', degree: '', year: '' };
        setFormData({ ...formData, [section]: [...formData[section], newItem] });
    };

    const removeArrayItem = (section: 'experience' | 'education', index: number) => {
        const newArray = formData[section].filter((_, i) => i !== index);
        setFormData({ ...formData, [section]: newArray });
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Edit Profile">
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                <div>
                    <label className="text-sm font-medium text-text-muted">Full Name</label>
                    <input name="name" value={formData.name} onChange={handleInputChange} className={inputClasses} />
                </div>
                <div>
                    <label className="text-sm font-medium text-text-muted">Bio</label>
                    <textarea name="bio" value={formData.bio} onChange={handleInputChange} className={`${inputClasses} min-h-[100px]`} />
                </div>
                <div>
                    <label className="text-sm font-medium text-text-muted">Skills (comma-separated)</label>
                    <input name="skills" value={formData.skills.join(', ')} onChange={handleSkillsChange} className={inputClasses} />
                </div>

                {/* Experience */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-lg font-semibold text-text">Experience</h4>
                        <button onClick={() => addArrayItem('experience')} className="text-sm text-primary-light font-semibold">+ Add</button>
                    </div>
                    {formData.experience.map((exp, index) => (
                        <div key={index} className="p-2 border border-zinc-700 rounded mb-2 space-y-2 relative">
                            <input name="role" value={exp.role} onChange={(e) => handleArrayChange('experience', index, e)} placeholder="Role" className={inputClasses} />
                            <input name="company" value={exp.company} onChange={(e) => handleArrayChange('experience', index, e)} placeholder="Company" className={inputClasses} />
                            <input name="years" value={exp.years} onChange={(e) => handleArrayChange('experience', index, e)} placeholder="Years (e.g., 2020-Present)" className={inputClasses} />
                            <button onClick={() => removeArrayItem('experience', index)} className="absolute top-1 right-1 text-danger text-xs font-bold p-1 rounded-full bg-surface">X</button>
                        </div>
                    ))}
                </div>

                {/* Education */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-lg font-semibold text-text">Education</h4>
                        <button onClick={() => addArrayItem('education')} className="text-sm text-primary-light font-semibold">+ Add</button>
                    </div>
                    {formData.education.map((edu, index) => (
                        <div key={index} className="p-2 border border-zinc-700 rounded mb-2 space-y-2 relative">
                            <input name="degree" value={edu.degree} onChange={(e) => handleArrayChange('education', index, e)} placeholder="Degree" className={inputClasses} />
                            <input name="institution" value={edu.institution} onChange={(e) => handleArrayChange('education', index, e)} placeholder="Institution" className={inputClasses} />
                            <input name="year" value={edu.year} onChange={(e) => handleArrayChange('education', index, e)} placeholder="Year" className={inputClasses} />
                            <button onClick={() => removeArrayItem('education', index)} className="absolute top-1 right-1 text-danger text-xs font-bold p-1 rounded-full bg-surface">X</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <button onClick={onClose} className="py-2 px-4 text-text-muted bg-zinc-700 rounded-md font-semibold hover:bg-zinc-600">Cancel</button>
                <button onClick={handleSave} className="py-2 px-4 text-white bg-primary rounded-md font-semibold hover:bg-primary-dark">Save Changes</button>
            </div>
        </Modal>
    );
};

const ProfilePage: React.FC = () => {
    const { user, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    if (!user) return <div>Loading profile...</div>;

    const handleSave = (updatedData: User) => {
        updateUser(updatedData);
        setIsEditing(false);
    };

    return (
        <div className="space-y-8">
            {isEditing && <EditProfileModal user={user} onSave={handleSave} onClose={() => setIsEditing(false)} />}
            
            <div className="bg-surface p-8 rounded-lg shadow-lg border border-zinc-700 flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-bold text-text">{user.name}</h1>
                    <p className="text-text-muted">{user.email}</p>
                    <p className="mt-4 text-text-muted max-w-2xl">{user.bio}</p>
                </div>
                <button onClick={() => setIsEditing(true)} className="py-2 px-4 text-white bg-primary rounded-md font-semibold hover:bg-primary-dark">
                    Edit Profile
                </button>
            </div>
            
            <div className="bg-surface p-8 rounded-lg shadow-lg border border-zinc-700">
                <h3 className="text-2xl font-semibold text-primary-light mb-4">Skill Galaxy</h3>
                <div className="flex flex-wrap gap-3">
                    {user.skills.map((skill, i) => (
                        <span key={skill} className="bg-secondary/80 text-white px-4 py-2 rounded-full font-medium shadow-glow-secondary" style={{ animation: `fadeInUp 0.5s ease-out ${i * 0.1}s forwards`, opacity: 0 }}>{skill}</span>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-surface p-8 rounded-lg shadow-lg border border-zinc-700">
                    <h3 className="text-2xl font-semibold text-primary-light mb-6">Career Timeline</h3>
                    <div className="relative border-l-2 border-primary/50 ml-3">
                        {user.experience.map((exp, index) => (
                            <div key={index} className="mb-8 pl-8">
                                <div className="absolute -left-[11px] top-1 w-5 h-5 bg-secondary rounded-full border-4 border-surface"></div>
                                <p className="font-semibold text-text text-lg">{exp.role}</p>
                                <p className="text-primary-light">{exp.company}</p>
                                <p className="text-sm text-text-muted mt-1">{exp.years}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-surface p-8 rounded-lg shadow-lg border border-zinc-700">
                    <h3 className="text-2xl font-semibold text-primary-light mb-6">Education</h3>
                    <ul className="space-y-4">
                        {user.education.map((edu, index) => (
                            <li key={index} className="p-4 bg-zinc-900/50 rounded-lg">
                                <p className="font-semibold text-text">{edu.degree}</p>
                                <p className="text-sm text-text-muted">{edu.institution} - {edu.year}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default ProfilePage;