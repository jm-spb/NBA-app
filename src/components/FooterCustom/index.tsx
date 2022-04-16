import React from 'react';
import { Layout, List, Menu } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import styles from './FooterCustom.module.scss';
import { footerBottomLegalsData, footerTopListData } from '../../content/footerContent';

const { SubMenu } = Menu;

const FooterContent = (): JSX.Element => {
  const { Footer } = Layout;
  const footerTopList = (
    <List
      className={styles.top}
      dataSource={footerTopListData}
      renderItem={({ title, links }) => (
        <div className={styles.listItem}>
          <List.Item className={styles.listItemHeader}>{title}</List.Item>
          {links.map(({ name, path }) => (
            <List.Item key={uuidv4()} className={styles.listItemContent}>
              <a
                className={styles.link}
                href={path}
                target="_blank"
                rel="noopener noreferrer"
              >
                {name}
              </a>
            </List.Item>
          ))}
        </div>
      )}
    />
  );

  const footerTopListResponsive = (
    <Menu mode="inline" theme="dark" className={styles.topResponsive}>
      {footerTopListData.map(({ title, links }) => (
        <SubMenu key={title} title={title}>
          {links.map(({ name, path }) => (
            <Menu.Item key={name}>
              <a
                className={styles.link}
                href={path}
                target="_blank"
                rel="noopener noreferrer"
              >
                {name}
              </a>
            </Menu.Item>
          ))}
        </SubMenu>
      ))}
    </Menu>
  );

  const footerBottomLegals = footerBottomLegalsData.map(({ legalName, legalLink }) => (
    <li key={uuidv4()}>
      <a
        className={styles.bottomLink}
        href={legalLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {legalName}
      </a>
    </li>
  ));

  return (
    <Footer className={styles.footer}>
      <div className={styles.container}>
        {footerTopListResponsive}
        {footerTopList}

        <hr className={styles.divider} />
        <div className={styles.bottom}>
          <h5 className={styles.bottomHeading}>
            &copy; 2022 NBA Media Ventures, LLC. All rights reserved.
          </h5>
          <ul className={styles.bottomLegals}>{footerBottomLegals}</ul>
          <p className={styles.bottomParagraph}>
            If you are having difficulty accessing any content on this website, please
            visit our{' '}
            <a
              className={styles.bottomLink}
              href="https://www.nba.com/accessibility"
              target="_blank"
              rel="noopener noreferrer"
            >
              Accessibility page.
            </a>
          </p>

          <p className={styles.bottomParagraph}>
            NBA.com is part of Warner Media, LLC&apos;s Turner Sports &amp; Entertainment
            Digital Network
          </p>
        </div>
      </div>
    </Footer>
  );
};

export default FooterContent;
