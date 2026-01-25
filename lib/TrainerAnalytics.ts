/**
 * COBEL AI ENGINE - FEATURE 2
 * Adaptive Trainer Logic & Performance Analytics
 */

// Basic metrics for the trainer overview cards
export const getTrainerMetrics = async () => {
  return {
    efficiency: 88, // Injected placeholder value
    activeStudents: 12,
    pathOptimizationRate: "94%"
  };
};

/**
 * FIXED: This specific export was missing, causing the build to fail.
 * It provides the data for the 'Student Performance' table/chart.
 */
export const getStudentPerformanceOverview = async () => {
  return [
    { 
      id: "1", 
      name: "Jean Dupont", 
      fluency: 89, 
      progress: 75, 
      status: "optimized" 
    },
    { 
      id: "2", 
      name: "Marie Curie", 
      fluency: 94, 
      progress: 40, 
      status: "active" 
    }
  ];
};
