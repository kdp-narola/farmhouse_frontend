import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole = 'customer' | 'owner' | 'admin';
export type BookingType = 'hourly' | 'daily';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type PropertyStatus = 'pending' | 'active' | 'rejected';
export type PaymentStatus = 'pending' | 'completed' | 'refunded';

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Property {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  location: string;
  price_hourly?: number;
  price_daily?: number;
  amenities: string[];
  images: string[];
  status: PropertyStatus;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  property_id: string;
  customer_id: string;
  booking_type: BookingType;
  start_time: string;
  end_time: string;
  total_price: number;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  booking_id: string;
  customer_id: string;
  amount: number;
  payment_method: string;
  status: PaymentStatus;
  transaction_id?: string;
  created_at: string;
}
