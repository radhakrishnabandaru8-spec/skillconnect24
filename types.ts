export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  bio: string;
  skills: string[];
  education: { institution: string; degree: string; year: string }[];
  experience: { company: string; role: string; years: string }[];
  enrolledCourses: string[]; // Array of course IDs
  completedCourses: string[]; // Array of course IDs
  courseProgress: Record<string, string[]>; // e.g., { "course-1": ["curriculum-1-1", "curriculum-1-2"] }
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  curriculum: { id: string; topic: string; details: string }[];
}

export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  requiredSkills: string[];
  contactInfo: string;
  postedBy: string; // User ID
}