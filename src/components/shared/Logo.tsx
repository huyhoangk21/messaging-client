import React from 'react';
import ForumSharpIcon from '@mui/icons-material/ForumSharp';

const Logo = () => {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <linearGradient id='linearColors' x1={0} y1={1} x2={1} y2={1}>
          <stop offset={0} stopColor='rgba(241,200,132,1)' />
          <stop offset={0.5} stopColor='rgba(244,177,75,1)' />
          <stop offset={1} stopColor='rgba(214,142,22,1)' />
        </linearGradient>
      </svg>
      <ForumSharpIcon
        sx={{
          fontSize: 100,
          fill: 'url(#linearColors)',
        }}
      />
    </React.Fragment>
  );
};

export default Logo;
