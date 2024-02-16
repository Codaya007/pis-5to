// PaginationControls.js
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LIMIT_PAGINATOR } from '../hooks/Constants';

const PaginationControls = ({ totalCount, searchParams, hasNextPage, hasPrevPage }) => {
  const router = useRouter();

  let page = searchParams['page'] || '1';
  const total = Math.ceil(totalCount / parseInt(LIMIT_PAGINATOR)) == 0 ? '1' : Math.ceil(totalCount / parseInt(LIMIT_PAGINATOR))
  if (page > total) {
    router.push(`/prueba?inicio=${searchParams['inicio']}&fin=${searchParams['fin']}&page=${total}`);
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'row' , gap: '1', alignItems: 'center', marginBottom:'1rem', justifyContent: 'center', width: '100%'}}>
      <button
        className='simple-button'
        style={{ marginRight: '1rem' }} 
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/pronosticos?inicio=${searchParams['inicio']}&fin=${searchParams['fin']}&page=${Number(page) - 1}`);
        }}>
        prev page
      </button>

      <div>
        {/* {page} / {Math.ceil(totalCount / parseInt(LIMIT_PAGINATOR)) == 0 || Math.ceil(totalCount / parseInt(LIMIT_PAGINATOR)).toString() == 'NaN'  ? 1 : Math.ceil(totalCount / parseInt(LIMIT_PAGINATOR))} */}
        {page} / {total}
      </div>

      <button
        className='simple-button'
        style={{ marginLeft: '1rem' }} 
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/pronosticos?inicio=${searchParams['inicio']}&fin=${searchParams['fin']}&page=${Number(page) + 1}`);
        }}>
        next page
      </button>
    </div>
  );
};

export default PaginationControls;
