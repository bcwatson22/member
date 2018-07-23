import { NavItem } from './models/nav-item';

// Mock values for the navData, in JSON format event though it currently lives in a TypeScript file. This should allow seamless
// switchover for the app to receieve JSON data asynchronously as and when that might happen!
export const NAVITEMS: NavItem[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    position: 1,
    cssClass: 'home'
  },
  {
    id: 'account',
    name: 'Account',
    position: 2,
    cssClass: 'user'
  },
  {
    id: 'bills',
    name: 'Bills',
    position: 3,
    cssClass: 'gbp'
  },
  {
    id: 'broadband',
    name: 'Broadband',
    position: 4,
    cssClass: 'wifi'
  },
  {
    id: 'phone',
    name: 'Phone',
    position: 5
  },
  {
    id: 'mobile',
    name: 'Mobile',
    position: 6
  },
  {
    id: 'tv',
    name: 'TV',
    position: 7
  }
];
