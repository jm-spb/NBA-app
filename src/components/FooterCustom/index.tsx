import React from 'react';
import { Layout, List, Menu } from 'antd';
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
        <li className={styles.listItem}>
          <span className={styles.listItemHeader}>{title}</span>
          {links.map(({ name, path }) => (
            <span key={name} className={styles.listItemContent}>
              <a
                className={styles.link}
                href={path}
                target="_blank"
                rel="noopener noreferrer"
              >
                {name}
              </a>
            </span>
          ))}
        </li>
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
    <li key={legalName}>
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
          <h1 className={styles.bottomHeading}>
            &copy; 2022 NBA Media Ventures, LLC. All rights reserved.
          </h1>
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
