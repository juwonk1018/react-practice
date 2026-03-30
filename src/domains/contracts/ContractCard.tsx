import { useMemo, useCallback } from 'react';
import {
  ContractWithCompanyInfo,
  CONTRACT_STATE,
  CONTRACT_STATE_TEXT,
  DELIVERY_STATUS,
  isAccountRequired,
  isContractActive,
} from '../../types/contract';
import { addDate, diffDate } from '../../utils';
import { buildStatusTags } from './tagBuilder';
import { useContractTimer } from './hooks/useContractTimer';
import { ContractCardPresenter } from './ContractCardPresenter';

interface ContractCardProps {
  contract: ContractWithCompanyInfo;
  onNavigate?: (routeName: string, params: any) => void;
  userLevel?: 'normal' | 'vip' | 'vvip';
}

export const ContractCard = ({
  contract,
  onNavigate,
  userLevel = 'normal',
}: ContractCardProps) => {
  // Timer hook
  const { minutesDiff, reviewRemain } = useContractTimer(contract);

  // Basic computed values
  const company = contract.ad;
  const mainDate = contract.selectedAt || contract.date0;

  // Memoized computed values
  const requested = useMemo(() => {
    return (
      contract.deliveryHistory &&
      contract.deliveryHistory.length > 0 &&
      contract.deliveryHistory[contract.deliveryHistory.length - 1].state ===
        DELIVERY_STATUS.INFORMATION_MODIFY_REQUEST
    );
  }, [contract.deliveryHistory]);

  const isStoreVisitReady = useMemo(() => {
    return company.category.firstName === 'Store' && contract.currentState === CONTRACT_STATE.SELECTION_COMPLETED;
  }, [company.category.firstName, contract.currentState]);

  const showPointWithdrawalButton = useMemo(() => {
    return company.type === 'A' && isAccountRequired(contract);
  }, [company.type, contract]);

  const showDate = useMemo(() => {
    return contract.currentState === CONTRACT_STATE.WAITING_FOR_SELECTION ||
      contract.currentState === CONTRACT_STATE.NOT_SELECTED
      ? contract.appliedAt || contract.date0
      : mainDate;
  }, [contract.currentState, contract.appliedAt, contract.date0, mainDate]);

  const isCancelled = useMemo(() => {
    return contract.currentState === CONTRACT_STATE.CANCELLED;
  }, [contract.currentState]);

  const hasPayment = useMemo(() => {
    return !!contract.payment || !!contract.discount;
  }, [contract.payment, contract.discount]);

  const isPR = useMemo(() => {
    return contract.deliveryMethod === 'PR';
  }, [contract.deliveryMethod]);

  const showTags = useMemo(() => {
    return contract.currentState !== CONTRACT_STATE.WAITING_FOR_SELECTION;
  }, [contract.currentState]);

  const revisitRemain = useMemo(() => {
    return diffDate(addDate(mainDate, company.revisitPeriod), new Date());
  }, [mainDate, company.revisitPeriod]);

  const showRevisitBadge = useMemo(() => {
    return (
      isContractActive(contract.currentState) &&
      company.available === 0 &&
      revisitRemain > 0 &&
      company.type === 'S'
    );
  }, [contract.currentState, company.available, company.type, revisitRemain]);

  // Status tags logic
  const statusTags = useMemo(() => {
    return buildStatusTags(contract, reviewRemain);
  }, [contract, reviewRemain]);

  const firstcomeProductText = useMemo(() => {
    if (requested) return 'Modify product info';
    if (
      contract.currentState === CONTRACT_STATE.PURCHASE_COMPLETED &&
      contract.payPrice !== undefined &&
      contract.payPrice > 0
    ) {
      return 'Purchase Complete';
    }
    return CONTRACT_STATE_TEXT[contract.currentState];
  }, [requested, contract.currentState, contract.payPrice]);

  // Event handlers
  const handleClick = useCallback(() => {
    if (onNavigate) {
      onNavigate('UsedDetail', {
        companyId: company.adId,
        contractId: contract.id,
      });
    }
  }, [onNavigate, company.adId, contract.id]);

  const handleStoreVisitClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onNavigate?.('PremiumInsertCode', { company, contract });
    },
    [onNavigate, company, contract]
  );

  const handlePointWithdrawalClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onNavigate?.('PremiumWithDrawal', { company, contract });
    },
    [onNavigate, company, contract]
  );

  return (
    <ContractCardPresenter
      contract={contract}
      userLevel={userLevel}
      showDate={showDate}
      isCancelled={isCancelled}
      hasPayment={hasPayment}
      isPR={isPR}
      showTags={showTags}
      showRevisitBadge={showRevisitBadge}
      revisitRemain={revisitRemain}
      isStoreVisitReady={isStoreVisitReady}
      showPointWithdrawalButton={showPointWithdrawalButton}
      requested={!!requested}
      statusTags={statusTags}
      firstcomeProductText={firstcomeProductText}
      onCardClick={handleClick}
      onStoreVisitClick={handleStoreVisitClick}
      onPointWithdrawalClick={handlePointWithdrawalClick}
    />
  );
};
