import { LinkedListD } from "../static/doublyLinkedList";
import { LinkedList } from "../static/singlyLinkedList";

export const INIT_MAP = "INIT_MAP";
export const INIT_DISPLAY = "INIT_DISPLAY";
export const CLICK_ACTION = "CLICK_ACTION";
export const INIT_CLICKED = "INIT_CLICKED";
export const CHANGE_CLICKED = "CHANGE_CLICKED";
export const RIGHT_CLICK = "RIGHT_CLICK";
export const END_GAME = "END_GAME";
export const MOVE_BACK = "MOVE_BACK";
export const MOVE_BACK_CLICK = "MOVE_BACK_CLICK";

let actual_map = [];
let display_map = [];
let clicked_map = [];
let recursed_map = [];
let display_map_list = new LinkedList();
let clicked_list = new LinkedList();
let map_size = 2;
let bomb_count = 1;

export function initMap() {
  for (let i = 0; i < map_size; i++) {
    let inner_array = [];
    for (let j = 0; j < map_size; j++) {
      inner_array.push(0);
    }
    actual_map.push(inner_array);
  }
  for (let i = 0; i < bomb_count; i++) {
    let row = random_value(map_size);
    let column = random_value(map_size);
    let original_value = actual_map[row][column];
    original_value !== 10 ? (actual_map[row][column] = 10) : i--;
  }
  for (let i = 0; i < map_size; i++) {
    for (let j = 0; j < map_size; j++) {
      actual_map[i][j] = count_bombs(actual_map, i, j);
    }
  }
  return {
    type: INIT_MAP,
    payload: actual_map
  };
}
export function initDisplay() {
  for (let i = 0; i < map_size; i++) {
    display_map.push([]);
    for (let j = 0; j < map_size; j++) {
      display_map[i].push(0);
    }
  }
  //   display_map_list.add(push_map);
  display_map_list.add(clone_array(display_map.slice()));
  //   console.log("1", display_map_list);
  return {
    type: INIT_DISPLAY,
    payload: display_map
  };
}
export function clickAction(row, column) {
  display_map = display_map.slice(0);
  if (display_map[row][column] === undefined) {
    // console.log("display", display_map);
    return {
      type: CLICK_ACTION,
      payload: display_map
    };
  }
  if (display_map[row][column] === 9) {
    return {
      type: CLICK_ACTION,
      payload: display_map
    };
  }
  display_map[row][column] = actual_map[row][column];
  if (actual_map[row][column] === 0) {
    click_adjacents(row, column, actual_map, display_map);
  }

  display_map_list.add(clone_array(display_map.slice()));
  return {
    type: CLICK_ACTION,
    payload: display_map
  };
}
export function rightClick(row, column) {
  display_map = display_map.slice(0);
  let value = display_map[row][column];
  if (value === 9) {
    display_map[row][column] = 0;
  } else if (value === 0 && !clicked_map[row][column]) {
    display_map[row][column] = 9;
  }
  return {
    type: RIGHT_CLICK,
    payload: display_map
  };
}
export function moveBack() {
  display_map_list.delete();
  let { value } = display_map_list.returnLast();
  display_map = clone_array(value.slice());
  clickAction(0, -1);
  return {
    type: MOVE_BACK,
    payload: value
  };
}
export function moveBackClick() {
  clicked_list.delete();
  let { value } = clicked_list.returnLast();
  clicked_map = clone_array(value.slice());
  changeClicked(0, -1);
  console.log("3", clicked_list);
  return {
    type: MOVE_BACK_CLICK,
    payload: value
  };
}
export function initClicked() {
  for (let i = 0; i < map_size; i++) {
    clicked_map.push([]);
    recursed_map.push([]);
    for (let j = 0; j < map_size; j++) {
      clicked_map[i].push(false);
      recursed_map[i].push(false);
    }
  }
  clicked_list.add(clone_array(clicked_map.slice()));
  console.log("1", clicked_list);
  return {
    type: INIT_CLICKED,
    payload: clicked_map
  };
}
export function changeClicked(row, column) {
  clicked_map = clicked_map.slice(0);
  //   if (clicked_map[row][column] === undefined) {
  //     console.log("Clicked map", clicked_map);
  //     return {
  //       type: CHANGE_CLICKED,
  //       payload: clicked_map
  //     };
  //   }
  if (clicked_map[row][column] !== undefined) {
    if (display_map[row][column] !== 9) clicked_map[row][column] = true;
    clicked_list.add(clone_array(clicked_map.slice()));
  }
  console.log("2", clicked_list);
  return {
    type: CHANGE_CLICKED,
    payload: clicked_map
  };
}
export function gameEnd() {
  let clicked_values = 0;
  let endGame = false;
  for (let i = 0; i < actual_map.length; i++) {
    for (let j = 0; j < actual_map.length; j++) {
      if (clicked_map[i][j]) clicked_values++;
      if (display_map[i][j] === 9 && actual_map[i][j] === 10) clicked_values++;
    }
  }
  if (clicked_values === map_size * map_size) endGame = true;
  return {
    type: END_GAME,
    payload: endGame
  };
}
let random_value = range => {
  return Math.floor(Math.random() * range);
};

