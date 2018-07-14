export class Numeronym {
  public static readonly exec = (numberList: number[]): string => {
    const sortedNumberList = numberList.sort((current, next) => current - next)

    if (1 === sortedNumberList.length) {
      return sortedNumberList[0].toString()
    }

    if (2 === sortedNumberList.length) {
      const DELIMITER_TABLE = ['~', ', ']
      const [beforeNumber, afterNumber] = sortedNumberList
      const isNeighbor = afterNumber - (beforeNumber + 1)
      return sortedNumberList.join(DELIMITER_TABLE[isNeighbor])
    }

    let beforeNumber = sortedNumberList.shift()!
    let afterNumber = beforeNumber
    let result: (string | number)[] = []

    const pushResult = (beforeNumber: number, afterNumber: number): void => {
      const calcResult = beforeNumber === afterNumber ? beforeNumber : [beforeNumber, afterNumber].join('~')
      result.push(calcResult)
    }

    const commitNumber = (current: number, next: number): number => {
      const isNeighbor = !(next - (current + 1))
      if (!isNeighbor) {
        pushResult(beforeNumber, afterNumber)
        beforeNumber = next
      }

      afterNumber = next
      return 0
    }

    sortedNumberList.sort(commitNumber)
    pushResult(beforeNumber, afterNumber)

    return result.join(', ')
  }
}
