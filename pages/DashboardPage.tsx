import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Course, Job } from '../types';
import { Link } from 'react-router-dom';

// New component for the donut chart
const ProgressCircle: React.FC<{ percentage: number }> = ({ percentage }) => {
    const circumference = 2 * Math.PI * 52; // 2 * pi * radius
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 120 120">
                <circle
                    className="text-zinc-700"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="52"
                    cx="60"
                    cy="60"
                />
                <circle
                    className="text-secondary"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="52"
                    cx="60"
                    cy="60"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-text">{Math.round(percentage)}%</span>
            </div>
        </div>
    );
};

// New Quick Action Card
const QuickActionCard: React.FC<{ title: string; to: string; icon: React.ReactNode }> = ({ title, to, icon }) => (
    <Link to={to} className="bg-surface p-4 rounded-lg shadow-lg border border-zinc-700 flex flex-col items-center justify-center text-center hover:border-primary hover:-translate-y-1 transition-all">
        <div className="bg-primary/20 text-primary-light rounded-full p-3 mb-2">
            {icon}
        </div>
        <p className="font-semibold text-text">{title}</p>
    </Link>
);


const CourseStatusCard: React.FC<{ course: Course, isCompleted: boolean }> = ({ course, isCompleted }) => (
    <Link to={`/courses/${course.id}`} className="block p-4 border border-zinc-700 rounded-lg hover:bg-zinc-700/50 transition-all flex justify-between items-center group">
        <div>
            <h4 className="font-semibold text-primary-light group-hover:underline">{course.title}</h4>
            <p className="text-sm text-text-muted">{course.skillLevel}</p>
        </div>
        {isCompleted ? (
            <span className="text-xs font-bold text-white bg-success px-3 py-1 rounded-full">COMPLETED</span>
        ) : (
            <span className="text-xs font-bold text-background bg-warning px-3 py-1 rounded-full">IN PROGRESS</span>
        )}
    </Link>
);

const JobPostingCard: React.FC<{ job: Job }> = ({ job }) => (
    <Link to={`/jobs/${job.id}`} className="block p-4 border border-zinc-700 rounded-lg hover:bg-zinc-700/50 transition-all group">
        <h4 className="font-semibold text-primary-light group-hover:underline">{job.title}</h4>
        <p className="text-sm text-text-muted">{job.company} - {job.location}</p>
    </Link>
);

const RecommendedCourseCard: React.FC<{ course: Course }> = ({ course }) => (
    <div className="bg-surface p-6 rounded-lg shadow-lg border-2 border-dashed border-secondary shadow-glow-secondary">
        <h3 className="text-xl font-bold text-text mb-2">Recommended For You</h3>
        <p className="text-text-muted mb-4">Based on your skills, we think you'll find this course valuable:</p>
        <div className="bg-zinc-900/50 p-4 rounded-lg">
            <h4 className="font-semibold text-secondary">{course.title}</h4>
            <p className="text-sm text-text-muted mt-1 line-clamp-2">{course.description}</p>
            <div className="flex flex-wrap gap-2 my-3">
                {course.tags.map(tag => (
                    <span key={tag} className="text-xs bg-zinc-700 text-text-muted px-2 py-1 rounded-full">{tag}</span>
                ))}
            </div>
            <Link to={`/courses/${course.id}`} className="inline-block mt-2 py-2 px-4 text-white bg-secondary rounded-md font-semibold hover:bg-purple-700 transition-colors text-sm">
                View Course
            </Link>
        </div>
    </div>
);


const DashboardPage: React.FC = () => {
  const { user, courses, jobs } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  const enrolledCoursesDetails = courses.filter(course => user.enrolledCourses.includes(course.id));
  const postedJobs = jobs.filter(job => job.postedBy === user.id);

  // Calculate overall progress
  // FIX: Explicitly typing the accumulator `sum` as `number` to fix potential type inference issues.
  const totalModules = enrolledCoursesDetails.reduce((sum: number, course) => sum + course.curriculum.length, 0);
  const completedModules = Object.values(user.courseProgress).reduce((sum: number, progress) => sum + (Array.isArray(progress) ? progress.length : 0), 0);
  const overallProgress = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  // Find recommended course
  const unenrolledCourses = courses.filter(c => !user.enrolledCourses.includes(c.id));
  const recommendedCourse = unenrolledCourses.find(c => c.tags.some(tag => user.skills.includes(tag))) || unenrolledCourses[0] || null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-surface p-6 rounded-lg shadow-lg border border-zinc-700 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-text">Welcome back, {user.name.split(' ')[0]}!</h1>
            <p className="text-text-muted mt-1">Ready to unlock your potential today?</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-text-muted mb-2">Overall Progress</p>
            <ProgressCircle percentage={overallProgress} />
          </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <QuickActionCard title="Explore Courses" to="/courses" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>} />
        <QuickActionCard title="Find Jobs" to="/jobs" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} />
        <QuickActionCard title="Update Profile" to="/profile" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} />
        <QuickActionCard title="Post a Job" to="/jobs" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-text mb-4">My Learning</h2>
            <div className="bg-surface p-6 rounded-lg shadow-lg border border-zinc-700">
            {enrolledCoursesDetails.length > 0 ? (
                <ul className="space-y-4">
                {enrolledCoursesDetails.map((course: Course) => (
                    <CourseStatusCard 
                        key={course.id} 
                        course={course}
                        isCompleted={user.completedCourses.includes(course.id)} 
                    />
                ))}
                </ul>
            ) : (
                <div className="text-center py-8">
                    <p className="text-text-muted mb-4">You haven't enrolled in any courses yet.</p>
                    <Link to="/courses" className="py-2 px-4 text-white bg-primary rounded-md font-semibold hover:bg-primary-dark">
                        Explore Courses
                    </Link>
                </div>
            )}
            </div>
        </div>
        <div className="space-y-8">
            {recommendedCourse && <RecommendedCourseCard course={recommendedCourse} />}
            <div>
                <h2 className="text-2xl font-bold text-text mb-4">My Job Postings</h2>
                <div className="bg-surface p-6 rounded-lg shadow-lg border border-zinc-700">
                {postedJobs.length > 0 ? (
                    <ul className="space-y-4">
                    {postedJobs.map((job: Job) => (
                        <JobPostingCard key={job.id} job={job} />
                    ))}
                    </ul>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-text-muted mb-4">You haven't posted any jobs yet.</p>
                        <Link to="/jobs" className="py-2 px-4 text-white bg-primary rounded-md font-semibold hover:bg-primary-dark">
                            Post a Job
                        </Link>
                    </div>
                )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;