import ReviewPage from '@/components/product/ReviewPage'
import logger from '@/libs/logger';
import { cookies } from 'next/headers';
import React from 'react'

const Review = () => {
  const cook = cookies();
  const user = cook.get("userEmail");
  logger.info(
    `${user?.value} access the review page`
  );
  return (
    <>
    <ReviewPage />
    </>
  )
}

export default Review