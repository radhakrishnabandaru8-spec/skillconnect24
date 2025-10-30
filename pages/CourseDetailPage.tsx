import React, { useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Modal from '../components/Modal';

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user, courses, enrollInCourse, updateCourseProgress } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathwayRef = useRef<HTMLDivElement>(null);

  const course = courses.find(c => c.id === courseId);
  
  if (!course || !user) {
    return (
        <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-text">Course not found.</h2>
            <Link to="/courses" className="text-primary-light hover:underline mt-4 inline-block">Back to Courses</Link>
        </div>
    );
  }
  
  const isEnrolled = user.enrolledCourses.includes(course.id);
  const isCompleted = user.completedCourses.includes(course.id);
  const progress = user.courseProgress[course.id] || [];
  const progressPercentage = (progress.length / course.curriculum.length) * 100;
  
  const nextLesson = course.curriculum.find(item => !progress.includes(item.id));

  const handleEnroll = () => {
    enrollInCourse(course.id);
    setIsModalOpen(true);
  }

  const handleStartNextLesson = () => {
    if (nextLesson) {
      const element = document.getElementById(`lesson-${nextLesson.id}`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (pathwayRef.current) {
        pathwayRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ActionButton: React.FC = () => {
    if (isCompleted) {
        return <button disabled className="w-full md:w-auto py-3 px-8 text-background bg-success rounded-md font-semibold cursor-not-allowed">Course Completed!</button>;
    }
    if (isEnrolled) {
        return <button onClick={handleStartNextLesson} className="w-full md:w-auto py-3 px-8 text-white bg-secondary rounded-md font-semibold hover:bg-purple-700 transition-colors">
            {progress.length > 0 ? 'Continue Learning' : 'Start Course'}
        </button>;
    }
    return <button onClick={handleEnroll} className="w-full md:w-auto py-3 px-8 text-white bg-primary rounded-md font-semibold hover:bg-primary-dark transition-colors">Enroll Now</button>;
  };
  
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Enrollment Successful!"
      >
        <p className="text-text-muted mb-4">
          You've successfully enrolled in <strong>{course.title}</strong>. Ready to start learning?
        </p>
        <div className="mt-6 flex justify-end gap-4">
          <button onClick={() => setIsModalOpen(false)} className="py-2 px-4 text-text-muted bg-zinc-700 rounded-md font-semibold hover:bg-zinc-600">
            Maybe Later
          </button>
          <button onClick={() => { setIsModalOpen(false); handleStartNextLesson(); }} className="py-2 px-4 text-white bg-primary rounded-md font-semibold hover:bg-primary-dark">
            Let's Go!
          </button>
        </div>
      </Modal>

      <div className="space-y-8">
        <div className="bg-surface p-8 rounded-lg shadow-lg border border-zinc-700">
          <button onClick={() => navigate(-1)} className="text-primary-light hover:underline mb-6">&larr; Back to Courses</button>
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
              <div>
                <h1 className="text-4xl font-bold text-text">{course.title}</h1>
                <p className="mt-2 text-text-muted max-w-3xl">{course.description}</p>
                <div className="flex flex-wrap gap-2 my-4">
                    {course.tags.map(tag => (
                        <span key={tag} className="text-xs bg-zinc-700 text-text-muted px-2 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
                <div className="flex items-center gap-4 text-sm text-text-muted">
                    <span>Duration: {course.duration}</span>
                    <span>&bull;</span>
                    <span>Level: {course.skillLevel}</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                  <ActionButton />
              </div>
          </div>
        </div>

        {isEnrolled && (
          <div ref={pathwayRef} className="bg-surface p-8 rounded-lg shadow-lg border border-zinc-700">
            <h2 className="text-2xl font-bold text-primary-light mb-2">Learning Pathway</h2>
            <p className="text-text-muted mb-6">Complete all modules to finish the course.</p>
            
            <div className="w-full bg-zinc-700 rounded-full h-2.5 mb-6">
                <div className="bg-secondary h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            
            <ul className="space-y-4">
              {course.curriculum.map((item, index) => {
                const isItemCompleted = progress.includes(item.id);
                return (
                  <li key={item.id} id={`lesson-${item.id}`} className="p-4 bg-zinc-900/50 rounded-lg flex items-center gap-4 transition-all border-2 border-transparent">
                    <input
                      type="checkbox"
                      id={`curriculum-${item.id}`}
                      checked={isItemCompleted}
                      onChange={() => updateCourseProgress(course.id, item.id)}
                      className="h-6 w-6 rounded border-zinc-500 text-secondary focus:ring-secondary cursor-pointer"
                    />
                    <label htmlFor={`curriculum-${item.id}`} className="flex-1 cursor-pointer">
                      <p className={`font-semibold ${isItemCompleted ? 'text-text-muted line-through' : 'text-text'}`}>
                        {index + 1}. {item.topic}
                      </p>
                      <p className="text-sm text-text-muted">{item.details}</p>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default CourseDetailPage;