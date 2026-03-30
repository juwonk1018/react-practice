import {
  ContractWithCompanyInfo,
  CONTRACT_STATE,
  CONTRACT_STATE_TEXT,
  DELIVERY_STATUS,
  isAccountRequired,
  isContractActive,
} from '../../types/contract';
import { addDate, diffDate } from '../../utils';

// ============================================================================
// Time Constants & Calculations
// ============================================================================

const MINUTES_PER_HOUR = 60;
const MINUTES_PER_DAY = 60 * 24;
const TWO_DAYS_IN_MINUTES = MINUTES_PER_DAY * 2;

export const CONTRACT_TIME_CONSTANTS = {
  MINUTES_PER_HOUR,
  MINUTES_PER_DAY,
  TWO_DAYS_IN_MINUTES,
} as const;

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

// ============================================================================
// Grouped Contract State Helpers
// ============================================================================

/**
 * Get contract state-related flags
 */
export function getContractState(contract: ContractWithCompanyInfo) {
  const { currentState } = contract;

  return {
    isCancelled: currentState === CONTRACT_STATE.CANCELLED,
    isWaiting: currentState === CONTRACT_STATE.WAITING_FOR_SELECTION,
    isSelected: currentState === CONTRACT_STATE.SELECTION_COMPLETED,
    isNotSelected: currentState === CONTRACT_STATE.NOT_SELECTED,
    isPurchased: currentState === CONTRACT_STATE.PURCHASE_COMPLETED,
    isReviewCompleted: currentState === CONTRACT_STATE.REVIEW_COMPLETED,
    isEvaluationCompleted: currentState === CONTRACT_STATE.EVALUATION_COMPLETED,
  };
}

/**
 * Get delivery-related information
 */
export function getDeliveryInfo(contract: ContractWithCompanyInfo) {
  const { deliveryMethod, deliveryHistory } = contract;

  const isModificationRequested = !!(
    deliveryHistory &&
    deliveryHistory.length > 0 &&
    deliveryHistory[deliveryHistory.length - 1].state === DELIVERY_STATUS.INFORMATION_MODIFY_REQUEST
  );

  return {
    isPR: deliveryMethod === 'PR',
    isDirect: deliveryMethod === 'DIRECT',
    isModificationRequested,
  };
}

/**
 * Get payment-related information
 */
export function getPaymentInfo(contract: ContractWithCompanyInfo) {
  const { payment, discount, deliveryMethod } = contract;

  return {
    hasPayment: !!payment || !!discount,
    amount: (deliveryMethod === 'PR' ? payment : discount) || 0,
    type: deliveryMethod === 'PR' ? 'refund' : 'discount',
  };
}

/**
 * Get review-related information
 */
export function getReviewInfo(contract: ContractWithCompanyInfo) {
  const { review, currentState } = contract;

  return {
    hasReview: !!review,
    isCompleted: currentState === CONTRACT_STATE.REVIEW_COMPLETED,
    content: review || null,
  };
}

// ============================================================================
// Display Logic
// ============================================================================

export function getDisplayDate(contract: ContractWithCompanyInfo): string {
  const isWaitingOrNotSelected =
    contract.currentState === CONTRACT_STATE.WAITING_FOR_SELECTION ||
    contract.currentState === CONTRACT_STATE.NOT_SELECTED;

  if (isWaitingOrNotSelected) {
    return contract.appliedAt || contract.date0;
  }

  return contract.selectedAt || contract.date0;
}

export interface RevisitBadgeResult {
  shouldShow: boolean;
  daysRemaining: number;
}

export function getRevisitBadgeInfo(contract: ContractWithCompanyInfo): RevisitBadgeResult {
  const company = contract.ad;
  const mainDate = contract.selectedAt || contract.date0;
  const daysRemaining = diffDate(addDate(mainDate, company.revisitPeriod), new Date());

  const shouldShow =
    isContractActive(contract.currentState) &&
    company.available === 0 &&
    daysRemaining > 0 &&
    company.type === 'S';

  return {
    shouldShow,
    daysRemaining,
  };
}

export function getFirstcomeProductText(
  contract: ContractWithCompanyInfo,
  isRequested: boolean
): string {
  if (isRequested) {
    return 'Modify product info';
  }

  if (
    contract.currentState === CONTRACT_STATE.PURCHASE_COMPLETED &&
    contract.payPrice !== undefined &&
    contract.payPrice > 0
  ) {
    return 'Purchase Complete';
  }

  return CONTRACT_STATE_TEXT[contract.currentState];
}

// ============================================================================
// UI Conditions
// ============================================================================

export function isStoreVisitReady(contract: ContractWithCompanyInfo): boolean {
  const company = contract.ad;
  return (
    company.category.firstName === 'Store' &&
    contract.currentState === CONTRACT_STATE.SELECTION_COMPLETED
  );
}

export function shouldShowPointWithdrawalButton(contract: ContractWithCompanyInfo): boolean {
  const company = contract.ad;
  return company.type === 'A' && isAccountRequired(contract);
}

export function shouldShowTags(contract: ContractWithCompanyInfo): boolean {
  return contract.currentState !== CONTRACT_STATE.WAITING_FOR_SELECTION;
}
