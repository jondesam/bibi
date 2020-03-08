import React, { Fragment, useEffect, useState } from 'react';
import { getPosts } from '../../actions/post';

export const Pagination = () => {
  let [page, setPage] = useState(1);

  useEffect(() => {
    getPosts(page, 5);
  }, [page]);

  const clickAction = value => {
    if (value === 'pre') {
      setPage(page - 1);
    } else if (value === 'next') {
      setPage(page + 1);
    }
  };
};

