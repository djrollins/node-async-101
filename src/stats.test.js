const stats = require('./stats.js');

const asciiString = 'Hello, World!';
const utf8String = 'ö';

describe('stats', () => {
  describe('countBytes', () => {
    it('counts ascii characters as single bytes', () => {
      expect(stats.countBytes(Buffer.from(asciiString))).toEqual(13);
    });
    it('counts multi-codepoint characters as multiple bytes', () => {
      expect(stats.countBytes(Buffer.from(utf8String))).toEqual(2);
    });
  });

  describe('countCharacters', () => {
    it('counts ascii characters as single bytes', () => {
      expect(stats.countCharacters(asciiString)).toEqual(13);
    });
    it('counts multi-codepoint characters as a single character', () => {
      expect(stats.countCharacters(utf8String)).toEqual(1);
    });
  });
});
