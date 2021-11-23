import React from 'react';
import axios, { AxiosRequestConfig } from 'axios';

import './HeaderMenu.scss';

import { Menu } from 'antd';

const HeaderMenu: React.FC = () => {
  const [ teams, setTeams ] = React.useState([]);

  const options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/teams/league/standard',
    headers: {
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
      'x-rapidapi-key': 'd59d890bb4msh09261ae80b810e3p1b967bjsnd02ed00fd3fd'
    }
  };

  const fetchTeams = async () => {
    const response = await axios.request(options);
    const data = await response.data.api.teams;
    return data.filter((el: any) => el.logo && el.leagues.standard.divName);
  };

  React.useEffect(() => {
    fetchTeams().then((res) => setTeams(res));
  }, []);

  const { SubMenu } = Menu;

  console.log(teams);

  // axios
  //   .request(options)
  //   .then(function(response) {
  //     return response.data;
  //   })
  //   .catch(function(error) {
  //     console.error(error);
  //   });

  return (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item>Games</Menu.Item>
      <Menu.Item>Stats</Menu.Item>
      <Menu.Item>Standings</Menu.Item>
      <SubMenu popupClassName="popup" key="SubMenu" title="Teams">
        <Menu.ItemGroup title="Item 1">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Item 2">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Item 3">
          <Menu.Item key="setting:5">Option 5</Menu.Item>
          <Menu.Item key="setting:6">Option 6</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Item 4">
          <Menu.Item key="setting:7">Option 7</Menu.Item>
          <Menu.Item key="setting:8">Option 8</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Item 5">
          <Menu.Item key="setting:9">Option 9</Menu.Item>
          <Menu.Item key="setting:10">Option 10</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Item 6">
          <Menu.Item key="setting:11">Option 11</Menu.Item>
          <Menu.Item key="setting:12">Option 12</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
    </Menu>
  );
};

export default HeaderMenu;
