import React from 'react';
import { Select } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import styles from './StandingsPicker.module.scss';
import { IStandingsPickerProps } from '../../types/standingsTypes';

const { Option } = Select;

const StandingsPicker = ({
  seasons,
  onSeasonChange,
  onGroupChange,
}: IStandingsPickerProps): JSX.Element => {
  console.log('Standings Picker');

  const seasonPicker = seasons.map((season) => (
    <Option key={uuidv4()} value={season}>
      {season}
    </Option>
  ));

  const groupByPicker = ['Conference', 'Division'].map((group) => (
    <Option key={uuidv4()} value={group}>
      {group}
    </Option>
  ));

  const handleSeasonChange = (key: string) => {
    onSeasonChange(key.slice(0, 4));
  };

  const handleGroupChange = (key: string) => {
    const keyTyped = key.toLowerCase() as 'conference' | 'division';
    onGroupChange(keyTyped);
  };

  return (
    <div className={styles.picker}>
      <div>
        <h5 className={styles.heading}>SEASON</h5>
        <Select
          className={styles.selector}
          defaultValue={seasons[0]}
          onChange={handleSeasonChange}
        >
          {seasonPicker}
        </Select>
      </div>
      <div>
        <h5 className={styles.heading}>GROUP BY</h5>
        <Select
          className={styles.selector}
          defaultValue="Conference"
          onChange={handleGroupChange}
        >
          {groupByPicker}
        </Select>
      </div>
    </div>
  );
};

export default React.memo(StandingsPicker);
