import logger from '@wdio/logger'
import ocrGetTextPositions from '../utils/ocrGetTextPositions'
import { fuzzyFind } from '../utils/fuzzySearch'
import { Rectangles, ScreenSize } from '../typings/types'
import { SERVICE_NAME } from '../utils/constants'

const log = logger(SERVICE_NAME)

interface OcrGetElementPositionByTextOptions {
  androidRectangles?: Rectangles;
  iOSRectangles?: Rectangles;
  isTesseractAvailable: boolean;
  ocrImagesPath: string;
  reuseOcr: boolean;
  screenSize: ScreenSize;
  text: string;
}

export interface FuzzyElement {
  /**
   * The found item
   */
  item: {
    /**
     * the matched string
     */
    text: string;
    /**
     * The original position
     */
    originalPosition: Rectangles;
    /**
     * The position after DPR check
     * screenshots for iOS are with DPR
     * position on the screen for iOS is smaller
     */
    dprPosition: Rectangles;
  };
  /**
   * Index of the fuzzy logic check
   */
  refIndex: number;
  /**
   * Matched score of the fuzzy logic check
   */
  score: number;
}

interface OcrGetElementPositionByText {
  /**
   * the original search value
   */
  searchValue: string;
  /**
   * the matched string
   */
  matchedString: string;
  /**
   * The original position
   */
  originalPosition: {
    top: number;
    left: number;
    right: number;
    bottom: number;
  },
  /**
   * The position after DPR check
   * screenshots for iOS are with DPR
   * position on the screen for iOS is smaller
   */
  dprPosition: {
    top: number;
    left: number;
    right: number;
    bottom: number;
  },
  /**
   * Matched score of the fuzzy logic check
   */
  score: number;
}

export default async function ocrGetElementPositionByText(
  data: OcrGetElementPositionByTextOptions
): Promise<OcrGetElementPositionByText> {
  const {
    androidRectangles,
    iOSRectangles,
    isTesseractAvailable,
    ocrImagesPath,
    reuseOcr,
    screenSize,
    text,
  } = data
  const textPositions = await ocrGetTextPositions({
    androidRectangles,
    iOSRectangles,
    isTesseractAvailable,
    ocrImagesPath,
    reuseOcr,
    screenSize,
  })
  const matches = fuzzyFind({
    textArray: textPositions,
    pattern: text,
  })
  let element
  let score

  if (matches.length === 0) {
    log.warn(`No matches were found based on the word "${text}"`)

    throw new Error(
      `InvalidSelectorMatch. Strategy 'ocr' has failed to find word '${text}' in the image`
    )
  } else if (matches.length > 1) {
    // @ts-ignore
    matches.sort((a, b) => (a.score > b.score ? 1 : -1))
    element = matches[0] as FuzzyElement
    score = Number(((1-element.score)*100).toFixed(2))
    const messageOne = `Multiple matches were found based on the word "${text}".`
    // @ts-ignore
    const messageTwo = `The match "${element.item.text}" with score "${score}%" will be used.`
    log.info(`${messageOne} ${messageTwo}`)
  } else {
    element = matches[0] as FuzzyElement
    score = Number(((1-element.score)*100).toFixed(2))
    log.info(
      `We searched for the word "${text}" and found one match "${element.item.text}" with score "${score}%"`
    )
  }

  return {
    searchValue: text,
    matchedString: element.item.text,
    originalPosition: element.item.originalPosition,
    dprPosition: element.item.dprPosition,
    score,
  }
}
