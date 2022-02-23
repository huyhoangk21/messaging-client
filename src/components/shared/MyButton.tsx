import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SxProps, Theme } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';

type MyButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  sxProps?: SxProps<Theme>;
  isSubmitting?: boolean;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  name?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const MyButton = ({
  sxProps,
  isSubmitting,
  endIcon,
  startIcon,
  name,
  type,
  onButtonClick,
}: MyButtonProps) => {
  return (
    <Button
      variant='contained'
      endIcon={!isSubmitting && endIcon}
      startIcon={!isSubmitting && startIcon}
      disabled={isSubmitting}
      type={type}
      onClick={onButtonClick}
      sx={{
        fontSize: '0.75em',
        borderRadius: '5px',
        width: '110px',
        height: '35px',
        ...sxProps,
      }}
    >
      {isSubmitting ? (
        <FontAwesomeIcon icon={faCircleNotch} spin color='white' />
      ) : (
        name
      )}
    </Button>
  );
};

export default MyButton;
