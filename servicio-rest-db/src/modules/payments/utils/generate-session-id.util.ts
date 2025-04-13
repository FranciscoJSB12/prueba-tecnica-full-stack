import { v4 as uuidv4 } from 'uuid';

export function generatSessionId(): string {
  return uuidv4();
}
