import { MOBILE_ROUTES, PUBLIC_ROUTES } from "@/lib/constants";

export type NavItem = (typeof PUBLIC_ROUTES)[number];
export type MobileNavItem = (typeof MOBILE_ROUTES)[number];

export function getPublicNavigation(): readonly NavItem[] {
  return PUBLIC_ROUTES;
}

export function getMobileNavigation(): readonly MobileNavItem[] {
  return MOBILE_ROUTES;
}

export function isPublicPath(pathname: string): boolean {
  return PUBLIC_ROUTES.some(
    (route) => route.href === pathname || pathname.startsWith(`${route.href}/`),
  );
}
