import { getYear } from 'date-fns';
import {
  ICreateTableDataSource,
  IGetTeamPickerContent,
  IPlayersStatsTableDataSource,
} from '../types/stats';

export const getAvaliableStatsSeasons = (): number[] => {
  const currentSeason = getYear(new Date()) - 1;
  const seasons = new Array(currentSeason - 1948)
    .fill(null)
    .map((_, idx) => currentSeason - idx);
  return seasons;
};

export const createTableDataSource: ICreateTableDataSource<
  IPlayersStatsTableDataSource
> = (playersStatsData, playersNamesData) =>
  playersStatsData.map(({ player_id, ...rest }) => {
    const findFullNameById = playersNamesData.find(({ id }) => id === player_id);
    return {
      full_name: findFullNameById?.full_name as string,
      ...rest,
    };
  });

export const getTeamPickerContent: IGetTeamPickerContent = (content) =>
  content
    .map((division) => [...division.teams])
    .flat()
    .sort((a, b) => (a.teamName > b.teamName ? 1 : -1));
