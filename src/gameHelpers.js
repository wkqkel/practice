export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;
export const createStage = () => Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, "clear"]));

// Array.from({ length: 20 }, () => Array(10).fill(0));
// 첫번째 인자로 배열을 2번째인자로 각각의 배열에 적용할 함수
// 배열은 사실 length 라는 속성을 가진 object 이고, 그렇다면 반대로 object 에 length 속성을 넣어주게 되면 마치 배열처럼 인식된다

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      // 1. Check that we're on an actual Tetromino cell
      if (player.tetromino[y][x] !== 0) {
        if (
          // 2. Check that our move is inside the game areas height (y)
          // We shouldn't go through the bottom of the play area
          !stage[y + player.pos.y + moveY] ||
          // 3. Check that our move is inside the game areas width (x)
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // 4. Check that the cell we're moving to isnt't set to clean
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== "clear"
        ) {
          return true;
        }
      }
    }
  }
};
