import { useCallback, useState } from "react";

import { randomTetromino, TETROMINOS } from "../tetrominos";
import { checkCollision, STAGE_WIDTH } from "../gameHelpers.js";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });
  // matrix will be tetromino
  const rotate = (matrix, dir) => {
    // Make the rows to become cols (transpose)
    const rotatedTetro = matrix.map((_, index) => matrix.map((col) => col[index]));
    // Reverse each row to get a rotated matrix
    if (dir > 0) return rotatedTetro.map((row) => row.reverse()); // rotate it clockwise
    return rotatedTetro.reverse(); // counterclockwise
  };

  // playerRotate also will do check collision, so we separate them in two functions.
  const playerRotate = (stage, dir) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    // 회전할 때 충돌이 일어난다면,
    // x=1 offset= -2
    // x=-1 offset= 3
    // x=2 offset=-4
    // x=-2 offset=5
    // 이 다음 충돌이 또 일어나고 tetromino가 3칸이라면 돌릴 수 없다 판단.
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        // can't rotate
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }

    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: prev.pos.x + x, y: prev.pos.y + y },
      collided,
    }));
  };
  // must use useCallback,if not infinite loop
  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
