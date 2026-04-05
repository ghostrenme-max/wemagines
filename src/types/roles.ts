import { ROLES, type RoleId } from '../constants/roles'

export type JobRole = 'all' | RoleId

export type { RoleId }

export const JOB_ROLE_LABELS: Record<RoleId, string> = Object.fromEntries(
  ROLES.map((r) => [r.id, r.label]),
) as Record<RoleId, string>
