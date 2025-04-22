import { expect, describe, test } from "@jest/globals";
import isValidPassword from "../gardener-helpers/is-valid-password";

// Tests for password validation
describe("valid passwords", () => {
  test("bare minimum for requirements", () => {
    expect(isValidPassword("pa$sw0rd")).toBeTruthy();
  });
  test("good password", () => {
    expect(isValidPassword("hZIjf7$0&m/.")).toBeTruthy();
  });
});

describe('too short passwords', () => {
  test('empty string', () => {
    expect(isValidPassword('')).toBeFalsy();
  })
  test('too short, meets other reqs', () => {
    expect(isValidPassword('sh0rt!')).toBeFalsy();
  })
  test('one too short, meets other reqs', () => {
    expect(isValidPassword('short1!')).toBeFalsy();
  })
  test('one too short, no other reqs', () => {
    expect(isValidPassword('sevennn')).toBeFalsy();
  })
})

describe('no numbers', () => {
  test('just letters', () => {
    expect(isValidPassword('abcdefgh')).toBeFalsy();
  })
  test('also includes special character', () => {
    expect(isValidPassword('abcedfg!')).toBeFalsy();
  })
})

describe('no specials', () => {
  test('just numbers', () => {
    expect(isValidPassword('12345678')).toBeFalsy();
  })
  test('also includes special character', () => {
    expect(isValidPassword('abcedfg1')).toBeFalsy();
  })
})