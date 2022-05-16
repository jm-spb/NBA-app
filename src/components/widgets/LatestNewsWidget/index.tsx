import React from 'react';
import { Card, Tabs } from 'antd';

import styles from './LatestNewsWidget.module.scss';
import { apiLatestNews } from '../../../services/apiLatestNews';
import sources from '../../../content/latestNewsContent';
import { IFetchLatestNews } from '../../../types/apiLatestNews';
import Spinner from '../../Spinner';
import ErrorMsg from '../../ErrorMsg';

const { Meta } = Card;
const { TabPane } = Tabs;

const LatestNews = (): JSX.Element => {
  const [newsSource, setNewsSource] = React.useState('espn');
  const { data, error, isLoading, isFetching } =
    apiLatestNews.useFetchLatestNewsQuery(newsSource);

  if (isLoading) return <Spinner loadingData="Latest news" />;
  if (error)
    return (
      <ErrorMsg error={error} failedData="Latest News" notAvaliableService="Api NBA" />
    );

  const fetchedNews = data as IFetchLatestNews[];
  const changeSource = (key: string) => {
    setNewsSource(key);
  };

  const cards = fetchedNews.map(({ source, title, url }) => (
    <Card key={title} loading={isFetching} className={styles.card}>
      <Meta
        className={styles.meta}
        title={title}
        description={
          <a href={url} target="_blank" rel="noopener noreferrer">
            {`Read More on ${source}.com`}
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
    <section className={styles.container}>
      <div className={styles.title}>
        <h1 className={styles.heading}>LATEST NEWS</h1>
      </div>
      {renderedNews}
    </section>
  );
};

export default LatestNews;
