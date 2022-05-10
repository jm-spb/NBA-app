import React from 'react';
import { Card, Tabs } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import styles from './LatestNewsWidget.module.scss';
import { apiLatestNews } from '../../../services/apiLatestNews';
import sources from '../../../content/latestNewsContent';
import { IFetchLatestNews } from '../../../types/apiLatestNews';
import Spinner from '../../Spinner';
import ErrorMsg from '../../ErrorMsg';

const { Meta } = Card;
const { TabPane } = Tabs;

const LatestNews = (): JSX.Element => {
  const [source, setSource] = React.useState('espn');
  const { data, error, isLoading, isFetching } =
    apiLatestNews.useFetchLatestNewsQuery(source);

  if (error) {
    if ('message' in error) {
      return (
        <ErrorMsg
          failedData="Latest News"
          notAvaliableService="API Nba News"
          details={error.message as string}
        />
      );
    }

    if ('error' in error) {
      return (
        <ErrorMsg
          failedData="Teams Standings"
          notAvaliableService="Api NBA"
          details={error.error}
        />
      );
    }
  }

  if (isLoading) return <Spinner />;

  const fetchedNews = data as IFetchLatestNews[];

  const changeSource = (key: string) => {
    setSource(key);
  };

  const cards = fetchedNews.map(({ title, url }) => (
    <Card key={uuidv4()} loading={isFetching} className={styles.card}>
      <Meta
        className={styles.meta}
        title={title}
        description={
          <a href={url} target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        }
      />
    </Card>
  ));

  const renderedNews = (
    <Tabs onChange={changeSource} className={styles.news}>
      {sources.map(({ name, query }) => (
        <TabPane tab={name} key={query}>
          {cards}
        </TabPane>
      ))}
    </Tabs>
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2 className={styles.heading}>LATEST NEWS</h2>
      </div>
      {renderedNews}
    </div>
  );
};

export default LatestNews;
