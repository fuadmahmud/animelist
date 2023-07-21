import { Collection } from "../hooks";
import { DetailAnime } from "../pages/Detail";

export function findAnime(col: Collection, colName: string, id?: number) {
  // return true if col/anime is found in the collection
  if (id && col[colName][id]) true;
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