import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { IGameSummary, IScoreboardGamesRender } from '../../types/apiNbaTypes';

interface IGameSummaryState {
  gameSummaryData: IGameSummary[];
  isLoading: boolean;
}

const initialState: IGameSummaryState = {
  gameSummaryData: [
    {
      gameId: 0,
      date: '',
      arena: {
        name: '',
        city: '',
        country: '',
        state: '',
      },
      officials: [''],
      scores: [
        {
          team: '',
          linescore: [''],
          final: 0,
        },
      ],
    },
  ],
  isLoading: true,
};

export const gameSummarySlice = createSlice({
  name: 'gameSummary',
  initialState,
  reducers: {
    getSummary(state, action: PayloadAction<IScoreboardGamesRender[][]>) {
      const formatedPayload = action.payload.flat();
      state.gameSummaryData = formatedPayload.map(({ gameId, startTime, summary }) => {
        const { arena, officials, scores } = summary as IGameSummary;
        return {
          gameId,
          date: format(new Date(startTime), 'PPP'),
          arena,
          officials,
          scores,
        };
      });
      state.isLoading = false;
    },
  },
});

export default gameSummarySlice.reducer;
