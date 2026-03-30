import {
  getPaymentInfo,
  getDeliveryInfo,
  getContractState,
  formatReviewRemain,
} from './utils';
import { ContractWithCompanyInfo, CONTRACT_STATE, DELIVERY_STATUS } from '../../types/contract';

describe('Contract Utils', () => {
  describe('getPaymentInfo', () => {
    it('should return payment info for PR delivery', () => {
      const contract = {
        payment: 5000,
        discount: 3000,
        deliveryMethod: 'PR',
      } as ContractWithCompanyInfo;

      const result = getPaymentInfo(contract);

      expect(result.hasPayment).toBe(true);
      expect(result.amount).toBe(5000);
      expect(result.type).toBe('refund');
    });

    it('should return payment info for DIRECT delivery', () => {
      const contract = {
        payment: 5000,
        discount: 3000,
        deliveryMethod: 'DIRECT',
      } as ContractWithCompanyInfo;

      const result = getPaymentInfo(contract);

      expect(result.hasPayment).toBe(true);
      expect(result.amount).toBe(3000);
      expect(result.type).toBe('discount');
    });

    it('should handle no payment', () => {
      const contract = {
        payment: undefined,
        discount: undefined,
        deliveryMethod: 'PR',
      } as ContractWithCompanyInfo;

      const result = getPaymentInfo(contract);

      expect(result.hasPayment).toBe(false);
      expect(result.amount).toBe(0);
    });
  });

  describe('getDeliveryInfo', () => {
    it('should detect PR delivery', () => {
      const contract = {
        deliveryMethod: 'PR',
        deliveryHistory: [],
      } as ContractWithCompanyInfo;

      const result = getDeliveryInfo(contract);

      expect(result.isPR).toBe(true);
      expect(result.isDirect).toBe(false);
    });

    it('should detect modification request', () => {
      const contract = {
        deliveryMethod: 'PR',
        deliveryHistory: [
          { state: DELIVERY_STATUS.INFORMATION_MODIFY_REQUEST },
        ],
      } as ContractWithCompanyInfo;

      const result = getDeliveryInfo(contract);

      expect(result.isModificationRequested).toBe(true);
    });

    it('should handle empty delivery history', () => {
      const contract = {
        deliveryMethod: 'PR',
        deliveryHistory: [],
      } as ContractWithCompanyInfo;

      const result = getDeliveryInfo(contract);

      expect(result.isModificationRequested).toBe(false);
    });
  });

  describe('getContractState', () => {
    it('should identify cancelled contract', () => {
      const contract = {
        currentState: CONTRACT_STATE.CANCELLED,
      } as ContractWithCompanyInfo;

      const result = getContractState(contract);

      expect(result.isCancelled).toBe(true);
      expect(result.isWaiting).toBe(false);
      expect(result.isSelected).toBe(false);
    });

    it('should identify waiting contract', () => {
      const contract = {
        currentState: CONTRACT_STATE.WAITING_FOR_SELECTION,
      } as ContractWithCompanyInfo;

      const result = getContractState(contract);

      expect(result.isWaiting).toBe(true);
      expect(result.isCancelled).toBe(false);
    });
  });

  describe('formatReviewRemain', () => {
    it('should format days when more than 2 days', () => {
      const result = formatReviewRemain(3 * 24 * 60); // 3 days in minutes
      expect(result).toBe('Deadline 3 days left');
    });

    it('should format hours when less than 2 days', () => {
      const result = formatReviewRemain(5 * 60); // 5 hours in minutes
      expect(result).toBe('Deadline 5 hours left');
    });

    it('should format minutes when less than 1 hour', () => {
      const result = formatReviewRemain(30); // 30 minutes
      expect(result).toBe('Deadline 30 minutes left');
    });
  });
});
