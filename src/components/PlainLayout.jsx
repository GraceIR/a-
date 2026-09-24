import { Outlet } from 'react-router-dom';

export default function BookingLayout() {
  return (
    <div className="booking-layout-wrapper">
      <Outlet />
    </div>
  );
}