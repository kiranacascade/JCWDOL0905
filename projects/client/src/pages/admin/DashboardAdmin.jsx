import { useSelector } from 'react-redux'

const DashboardAdmin = () => {
  const { role } = useSelector((state) => state.adminSlice);

  return (
    <div>
      {role === 'SUPER_ADMIN' && <p>Dashboard Super Admin</p>}
      {role === 'BRANCH_ADMIN' && <p>Dashboard Branch Admin</p>}
    </div>
  );
};

export default DashboardAdmin;
