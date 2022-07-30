import { TextContent, Comparison } from '@components/types';
import { SortOrder } from '@components/constants';

export default class Utils {
  static getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }

  static getTextContent<K extends keyof TextContent>(str: K): TextContent[K] {
    const textContent: TextContent = {
      manufacturer: 'Производитель',
      wheels: 'Размер колёс',
      frame: 'Размер рамы',
      color: 'Цвет',
      category: 'Категория',
    };

    return textContent[str];
  }

  static sortingFunction(curBikeCardParam: string, nextBikeCardParam: string, comparison: Comparison = '<'): number {
    if (comparison === '<') return curBikeCardParam < nextBikeCardParam ? SortOrder.Ascending : SortOrder.Descending;
    return curBikeCardParam > nextBikeCardParam ? SortOrder.Ascending : SortOrder.Descending;
  }
}
