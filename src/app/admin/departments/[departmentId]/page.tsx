import { AdminDepartmentScreen } from '@/components/screens';

export type AdminDepartmentPageProps = {
  params: {
    departmentId: string;
  };
};

export default function AdminDepartmentPage(props: AdminDepartmentPageProps) {
  const {
    params: { departmentId },
  } = props;

  return <AdminDepartmentScreen departmentId={departmentId} />;
}
