import { expect } from "chai";
import "mocha";
import { getFiles } from "../src/getFiles";
import { resolve, extname } from "path";

const testPath = resolve(__dirname, "./testPath");

describe("getFiles", function() {
  it("getFiles ", () => {
    // 递归时
    const files = getFiles(testPath);
    expect(files.includes(`${testPath}/f.less`)).to.equal(true);
    expect(files.includes(`${testPath}/p1/f1.css`)).to.equal(true);
    expect(files.includes(`${testPath}/p1/p2/f2.json`)).to.equal(true);
    expect(files.includes(`${testPath}/p1/p2/p3/f3.png`)).to.equal(true);
    expect(files.includes(`${testPath}/p1/p2/p3/p4/f4.jpg`)).to.equal(true);
    expect(files.includes(`${testPath}/p1/p2/p3/p4/p5/f5.txt`)).to.equal(true);

    // 不递归时
    const files2 = getFiles(testPath, { recursive: false });
    expect(files2.includes(`${testPath}/f.less`)).to.equal(true);
    expect(files2.includes(`${testPath}/p1/f1.css`)).to.equal(false);
    expect(files2.includes(`${testPath}/p1/p2/f2.json`)).to.equal(false);
    expect(files2.includes(`${testPath}/p1/p2/p3/f3.png`)).to.equal(false);
    expect(files2.includes(`${testPath}/p1/p2/p3/p4/f4.jpg`)).to.equal(false);
    expect(files2.includes(`${testPath}/p1/p2/p3/p4/p5/f5.txt`)).to.equal(false);
  });

  it("相对目录 ", () => {
    // 递归时
    try {
      getFiles("./testPath");
      expect(true).to.equal(false);
    } catch (e) {
      expect(e.message).to.equal("path must be absolute path!");
    }
  });

  it("getFiles filters", () => {
    // 递归时，/f.less 存在
    expect(
      getFiles(testPath, {
        filter: f => extname(f) === ".less"
      }).includes(`${testPath}/f.less`)
    ).to.equal(true);

    // 不递归时，/f.less 存在
    expect(
      getFiles(testPath, {
        recursive: false,
        filter: f => extname(f) === ".less"
      }).includes(`${testPath}/f.less`)
    ).to.equal(true);

    // 递归时，/p1/p2/p3/f3.png 存在
    expect(
      getFiles(testPath, {
        filter: f => extname(f) === ".png"
      }).includes(`${testPath}/p1/p2/p3/f3.png`)
    ).to.equal(true);

    expect(
      getFiles(testPath, {
        recursive: true,
        filter: f => extname(f) === ".png"
      }).includes(`${testPath}/p1/p2/p3/f3.png`)
    ).to.equal(true);

    // 不递归时，/p1/p2/p3/f3.png 不存在
    expect(
      getFiles(testPath, {
        recursive: false,
        filter: f => extname(f) === ".png"
      }).includes(`${testPath}/p1/p2/p3/f3.png`)
    ).to.equal(false);
  });
});
