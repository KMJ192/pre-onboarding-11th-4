import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import URL from '../../RootRouter/url';

function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(URL.search);
  }, []);

  return <div>Loading...</div>;
}

export default Index;
