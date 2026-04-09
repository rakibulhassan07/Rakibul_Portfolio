// TypeScript types for Vlog data
export interface VlogPost {
  id: string;
  image: string;
  location: string;
  description: string;
  date: string;
  tall?: boolean;
  created_at?: string;
}

export interface VlogCardProps {
  image: string;
  location: string;
  description: string;
  date: string;
  index: number;
  tall?: boolean;
}
