import { CalendarClock, ClipboardList, Clock, Contact, Github, Home, Settings, User } from "lucide-react";
import MenuItem from "types/MenuItem";

export const unauthed_menu:MenuItem[] = [
  {
    icon: Home,
    label: 'Home',
    href: '/'
  },
  {
    icon: Github,
    label: 'Github Repo',
    href: 'https://github.com/TimotejKovacka/precedent-dashboard-analytics'
  },
  {
    icon: Contact,
    label: 'Contact',
    href: '/contact'
  }
];

export const authed_menu:MenuItem[] = [
  {
    icon: Home,
    label: 'Home',
    href: '/'
  },{
    icon: User,
    label: 'Profile',
    href: '/profile'
  },{
    icon: Contact,
    label: 'Contact',
    href: '/contact'
  },{
    icon: CalendarClock,
    label: 'Meetings',
    href: '/meetings'
  },{
    icon: ClipboardList,
    label: 'Tasks',
    href: '/tasks'
  },{
    icon: Settings,
    label: 'Settings',
    href: '/settings'
  },
];