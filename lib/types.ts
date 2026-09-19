export interface Recipe {
  id: number;
  title: string;
  description: string | null;
  ingredients: string;
  instructions: string;
  prep_time_minutes: number | null;
  created_at: Date;
}