import { Button, Icon } from 'components/atoms';
import { FaTrash } from 'react-icons/fa';

export const DeleteAction = () => {
  return (
    <Button
      size="small"
      color="secondary"
    >
      <Icon
        icon={FaTrash}
        size="0.75"
      />
    </Button>
  );
};
