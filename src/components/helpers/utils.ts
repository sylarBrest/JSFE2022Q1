import { TextContent } from '../types';

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
}
