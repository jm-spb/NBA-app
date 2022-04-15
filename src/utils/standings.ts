import { getYear, isAfter, isBefore } from 'date-fns';
import { IFilterTeamsByGroup, IFormatSeasons } from '../types/standingsTypes';

export const getSeasons = (): number[] => {
  const currentDate = new Date();
  const currentYear = getYear(currentDate);
  let currentSeason = currentYear;
  const isAfterJanuaryFirst = isAfter(currentDate, new Date(currentYear, 0, 1));
  const isBeforeJulyFirst = isBefore(currentDate, new Date(currentYear, 6, 1));

  // NBA season starts in early October, end in the last days of June. If current date is after January 1st and before July 1st then current season starts in previos year
  if (isAfterJanuaryFirst && isBeforeJulyFirst) {
    currentSeason--;
  }

  const avaliableSeasons = new Array(5).fill(null).map((_, idx) => currentSeason - idx);

  return avaliableSeasons;
};

export const formatSeasons: IFormatSeasons = (avaliableSeasons) =>
  avaliableSeasons.map((year) => {
    const nextYear = (year + 1).toString().slice(2);
    return `${year}-${nextYear}`;
  });

export const filterTeamsByGroup: IFilterTeamsByGroup = (
  teamsStandings,
  groupData,
  groupName,
) => {
  const filterSort = (confName: string) =>
    teamsStandings
      .filter((team) => confName === team[groupName].name)
      .sort((a, b) => a[groupName].rank - b[groupName].rank);

  if (typeof groupData === 'object') return groupData.map(filterSort);

  return filterSort(groupData);
};
