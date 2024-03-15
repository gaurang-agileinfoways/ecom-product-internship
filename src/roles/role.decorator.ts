import { SetMetadata } from '@nestjs/common';
import { Roles } from './enums/roles.enum';

export const ROLES_KEY = 'roles';
export const Role = (...role: Roles[]) => SetMetadata(ROLES_KEY, role);
