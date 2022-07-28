import { UnionFilters, Size } from '@components/types';

export const MAX_BIKES_IN_CART = 20;

export const FILTER_NAMES: UnionFilters[] = ['manufacturers', 'wheelSize', 'frameSize', 'colors', 'categories'];

export const CLASS_NAMES: string[] = ['manufacturer', 'wheel-size', 'frame-size', 'color', 'category'];

export const FILTER_VALUES = ['manufacturer', 'wheels', 'frame', 'color', 'category'];

export const UNFILTERED_CLASSES: string[] = [
  'unfiltered',
  'unfiltered1',
  'unfiltered2',
  'unfiltered3',
  'unfiltered4',
  'unfiltered5',
  'unfiltered6',
  'unfiltered7',
  'unfiltered8',
];

export const FRAME_SIZES: Size = {
  S: 0, M: 1, L: 2, XL: 3,
};