let count_bombs = (array, i, j) => {
  if (array[i][j]) return 10;
  let value = 0;
  if (i > 0) {
    actual_map[i - 1][j + 1] === 10 ? value++ : undefined;
    actual_map[i - 1][j - 1] === 10 ? value++ : undefined;
    actual_map[i - 1][j] === 10 ? value++ : undefined;
  }
  if (i < map_size - 1) {
    actual_map[i + 1][j + 1] === 10 ? value++ : undefined;
    actual_map[i + 1][j - 1] === 10 ? value++ : undefined;
    actual_map[i + 1][j] === 10 ? value++ : undefined;
  }
  actual_map[i][j + 1] === 10 ? value++ : undefined;
  actual_map[i][j - 1] === 10 ? value++ : undefined;
  return value;
};

let click_adjacents = (row, column, map, display_map) => {
  recursed_map[row][column] = true;
  if (row > 0) {
    display_map[row - 1][column] = map[row - 1][column];
    display_map[row - 1][column - 1] = map[row - 1][column - 1];
    display_map[row - 1][column + 1] = map[row - 1][column + 1];
    changeClicked(row - 1, column);
    changeClicked(row - 1, column - 1);
    changeClicked(row - 1, column + 1);
  }
  if (row < actual_map.length - 1) {
    display_map[row + 1][column] = map[row + 1][column];
    display_map[row + 1][column - 1] = map[row + 1][column - 1];
    display_map[row + 1][column + 1] = map[row + 1][column + 1];
    changeClicked(row + 1, column);
    changeClicked(row + 1, column - 1);
    changeClicked(row + 1, column + 1);
  }
  display_map[row][column - 1] = map[row][column - 1];
  display_map[row][column + 1] = map[row][column + 1];
  changeClicked(row, column - 1);
  changeClicked(row, column + 1);

  if (row > 0) {
    if (map[row - 1][column] === 0 && !recursed_map[row - 1][column])
      click_adjacents(row - 1, column, map, display_map);
    if (map[row - 1][column - 1] === 0 && !recursed_map[row - 1][column - 1])
      click_adjacents(row - 1, column - 1, map, display_map);
    if (map[row - 1][column + 1] === 0 && !recursed_map[row - 1][column + 1])
      click_adjacents(row - 1, column + 1, map, display_map);
  }
  if (row < actual_map.length - 1) {
    if (map[row + 1][column] === 0 && !recursed_map[row + 1][column])
      click_adjacents(row + 1, column, map, display_map);
    if (map[row + 1][column - 1] === 0 && !recursed_map[row + 1][column - 1])
      click_adjacents(row + 1, column - 1, map, display_map);
    if (map[row + 1][column + 1] === 0 && !recursed_map[row + 1][column + 1])
      click_adjacents(row + 1, column + 1, map, display_map);
  }
  if (map[row][column - 1] === 0 && !recursed_map[row][column - 1])
    click_adjacents(row, column - 1, map, display_map);
  if (map[row][column + 1] === 0 && !recursed_map[row][column + 1])
    click_adjacents(row, column + 1, map, display_map);
};

let clone_array = old_array => {
  let new_array = [];
  for (let i = 0; i < map_size; i++) {
    new_array.push([]);
    for (let j = 0; j < map_size; j++) {
      new_array[i][j] = old_array[i][j];
    }
  }
  return new_array;
};
