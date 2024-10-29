import { AdminDepartmentRemoveForeverScreen } from '@/components/screens';

export type AdminDepartmentRemoveForeverPageProps = {
  params: {
    departmentId: string;
  };
};

export default function AdminDepartmentRemoveForeverPage(
  props: AdminDepartmentRemoveForeverPageProps
) {
  const {
    params: { departmentId },
  } = props;

  return <AdminDepartmentRemoveForeverScreen departmentId={departmentId} />;
}
