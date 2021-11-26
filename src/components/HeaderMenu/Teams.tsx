import React from 'react';

import { Menu } from 'antd';

import Division from './Division';

const Teams: React.FC = () => {
  const { SubMenu } = Menu;

  const divNames = [
    'ATLANTIC',
    'CENTRAL',
    'SOUTHEAST',
    'NORTHWEST',
    'PACIFIC',
    'SOUTHWEST'
  ];

  return (
    <SubMenu popupClassName="popup" key="SubMenu" title="Teams">
      {divNames.map((el, idx) => <Division key={idx + 10} divName={el} />)}
    </SubMenu>
  );
};

export default React.memo(Teams);
