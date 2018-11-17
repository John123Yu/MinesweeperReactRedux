export const INIT_MAP = "INIT_MAP";
export const INIT_DISPLAY = "INIT_DISPLAY";
export const CLICK_ACTION = "CLICK_ACTION";
export const INIT_CLICKED = "INIT_CLICKED";
export const CHANGE_CLICKED = "CHANGE_CLICKED";

let outer_array = [];
let display_map = [];
let clicked_map = [];
let map_size = 16;
let bomb_count = 40;

export function initMap() {
  for (let i = 0; i < map_size; i++) {
    let inner_array = [];
    for (let j = 0; j < map_size; j++) {
      inner_array.push(0);
    }
    outer_array.push(inner_array);
  }
  for (let i = 0; i < bomb_count; i++) {
    let row = random_value(map_size);
    let column = random_value(map_size);
    let original_value = outer_array[row][column];
    original_value !== 10 ? (outer_array[row][column] = 10) : i--;
  }
  for (let i = 0; i < map_size; i++) {
    for (let j = 0; j < map_size; j++) {
      outer_array[i][j] = count_bombs(outer_array, i, j);
    }
  }
  return {
    type: INIT_MAP,
    payload: outer_array
  };
}

export function initDisplay() {
  for (let i = 0; i < map_size; i++) {
    display_map.push([]);
    for (let j = 0; j < map_size; j++) {
      display_map[i].push(0);
    }
  }
  return {
    type: INIT_DISPLAY,
    payload: display_map
  };
}

export function clickAction(row, column) {
  display_map = display_map.slice();
  display_map[row][column] = outer_array[row][column];
  return {
    type: CLICK_ACTION,
    payload: display_map
  };
}

export function initClicked() {
  for (let i = 0; i < map_size; i++) {
    clicked_map.push([]);
    for (let j = 0; j < map_size; j++) {
      clicked_map[i].push(false);
    }
  }
  return {
    type: INIT_CLICKED,
    payload: clicked_map
  };
}
export function changeClicked(row, column) {
  clicked_map = clicked_map.slice();
  clicked_map[row][column] = true;
  return {
    type: CHANGE_CLICKED,
    payload: clicked_map
  };
}

let random_value = range => {
  return Math.floor(Math.random() * range);
};

let count_bombs = (array, i, j) => {
  if (array[i][j]) return 10;
  let value = 0;
  if (i > 0) {
    outer_array[i - 1][j + 1] === 10 ? value++ : undefined;
    outer_array[i - 1][j - 1] === 10 ? value++ : undefined;
    outer_array[i - 1][j] === 10 ? value++ : undefined;
  }
  if (i < map_size - 1) {
    outer_array[i + 1][j + 1] === 10 ? value++ : undefined;
    outer_array[i + 1][j - 1] === 10 ? value++ : undefined;
    outer_array[i + 1][j] === 10 ? value++ : undefined;
  }
  outer_array[i][j + 1] === 10 ? value++ : undefined;
  outer_array[i][j - 1] === 10 ? value++ : undefined;
  return value;
};
