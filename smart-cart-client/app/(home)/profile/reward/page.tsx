import RewardPage from '@/components/profile/RewardPage'
import logger from '@/libs/logger';
import { cookies } from 'next/headers';
import React from 'react'

const Reward = () => {
  const cook = cookies();
  const user = cook.get("userEmail");
  logger.info(`${user?.value} access the Reward Page`);
  return (
    <>
    <RewardPage />
    </>
  )
}

export default Reward