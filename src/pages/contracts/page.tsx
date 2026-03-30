import { useState } from 'react';
import { ContractCard } from '@/domains/contracts/ContractCard';
import { ContractWithCompanyInfo, CONTRACT_STATE } from '@/types/contract';

// Sample data
const sampleContracts: ContractWithCompanyInfo[] = [
  {
    id: '1',
    currentState: CONTRACT_STATE.SELECTION_COMPLETED,
    date0: '2024-01-15T10:00:00Z',
    createdAt: '2024-01-10T10:00:00Z',
    selectedAt: '2024-01-15T10:00:00Z',
    first: 'Product',
    deliveryMethod: 'PR',
    rewardStatus: null,
    payment: 50000,
    review: 'Great product!',
    ad: {
      adId: '1',
      name: 'Premium Wireless Headphones',
      thumbnail:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      category: {
        firstName: 'Product',
      },
      type: 'A',
      available: 5,
      revisitPeriod: 30,
      normalPoint: 10000,
      vipPoint: 15000,
      vvipPoint: 20000,
    },
  },
  {
    id: '2',
    currentState: CONTRACT_STATE.PURCHASE_COMPLETED,
    date0: '2024-02-01T10:00:00Z',
    createdAt: '2024-01-25T10:00:00Z',
    selectedAt: '2024-02-01T10:00:00Z',
    first: 'Product',
    deliveryMethod: 'DIRECT',
    rewardStatus: null,
    discount: 30000,
    ad: {
      adId: '2',
      name: 'Smart Watch Series X',
      thumbnail:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      category: {
        firstName: 'Product',
      },
      type: 'S',
      available: 0,
      revisitPeriod: 60,
    },
  },
  {
    id: '3',
    currentState: CONTRACT_STATE.REVIEW_COMPLETED,
    date0: '2024-03-10T10:00:00Z',
    createdAt: '2024-03-05T10:00:00Z',
    appliedAt: '2024-03-05T10:00:00Z',
    selectedAt: '2024-03-10T10:00:00Z',
    first: 'Store',
    rewardStatus: null,
    payment: 100000,
    review: 'Excellent service!',
    ad: {
      adId: '3',
      name: 'Fine Dining Restaurant',
      thumbnail:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=400&fit=crop',
      category: {
        firstName: 'Store',
      },
      type: 'A',
      available: 10,
      revisitPeriod: 90,
      normalPoint: 20000,
      vipPoint: 30000,
      vvipPoint: 40000,
    },
  },
  {
    id: '4',
    currentState: CONTRACT_STATE.WAITING_FOR_SELECTION,
    date0: '2024-03-20T10:00:00Z',
    createdAt: '2024-03-20T10:00:00Z',
    appliedAt: '2024-03-20T10:00:00Z',
    first: 'Product',
    rewardStatus: null,
    ad: {
      adId: '4',
      name: 'Professional Camera Kit',
      thumbnail:
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
      category: {
        firstName: 'Product',
      },
      type: 'A',
      available: 3,
      revisitPeriod: 30,
      normalPoint: 50000,
      vipPoint: 70000,
      vvipPoint: 90000,
    },
  },
  {
    id: '5',
    currentState: CONTRACT_STATE.NOT_SELECTED,
    date0: '2024-02-15T10:00:00Z',
    createdAt: '2024-02-10T10:00:00Z',
    appliedAt: '2024-02-10T10:00:00Z',
    first: 'Product',
    rewardStatus: null,
    ad: {
      adId: '5',
      name: 'Gaming Laptop Pro',
      thumbnail:
        'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop',
      category: {
        firstName: 'Product',
      },
      type: 'A',
      available: 2,
      revisitPeriod: 30,
      normalPoint: 80000,
      vipPoint: 100000,
      vvipPoint: 120000,
    },
  },
  {
    id: '6',
    currentState: CONTRACT_STATE.CANCELLED,
    date0: '2024-01-20T10:00:00Z',
    createdAt: '2024-01-15T10:00:00Z',
    selectedAt: '2024-01-20T10:00:00Z',
    first: 'Product',
    deliveryMethod: 'PR',
    rewardStatus: null,
    payment: 25000,
    ad: {
      adId: '6',
      name: 'Bluetooth Speaker',
      thumbnail:
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
      category: {
        firstName: 'Product',
      },
      type: 'S',
      available: 8,
      revisitPeriod: 30,
    },
  },
];

