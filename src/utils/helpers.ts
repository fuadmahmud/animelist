import { Collection } from "../hooks";
import { DetailAnime } from "../pages/Detail";

export function findAnime(col: Collection, colName: string, id: number) {
  // return true if anime is found in the collection
  if (col[colName][id]) return true;
  return false;
}

export function findCollection(col: Collection, colName: string) {
  if (Object.keys(col[colName] || {}).length) return true;

  return false;
}

export function editCollection(col: Collection, prevName: string, newName: string) {
  col[newName] = col[prevName];
  delete col[prevName];

  return col;
}

export function removeCollection(col: Collection, colName: string) {
  delete col[colName];

  return col;
}

export function removeAnime(singleCol: { [key: string]: DetailAnime }, id: number) {
  delete singleCol[id];

  return singleCol;
}

export function findInCollection(col: Collection, id: number) {
  const listAppear: string[] = [];

  Object.keys(col).forEach(key => col[key][id] ? listAppear.push(key) : undefined);

  return listAppear;
}