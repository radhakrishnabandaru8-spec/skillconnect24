import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, Course, Job } from '../types';
import { MOCK_COURSES, MOCK_JOBS, MOCK_USER } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
  courses: Course[];
  jobs: Job[];
  enrollInCourse: (courseId: string) => void;
  updateCourseProgress: (courseId: string, curriculumId: string) => void;
  postJob: (job: Omit<Job, 'id' | 'postedBy'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getUsersFromStorage = (): User[] => {
  const users = localStorage.getItem('skillconnect_users');
  if (users) {
    return JSON.parse(users);
  }
  localStorage.setItem('skillconnect_users', JSON.stringify([MOCK_USER]));
  return [MOCK_USER];
};

const getLoggedInUserFromStorage = (users: User[]): User | null => {
    const loggedInUserEmail = localStorage.getItem('skillconnect_loggedInEmail');
    if (loggedInUserEmail) {
        return users.find(u => u.email === loggedInUserEmail) || null;
    }
    return null;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(getUsersFromStorage);
  const [user, setUser] = useState<User | null>(() => getLoggedInUserFromStorage(users));
  
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);

  useEffect(() => {
    localStorage.setItem('skillconnect_users', JSON.stringify(users));
  }, [users]);

  const login = async (email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const foundUser = users.find(u => u.email === email);
        if (foundUser && foundUser.password === password) {
          setUser(foundUser);
          localStorage.setItem('skillconnect_loggedInEmail', foundUser.email);
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  };

  const register = async (name: string, email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            const existingUser = users.find(u => u.email === email);
            if (existingUser) {
                reject(new Error('An account with this email already exists.'));
                return;
            }
            const newUser: User = {
                id: `user-${Date.now()}`,
                name,
                email,
                password,
                bio: 'Welcome to SkillConnect! Tell us about yourself.',
                skills: [],
                education: [],
                experience: [],
                enrolledCourses: [],
                completedCourses: [],
                courseProgress: {},
            };
            const updatedUsers = [...users, newUser];
            setUsers(updatedUsers);
            setUser(newUser);
            localStorage.setItem('skillconnect_loggedInEmail', newUser.email);
            resolve();
        }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skillconnect_loggedInEmail');
  };

  const updateUser = (updatedUserInfo: Partial<User>) => {
    if (user) {
        const updatedUser = { ...user, ...updatedUserInfo };
        setUser(updatedUser);
        setUsers(prevUsers => prevUsers.map(u => u.id === user.id ? updatedUser : u));
    }
  };
  
  const enrollInCourse = (courseId: string) => {
    if (user && !user.enrolledCourses.includes(courseId)) {
      const updatedUser = { 
        ...user, 
        enrolledCourses: [...user.enrolledCourses, courseId],
        courseProgress: { ...user.courseProgress, [courseId]: [] }
      };
      updateUser(updatedUser);
    }
  };
  
  const updateCourseProgress = (courseId: string, curriculumId: string) => {
    if (!user) return;
    const currentProgress = user.courseProgress[courseId] || [];
    const isCompleted = currentProgress.includes(curriculumId);
    
    const newProgress = isCompleted 
      ? currentProgress.filter(id => id !== curriculumId)
      : [...currentProgress, curriculumId];

    const course = courses.find(c => c.id === courseId);
    let completedCourses = [...user.completedCourses];

    if (course && newProgress.length === course.curriculum.length && !completedCourses.includes(courseId)) {
      completedCourses.push(courseId);
    } else if (course && newProgress.length < course.curriculum.length && completedCourses.includes(courseId)) {
      completedCourses = completedCourses.filter(id => id !== courseId);
    }

    const updatedUser = {
      ...user,
      courseProgress: { ...user.courseProgress, [courseId]: newProgress },
      completedCourses,
    };
    updateUser(updatedUser);
  };

  const postJob = (jobData: Omit<Job, 'id' | 'postedBy'>) => {
    if (user) {
      const newJob: Job = {
        id: `job-${Date.now()}`,
        postedBy: user.id,
        ...jobData,
      };
      setJobs(prevJobs => [newJob, ...prevJobs]);
    }
  };

  const authContextValue: AuthContextType = {
    user,
    login,
    register,
    logout,
    updateUser,
    courses,
    jobs,
    enrollInCourse,
    postJob,
    updateCourseProgress,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};