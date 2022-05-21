import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Project() {
  const { id } = useParams();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return <div>project: {id}</div>;
}
