const enum LETTER {
  CHO = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ',
  JUNG = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ',
  JONG = 'ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ'
}

const enum LENGTH {
  JUNG = 21,
  JONG = 28
}

const CHO_TABLE = {
  ㄱ: 0,
  ㄲ: 1,
  ㄴ: 2,
  ㄷ: 3,
  ㄸ: 4,
  ㄹ: 5,
  ㅁ: 6,
  ㅂ: 7,
  ㅃ: 8,
  ㅅ: 9,
  ㅆ: 10,
  ㅇ: 11,
  ㅈ: 12,
  ㅉ: 13,
  ㅊ: 14,
  ㅋ: 15,
  ㅌ: 16,
  ㅍ: 17,
  ㅎ: 18
}

const HANGEUL_OFFSET = 0xac00

export class Hangeul {
  public static readonly separateWord = (word: string): string[] => {
    return Array.prototype.reduce.call(
      word,
      (result: string[], char: string): string[] => result.concat(Hangeul.separateChar(char)),
      []
    )
  }

  private static readonly separateChar = (char: string): string[] => {
    const choPredicted = LETTER.CHO[CHO_TABLE[char]]
    const isCho = !!choPredicted
    if (isCho) {
      return [choPredicted]
    }

    const targetKeyword = char.charCodeAt(0) - HANGEUL_OFFSET
    const jong = targetKeyword % LENGTH.JONG
    const jung = ((targetKeyword - jong) / LENGTH.JONG) % LENGTH.JUNG
    const cho = ((targetKeyword - jong) / LENGTH.JONG - jung) / LENGTH.JUNG
    const letterList = [LETTER.CHO[cho], LETTER.JUNG[jung], LETTER.JONG[jong - 1]]
    return letterList.filter(Boolean)
  }
}
