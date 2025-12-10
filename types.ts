export interface Activity {
  name: string;
  hours: string;
  cost: string; // The text description from AI (e.g., "¥500 approx")
  description: string;
  userCost?: number; // The manual numeric input from the user
}

export interface DayPlan {
  day: number;
  theme: string;
  activities: Activity[];
}

export interface TravelFormData {
  destination: string;
  duration: number;
  interests: string;
}