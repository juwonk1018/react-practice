export interface Company {
  adId: string;
  name: string;
  thumbnail: string;
  category: {
    firstName: string;
  };
  type: 'A' | 'S'; // A: Premium (Selection), S: First-come
  available: number;
  revisitPeriod: number;
  normalPoint?: number;
  vipPoint?: number;
  vvipPoint?: number;
}

export interface Contract {
  id: string;
  currentState: number;
  date0: string;
  createdAt: string;
  appliedAt?: string;
  selectedAt?: string;
  deadline?: number;
  first: string;
  deliveryMethod?: 'PR' | 'DIRECT';
  deliveryHistory?: Array<{
    state: number;
  }>;
  rewardStatus: number | null;
  payment?: number;
  discount?: number;
  payPrice?: number;
  review?: string;
}

export interface ContractWithCompanyInfo extends Contract {
  ad: Company;
}

// Contract States
export const CONTRACT_STATE = {
  WAITING_FOR_SELECTION: 1,
  SELECTION_COMPLETED: 2,
  NOT_SELECTED: 3,
  PURCHASE_COMPLETED: 4,
  REVIEW_COMPLETED: 5,
  EVALUATION_COMPLETED: 6,
  CANCELLED: 7,
} as const;

export const CONTRACT_STATE_TEXT: Record<number, string> = {
  [CONTRACT_STATE.WAITING_FOR_SELECTION]: 'Waiting for Selection',
  [CONTRACT_STATE.SELECTION_COMPLETED]: 'Selected',
  [CONTRACT_STATE.NOT_SELECTED]: 'Not Selected',
  [CONTRACT_STATE.PURCHASE_COMPLETED]: 'Purchase Complete',
  [CONTRACT_STATE.REVIEW_COMPLETED]: 'Review Complete',
  [CONTRACT_STATE.EVALUATION_COMPLETED]: 'Evaluation Complete',
  [CONTRACT_STATE.CANCELLED]: 'Cancelled',
};

export const CONTRACT_IMAGE_BADGE_STATE = [
  CONTRACT_STATE.NOT_SELECTED,
  CONTRACT_STATE.CANCELLED,
];

export const DELIVERY_STATUS = {
  INFORMATION_MODIFY_REQUEST: 1,
} as const;

// Helper functions
export function isContractActive(state: number): boolean {
  return state === CONTRACT_STATE.SELECTION_COMPLETED ||
         state === CONTRACT_STATE.PURCHASE_COMPLETED;
}

export function isContractInActive(state: number): boolean {
  return state === CONTRACT_STATE.NOT_SELECTED ||
         state === CONTRACT_STATE.CANCELLED ||
         state === CONTRACT_STATE.REVIEW_COMPLETED ||
         state === CONTRACT_STATE.EVALUATION_COMPLETED;
}

export function isAccountRequired(contract: Contract): boolean {
  return contract.currentState === CONTRACT_STATE.REVIEW_COMPLETED &&
         contract.rewardStatus === null;
}

export function getPointWithdrawalStatus(
  company: Company,
  contract: Contract
): string | null {
  if (contract.rewardStatus === null && company.type === 'A') {
    return 'Point Withdrawal Pending';
  }
  if (contract.rewardStatus === 1) {
    return 'Point Withdrawal Complete';
  }
  return null;
}
