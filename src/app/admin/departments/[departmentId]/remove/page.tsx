import { AdminDepartmentRemoveScreen } from '@/components/screens';

export type AdminDepartmentRemovePageProps = {
  params: {
    departmentId: string;
  };
};

export default function AdminDepartmentRemovePage(
  props: AdminDepartmentRemovePageProps
) {
  const {
    params: { departmentId },
  } = props;

  return <AdminDepartmentRemoveScreen departmentId={departmentId} />;
}
