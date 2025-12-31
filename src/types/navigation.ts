export type Screen =
  | 'landing'
  | 'login'
  | 'register'
  | 'customer-dashboard'
  | 'owner-dashboard'
  | 'admin-dashboard'
  | 'search'
  | 'property-detail'
  | 'booking-flow'
  | 'booking-confirmation'
  | 'wishlist'
  | 'messages'
  | 'add-property'
  | 'edit-property'
  | 'manage-bookings'
  | 'admin-properties'
  | 'admin-users'
  | 'admin-reports';

export interface NavigationState {
  currentScreen: Screen;
  propertyId?: string;
  bookingId?: string;
}
