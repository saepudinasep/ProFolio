import type { UserRole } from '@/config/navigation';

export function hasRole(userRole: UserRole | undefined, allowedRoles: UserRole[]): boolean {
  if (!userRole) {
    return false;
  }

  return allowedRoles.includes(userRole);
}
