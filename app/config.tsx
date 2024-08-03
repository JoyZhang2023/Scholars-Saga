import { usePathname } from "next/navigation";

import {Calendar, BookA, Home, NotebookPen, User, UserRoundCog} from 'lucide-react';
import {Event} from "next/dist/compiled/@edge-runtime/primitives";

export const NavItems = () => {
    const pathname = usePathname();

    function isNavItemActive(pathname: string, nav: string) {
        return pathname.includes(nav);
    }

    return [
        {
            name: 'Home',
            href: '/',
            icon: <Home size = {20} />,
            active: pathname === '/',
            position: 'top'
        },
        {
            name: 'Profile',
            href: '/profile',
            icon: <User size = {20} />,
            active: isNavItemActive(pathname, '/profile'),
            position: 'top'
        },
        {
            name: 'Calendar',
            href: '/Calendar',
            icon: <Calendar size = {20} />,
            active: isNavItemActive(pathname, '/calendar'),
            position: 'top'
        },
        {
            name: 'Catalog',
            href: '/Catalog',
            icon: <BookA size = {20} />,
            active: isNavItemActive(pathname, '/book-catalog'),
            position: 'top'
        },
        {
            name: 'EduPlan',
            href: '/EduPlan',
            icon: <NotebookPen size = {20} />,
            active: isNavItemActive(pathname, '/notebook-plan'),
            position: 'top'
        },
        {
            name: 'AI Assistant',
            href: '/AI Assistant',
            icon: <UserRoundCog size={20}/>,
            active: isNavItemActive(pathname, '/user-roundcog'),
            position: 'top'
        }
    ]
}