import { Hangeul } from './Hangeul'

export class AutoComplete {
  public static readonly searchByKeyword = (statement: string, keyword: string): string[] => {
    const wordList = statement.match(/[가-힣]+/g)
    if (!wordList) {
      return []
    }

    const resultStack: string[] = []
    const keywordLetterList = Hangeul.separateWord(keyword)

    for (const word of wordList) {
      const targetLetterList = Hangeul.separateWord(word)
      const isMatched = AutoComplete.isMatchedLetterList(keywordLetterList, targetLetterList)
      if (isMatched) {
        resultStack.push(word)
      }
    }

    return resultStack
  }

  private static readonly isMatchedLetterList = (keywordLetterList: string[], targetLetterList: string[]): boolean => {
    return !keywordLetterList.some((letter, index) => {
      const targetLetter = targetLetterList[index]
      return targetLetter !== letter
    })
  }
}
