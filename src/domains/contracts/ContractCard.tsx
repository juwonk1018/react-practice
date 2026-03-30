import { useMemo, useCallback } from 'react';
import { ContractWithCompanyInfo } from '../../types/contract';
import { buildStatusTags } from './tagBuilder';
import { useContractTimer } from './hooks';
import { ContractCardPresenter } from './ContractCardPresenter';
import * as contractUtils from './utils';

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
  // Hooks
  const { reviewRemain } = useContractTimer(contract);

  // Get grouped contract information
  const state = contractUtils.getContractState(contract);
  const delivery = contractUtils.getDeliveryInfo(contract);
  const payment = contractUtils.getPaymentInfo(contract);

  // Additional computed values
  const isStoreVisitReady = contractUtils.isStoreVisitReady(contract);
  const showPointWithdrawalButton = contractUtils.shouldShowPointWithdrawalButton(contract);
  const showTags = contractUtils.shouldShowTags(contract);
  const showDate = contractUtils.getDisplayDate(contract);
  const revisitInfo = useMemo(() => contractUtils.getRevisitBadgeInfo(contract), [contract]);
  const statusTags = useMemo(() => buildStatusTags(contract, reviewRemain), [contract, reviewRemain]);
  const firstcomeProductText = useMemo(
    () => contractUtils.getFirstcomeProductText(contract, delivery.isModificationRequested),
    [contract, delivery.isModificationRequested]
  );

  // Event handlers
  const company = contract.ad;

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
      isCancelled={state.isCancelled}
      hasPayment={payment.hasPayment}
      isPR={delivery.isPR}
      showTags={showTags}
      showRevisitBadge={revisitInfo.shouldShow}
      revisitRemain={revisitInfo.daysRemaining}
      isStoreVisitReady={isStoreVisitReady}
      showPointWithdrawalButton={showPointWithdrawalButton}
      requested={delivery.isModificationRequested}
      statusTags={statusTags}
      firstcomeProductText={firstcomeProductText}
      onCardClick={handleClick}
      onStoreVisitClick={handleStoreVisitClick}
      onPointWithdrawalClick={handlePointWithdrawalClick}
    />
  );
};
