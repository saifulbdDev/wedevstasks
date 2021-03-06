/* eslint-disable no-mixed-operators */
import React from "react";

import { connect } from "react-redux";
import { fetchData } from "../../store/actions/actions";
import { Column } from "../../components/Column/template";
import { Addlist } from "../../components/Addlist/template";

export interface IAppState {
  boardStore: any;
}

interface IBoardProps {
  removeCardFromColumn: (cardId: number, sourceCategory: string) => void;
  moveCard: (
    cardId: string,
    sourceCategory: string,
    destinationCategory: string
  ) => void;

  updateCard: (card: any, destinationCategory: string) => void;
  fetchData: () => void;
  updateColumn: (upColumn: string, oldColumn: string) => void;
  createColumn?: (newColumn: string) => void;
  dateleColumn: (catId: string) => void;
  createCard?: (card: any, destinationCategory: string) => void;
  draggableCard: (cardId: number, sourceCategory: string) => void;
  boardStore: any;
}

interface IBoardState {
  boardStore: any;
}

export const Board: React.FC<IBoardProps & IBoardState> = (
  props: IBoardProps
) => {
  const [, setState] = React.useState<IBoardState>(props);
  const { boardStore, fetchData } = props;

  React.useEffect(() => {
    setState({
      boardStore: [],
    });
  }, [boardStore]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const boardStoreList = (props.boardStore && props.boardStore) || [];

  const columns = boardStoreList.map((category: any, key: number) => {
    return (
      <Column
        key={category.id}
        catkey={key}
        category={category}
        removeCardFromColumn={props.removeCardFromColumn}
        moveCard={props.moveCard}
        createCard={props.createCard}
        updateCard={props.updateCard}
        draggableCard={props.draggableCard}
        updateColumn={props.updateColumn}
        dateleColumn={props.dateleColumn}
        categoryTasks={category.tasks}
      />
    );
  });

  return (
    <div className="board-lists">
      {columns}

      <Addlist
        createColumn={props.createColumn}
        boardStore={props.boardStore}
      />
    </div>
  );
};

export default connect(
  (state: IAppState) => {
    let boardStore;

    if (state.boardStore.constructor === Object) {
      boardStore = [];
    } else boardStore = state.boardStore;
    return { boardStore };
  },

  { fetchData }
)(Board);
