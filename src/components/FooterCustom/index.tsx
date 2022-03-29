import React from 'react';
import { Layout, List } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import './FooterCustom.scss';
import { footerBottomLegalsData, footerTopListData } from '../../content/footerContent';

const FooterContent = (): JSX.Element => {
  const { Footer } = Layout;
  const footerTopList = (
    <List
      className="footer-top"
      dataSource={footerTopListData}
      renderItem={({ title, links }) => (
        <div className="footer-listItem">
          <List.Item className="footer-listItem-header">{title}</List.Item>
          {links.map(({ name, path }) => (
            <List.Item key={uuidv4()} className="footer-listItem-content">
              <a
                className="footer-listItem-link"
                href={path}
                target="_blank"
                rel="noreferrer"
              >
                {name}
              </a>
            </List.Item>
          ))}
        </div>
      )}
    />
  );
  const footerBottomLegals = footerBottomLegalsData.map(({ legalName, legalLink }) => (
    <li key={uuidv4()}>
      <a className="footer-bottom-link" href={legalLink} target="_blank" rel="noreferrer">
        {legalName}
      </a>
    </li>
  ));

  return (
    <Footer className="footer">
      <div className="footer-container">
        {footerTopList}
        <hr className="footer-divider" />
        <div className="footer-bottom">
          <h5 className="footer-bottom-heading">
            &copy; 2022 NBA Media Ventures, LLC. All rights reserved.
          </h5>
          <ul className="footer-bottom-legals">{footerBottomLegals}</ul>
          <p className="footer-bottom-paragraph">
            If you are having difficulty accessing any content on this website, please
            visit our
          </p>
          <a
            className="footer-bottom-link"
            href="https://www.nba.com/accessibility"
            target="_blank"
            rel="noreferrer"
          >
            {' '}
            Accessibility page.
          </a>
          <p className="footer-bottom-paragraph">
            NBA.com is part of Warner Media, LLC&apos;s Turner Sports &amp; Entertainment
            Digital Network
          </p>
        </div>
      </div>
    </Footer>
  );
};

export default FooterContent;
