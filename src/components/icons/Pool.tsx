import React from 'react';
import { SvgIcon, SvgIconProps } from '@material-ui/core';
import styled from 'styled-components';
import { ReactComponent as PoolIcon } from './images/pool.svg';
const StyledHomeIcon = styled(PoolIcon)`
circle {
    stroke: ${({ theme }) =>
      theme.palette.type === 'dark' ? 'white' : '#757575'};
    stroke-width: 1;
    fill="none"
  }
  
`;
export default function Pool(props: SvgIconProps) {
  return <SvgIcon component={StyledHomeIcon}  viewBox="0 0 32 33" {...props} />;
}
