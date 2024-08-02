import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';

const withAdminAuth = (WrappedComponent: React.FC) => {
  const AdminComponent: React.FC = (props) => {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && (!user || user.role !== 'admin')) {
        router.push('/login');
      }
    }, [user, isLoading, router]);

    if (isLoading || !user || user.role !== 'admin') {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return AdminComponent;
};

export default withAdminAuth;
