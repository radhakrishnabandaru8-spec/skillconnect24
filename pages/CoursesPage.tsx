import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Course } from '../types';
import { Link } from 'react-router-dom';

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
    return (
        <div className="bg-surface border border-zinc-700 p-6 rounded-lg shadow-lg flex flex-col justify-between hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
            <div>
                <h3 className="text-xl font-bold text-primary-light mb-2">{course.title}</h3>
                <p className="text-text-muted mb-4 line-clamp-3">{course.description}</p>
                <div className="flex justify-between items-center text-sm text-text-muted mb-4">
                    <span>{course.duration}</span>
                    <span className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                        course.skillLevel === 'Beginner' ? 'bg-success/80' : 
                        course.skillLevel === 'Intermediate' ? 'bg-warning/80' : 'bg-danger/80'
                    }`}>{course.skillLevel}</span>
                </div>
                 <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags.map(tag => (
                        <span key={tag} className="text-xs bg-zinc-700 text-text-muted px-2 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
            </div>
            <Link
                to={`/courses/${course.id}`}
                className="w-full text-center mt-4 py-2 px-4 text-white bg-primary rounded-md font-semibold hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary transition-colors"
            >
                View Details
            </Link>
        </div>
    );
};

const CoursesPage: React.FC = () => {
  const { courses } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold text-text mb-6">Explore Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;