const ContractsPage = () => {
  const [filterStatus, setFilterStatus] = useState<number | 'all'>('all');
  const [userLevel] = useState<'normal' | 'vip' | 'vvip'>('normal');

  const filteredContracts = sampleContracts.filter((contract) => {
    if (filterStatus === 'all') return true;
    return contract.currentState === filterStatus;
  });

  const getContractCountByState = (state: number) => {
    return sampleContracts.filter((contract) => contract.currentState === state)
      .length;
  };

  const handleNavigate = (routeName: string, params: any) => {
    console.log('Navigate to:', routeName, params);
    // Implement navigation logic here
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 py-6'>
        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            My Contracts
          </h1>
          <p className='text-gray-600'>
            Manage and track all your contract activities
          </p>
        </div>

        {/* Filter Tabs */}
        <div className='mb-6 bg-white rounded-lg shadow-sm p-2'>
          <div className='flex flex-wrap gap-2'>
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({sampleContracts.length})
            </button>
            <button
              onClick={() =>
                setFilterStatus(CONTRACT_STATE.WAITING_FOR_SELECTION)
              }
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === CONTRACT_STATE.WAITING_FOR_SELECTION
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Waiting (
              {getContractCountByState(CONTRACT_STATE.WAITING_FOR_SELECTION)})
            </button>
            <button
              onClick={() =>
                setFilterStatus(CONTRACT_STATE.SELECTION_COMPLETED)
              }
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === CONTRACT_STATE.SELECTION_COMPLETED
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Selected (
              {getContractCountByState(CONTRACT_STATE.SELECTION_COMPLETED)})
            </button>
            <button
              onClick={() => setFilterStatus(CONTRACT_STATE.PURCHASE_COMPLETED)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === CONTRACT_STATE.PURCHASE_COMPLETED
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Purchased (
              {getContractCountByState(CONTRACT_STATE.PURCHASE_COMPLETED)})
            </button>
            <button
              onClick={() => setFilterStatus(CONTRACT_STATE.REVIEW_COMPLETED)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === CONTRACT_STATE.REVIEW_COMPLETED
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Reviewed (
              {getContractCountByState(CONTRACT_STATE.REVIEW_COMPLETED)})
            </button>
            <button
              onClick={() => setFilterStatus(CONTRACT_STATE.NOT_SELECTED)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === CONTRACT_STATE.NOT_SELECTED
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Not Selected (
              {getContractCountByState(CONTRACT_STATE.NOT_SELECTED)})
            </button>
            <button
              onClick={() => setFilterStatus(CONTRACT_STATE.CANCELLED)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === CONTRACT_STATE.CANCELLED
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancelled ({getContractCountByState(CONTRACT_STATE.CANCELLED)})
            </button>
          </div>
        </div>

        {/* Contract List */}
        <div className='space-y-4'>
          {filteredContracts.length > 0 ? (
            filteredContracts.map((contract) => (
              <ContractCard
                key={contract.id}
                contract={contract}
                onNavigate={handleNavigate}
                userLevel={userLevel}
              />
            ))
          ) : (
            <div className='bg-white rounded-lg shadow-sm p-12 text-center'>
              <div className='text-gray-400 mb-4'>
                <svg
                  className='w-16 h-16 mx-auto'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                  />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                No contracts found
              </h3>
              <p className='text-gray-500'>
                There are no contracts matching your current filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractsPage;
