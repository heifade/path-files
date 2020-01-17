import { readdirSync, statSync } from "fs";
import { resolve } from "path";

interface IOptions {
  /**
   * 自定义过滤方法
   */
  filter?: (fileName: string) => boolean;
  /**
   * 是否递归。默认 true
   */
  recursive?: boolean;
}

/**
 * 获取目录下所有文件
 * @param path
 * @param options 可指定过滤方法
 */
export function getFiles(path: string, options: IOptions = { recursive: true, filter: undefined }) {
  const files: string[] = [];
  _getFiles(path, files, options);
  return files;
}

function _getFiles(path: string, files: string[], options: IOptions) {
  const { filter = undefined, recursive = true } = options;
  readdirSync(path).map(file => {
    const fullName = resolve(path, file);
    if (statSync(fullName).isDirectory()) {
      if (recursive) {
        // 递归
        _getFiles(fullName, files, options);
      }
    } else {
      if (filter) {
        if (filter(fullName)) {
          files.push(fullName);
        }
      } else {
        files.push(fullName);
      }
    }
  });
  return files;
}
