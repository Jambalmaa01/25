import { Checkbox, Radio } from '@mui/material';

export type SourceSelectCheckboxProps = {
  id: string;
  selectedIds: string[];
  setSelectedIds(ids: string[]): void;
  selectMultiple?: boolean;
};

export function SourceSelectCheckbox(props: SourceSelectCheckboxProps) {
  const { id, selectedIds, setSelectedIds, selectMultiple } = props;

  function onLocalSelect() {
    if (!selectMultiple) {
      setSelectedIds([id]);

      return;
    }

    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(idx => idx !== id));

      return;
    }

    setSelectedIds([...selectedIds, id]);
  }

  if (!selectMultiple) {
    return (
      <Radio checked={selectedIds.includes(id)} onChange={onLocalSelect} />
    );
  }

  return (
    <Checkbox checked={selectedIds.includes(id)} onChange={onLocalSelect} />
  );
}
