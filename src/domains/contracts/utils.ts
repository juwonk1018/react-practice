import { ContractWithCompanyInfo } from '../../types/contract';

// Time constants
const MINUTES_PER_HOUR = 60;
const MINUTES_PER_DAY = 60 * 24;
const TWO_DAYS_IN_MINUTES = MINUTES_PER_DAY * 2;

// Calculate minutes difference between now and contract main date
export function calcRemain(contract: ContractWithCompanyInfo): number {
  const mainDate = contract.selectedAt || contract.date0;
  const now = new Date();
  const target = new Date(mainDate);
  return Math.floor((now.getTime() - target.getTime()) / (1000 * 60));
}

// Format review deadline remaining time
export function formatReviewRemain(remainMinutes: number): string {
  if (remainMinutes > TWO_DAYS_IN_MINUTES) {
    return `Deadline ${Math.floor(remainMinutes / MINUTES_PER_DAY)} days left`;
  }
  if (remainMinutes > MINUTES_PER_HOUR) {
    return `Deadline ${Math.floor(remainMinutes / MINUTES_PER_HOUR)} hours left`;
  }
  return `Deadline ${remainMinutes} minutes left`;
}

// Format review deadline overdue time
export function formatReviewOverdue(remainMinutes: number): string {
  return `Overdue by ${Math.ceil(Math.abs(remainMinutes / MINUTES_PER_DAY))} days`;
}

// Export constants for use in other files
export const CONTRACT_TIME_CONSTANTS = {
  MINUTES_PER_HOUR,
  MINUTES_PER_DAY,
  TWO_DAYS_IN_MINUTES,
} as const;
