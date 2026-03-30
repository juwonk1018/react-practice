import { ContractWithCompanyInfo, CONTRACT_STATE_TEXT, CONTRACT_IMAGE_BADGE_STATE } from '../../types/contract';
import { formatDate, toLocaleString } from '../../utils';

interface StatusTag {
  title: string;
  color: string;
  key: string;
}

interface ContractCardPresenterProps {
  // Data props
  contract: ContractWithCompanyInfo;
  userLevel: 'normal' | 'vip' | 'vvip';

  // Computed props
  showDate: string;
  isCancelled: boolean;
  hasPayment: boolean;
  isPR: boolean;
  showTags: boolean;
  showRevisitBadge: boolean;
  revisitRemain: number;
  isStoreVisitReady: boolean;
  showPointWithdrawalButton: boolean;
  requested: boolean;

  // Status data
  statusTags: StatusTag[];
  firstcomeProductText: string;

  // Event handlers
  onCardClick: () => void;
  onStoreVisitClick: (e: React.MouseEvent) => void;
  onPointWithdrawalClick: (e: React.MouseEvent) => void;
}

export const ContractCardPresenter = ({
  contract,
  userLevel,
  showDate,
  isCancelled,
  hasPayment,
  isPR,
  showTags,
  showRevisitBadge,
  revisitRemain,
  isStoreVisitReady,
  showPointWithdrawalButton,
  requested,
  statusTags,
  firstcomeProductText,
  onCardClick,
  onStoreVisitClick,
  onPointWithdrawalClick,
}: ContractCardPresenterProps) => {
  const company = contract.ad;

  return (
    <div
      onClick={onCardClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border border-gray-200 cursor-pointer"
    >
      {/* Date Header */}
      <div className="text-sm text-gray-500 mb-3">{formatDate(showDate)}</div>

      <div className="flex gap-4">
        {/* Thumbnail with Badges */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <img src={company.thumbnail} alt={company.name} className="w-full h-full object-cover rounded-lg" />

          {showRevisitBadge && (
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                Revisit D-{revisitRemain}
              </span>
            </div>
          )}

          {CONTRACT_IMAGE_BADGE_STATE.includes(contract.currentState as 7 | 3) && (
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                {CONTRACT_STATE_TEXT[contract.currentState]}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Category Info */}
          <div className="text-xs text-gray-500 mb-1">
            {company.category.firstName}
            {(company.category.firstName === 'Product' || company.type === 'A') && ' | '}
            {company.category.firstName === 'Product' && company.type === 'S' && (
              <span className={requested ? 'font-semibold text-blue-600' : ''}>
                {firstcomeProductText}
              </span>
            )}
            {company.type === 'A' && <span>{CONTRACT_STATE_TEXT[contract.currentState]}</span>}
          </div>

          {/* Company Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{company.name}</h3>

          {/* Points */}
          {!!company[(userLevel + 'Point') as keyof typeof company] && company.type === 'A' && (
            <div className="flex items-center text-sm mb-1">
              <span className="text-gray-600 mr-2">Points:</span>
              <span>
                {toLocaleString((company[(userLevel + 'Point') as keyof typeof company] as number) || 0)}P
              </span>
            </div>
          )}

          {/* Payment/Benefits */}
          {hasPayment && (
            <div className="flex items-center text-sm mb-2">
              <span className="text-gray-600 mr-2">{isPR ? 'Refund:' : 'Benefit:'}</span>
              <span className={isCancelled ? 'line-through' : ''}>
                {toLocaleString(isPR ? (contract.payment || 0) : (contract.discount || 0))}
                {isPR ? 'P' : ' KRW'}
              </span>
            </div>
          )}

          {/* Status Tags */}
          {showTags && (
            <div className="flex flex-wrap gap-1 mt-2">
              {statusTags.map((tag) => (
                <span key={tag.key} className={`text-xs px-2 py-1 rounded-full ${tag.color}`}>
                  {tag.title}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {isStoreVisitReady && (
        <button
          onClick={onStoreVisitClick}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Complete Visit
        </button>
      )}

      {showPointWithdrawalButton && (
        <button
          onClick={onPointWithdrawalClick}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Apply for Point Settlement
        </button>
      )}
    </div>
  );
};
