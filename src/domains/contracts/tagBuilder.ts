import {
  ContractWithCompanyInfo,
  Company,
  CONTRACT_STATE,
  isContractInActive,
  getPointWithdrawalStatus,
} from '../../types/contract';
import { formatReviewRemain, formatReviewOverdue } from './utils';

export interface StatusTag {
  title: string;
  color: string;
  key: string;
}

// Tag color constants
const TAG_COLORS = {
  NEUTRAL: 'bg-gray-200 text-gray-700',
  INFO: 'bg-blue-100 text-blue-700',
  WARNING: 'bg-red-100 text-red-700',
} as const;

// State tag configurations
const STATE_TAG_CONFIG: Record<number, { title: string; key: string }> = {
  [CONTRACT_STATE.CANCELLED]: { title: 'Cancelled', key: 'cancelled' },
  [CONTRACT_STATE.WAITING_FOR_SELECTION]: { title: 'Waiting', key: 'waitingSelection' },
  [CONTRACT_STATE.SELECTION_COMPLETED]: { title: 'Selected', key: 'selectionCompleted' },
  [CONTRACT_STATE.NOT_SELECTED]: { title: 'Not Selected', key: 'notSelected' },
};

/**
 * Build status tag based on contract state
 */
function buildStateTag(currentState: number, reviewRemain: number): StatusTag | null {
  // Review completed states
  if (
    currentState === CONTRACT_STATE.REVIEW_COMPLETED ||
    currentState === CONTRACT_STATE.EVALUATION_COMPLETED
  ) {
    return {
      title: 'Review Complete',
      color: TAG_COLORS.NEUTRAL,
      key: 'reviewFinished',
    };
  }

  // Known state tags
  const stateConfig = STATE_TAG_CONFIG[currentState];
  if (stateConfig) {
    return {
      ...stateConfig,
      color: TAG_COLORS.NEUTRAL,
    };
  }

  // Review deadline tags
  if (reviewRemain >= 0) {
    return {
      title: formatReviewRemain(reviewRemain),
      color: TAG_COLORS.INFO,
      key: 'reviewRemain',
    };
  }

  // Overdue tag
  return {
    title: formatReviewOverdue(reviewRemain),
    color: TAG_COLORS.WARNING,
    key: 'reviewOver',
  };
}

/**
 * Build review/feedback tag
 */
function buildFeedbackTag(contract: ContractWithCompanyInfo): StatusTag {
  const { currentState, review } = contract;

  const hasReview = !!review;
  const isInactive = isContractInActive(currentState);

  const color = hasReview || isInactive ? TAG_COLORS.NEUTRAL : TAG_COLORS.INFO;

  return {
    title: hasReview ? 'Review Done' : 'Review Pending',
    color,
    key: hasReview ? 'feedbackFinished' : 'feedbackRemain',
  };
}

/**
 * Build point withdrawal status tag
 */
function buildPointStatusTag(
  company: Company,
  contract: ContractWithCompanyInfo
): StatusTag | null {
  const pointStatusTitle = getPointWithdrawalStatus(company, contract);

  if (!pointStatusTitle) {
    return null;
  }

  const isInactive = isContractInActive(contract.currentState);
  const color = isInactive ? TAG_COLORS.NEUTRAL : TAG_COLORS.INFO;

  return {
    title: pointStatusTitle,
    color,
    key: 'rewardStatusTag',
  };
}

/**
 * Build all status tags for a contract
 */
export function buildStatusTags(
  contract: ContractWithCompanyInfo,
  reviewRemain: number
): StatusTag[] {
  const tags: StatusTag[] = [];
  const company = contract.ad;

  // 1. State tag
  const stateTag = buildStateTag(contract.currentState, reviewRemain);
  if (stateTag) {
    tags.push(stateTag);
  }

  // 2. Feedback/Review tag
  const feedbackTag = buildFeedbackTag(contract);
  tags.push(feedbackTag);

  // 3. Point withdrawal status tag
  const pointStatusTag = buildPointStatusTag(company, contract);
  if (pointStatusTag) {
    tags.push(pointStatusTag);
  }

  return tags;
}
