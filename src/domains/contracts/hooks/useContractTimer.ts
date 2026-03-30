import { useState, useEffect } from 'react';
import { ContractWithCompanyInfo } from '../../../types/contract';
import { calcRemain, CONTRACT_TIME_CONSTANTS } from '../utils';

const { MINUTES_PER_DAY } = CONTRACT_TIME_CONSTANTS;
const DEFAULT_DEADLINE_DAYS = 7;
const UPDATE_INTERVAL_MS = 10000;

interface UseContractTimerReturn {
  minutesDiff: number;
  reviewRemain: number;
}

/**
 * Custom hook for managing contract timer
 * - Calculates elapsed time since contract main date
 * - Auto-updates every 10 seconds
 * - Calculates review deadline remaining time
 */
export function useContractTimer(contract: ContractWithCompanyInfo): UseContractTimerReturn {
  const [minutesDiff, setMinutesDiff] = useState<number>(calcRemain(contract));

  const deadline = contract.deadline ?? DEFAULT_DEADLINE_DAYS;
  const reviewRemain = deadline * MINUTES_PER_DAY - minutesDiff;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMinutesDiff(calcRemain(contract));
    }, UPDATE_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [contract]);

  return {
    minutesDiff,
    reviewRemain,
  };
}
