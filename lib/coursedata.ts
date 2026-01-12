export const coursesdata = [
  { id: 'ielts-65', title: 'IELTS 6.5 Prep', level: 'intermediate', category: 'bilingual' },
  { id: 'smart-contracts', title: 'Smart Contracts (Solidity)', level: 'advanced', category: 'technical' },
  { id: 'vocational-fr', title: 'Vocational Technical French', level: 'beginner', category: 'technical' }
];

export const getCoursesByLevel = (level: string) => {
  return coursesdata.filter(course => course.level === level);
};

export const getCourseById = (id: string) => {
  return coursesdata.find(course => course.id === id);
};