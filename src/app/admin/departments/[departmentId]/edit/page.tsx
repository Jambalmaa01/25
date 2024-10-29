import { AdminDepartmentEditScreen } from '@/components/screens';

export type AdminDepartmentEditPageProps = {
  params: {
    departmentId: string;
  };
};

export default function AdminDepartmentEditPage(
  props: AdminDepartmentEditPageProps
) {
  const {
    params: { departmentId },
  } = props;

  return <AdminDepartmentEditScreen departmentId={departmentId} />;
}
