import React from 'react';
import { Table } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import styles from './StatsTable.module.scss';
import { IStatsTableProps } from '../../../types/stats';
import { statsTableColumns } from '../../../content/statsContent';

const StatsTable = ({ dataSource, isFetching }: IStatsTableProps): JSX.Element => (
  <Table
    className={styles.table}
    rowClassName={styles.row}
    rowKey={() => uuidv4()}
    dataSource={dataSource}
    columns={statsTableColumns}
    pagination={false}
    scroll={{ x: 1400 }}
    loading={isFetching}
  />
);

export default StatsTable;
