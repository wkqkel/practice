import { useState, useEffect } from "react";
import { createStage } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState();
  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = (newStage) => {
      return newStage.reduce((ack, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);
          ack.unshift(new Array(newStage[0].length).fill([0, "clear"])); // 행이 추가되지않은 상태로 빈 행을 배열 제일 앞에 추가
          return ack;
        }
        ack.push(row);
        return ack;
      }, []);
    };

    const updateStage = (prevStage) => {
      // first flush the stage
      const newStage = prevStage.map((row) => row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell)));

      // then draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [value, `${player.collided ? "merged" : "clear"}`];
          }
        });
      });
      // Then check if we collided
      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }

      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage, rowsCleared];
};
