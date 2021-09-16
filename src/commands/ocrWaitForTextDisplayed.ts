import { Rectangles, ScreenSize, TesseractOptions } from '../typings/types'
import ocrGetText from './ocrGetText'

interface OcrWaitForTextDisplayedOptions {
  androidRectangles?: Rectangles;
  iOSRectangles?: Rectangles;
  isTesseractAvailable: boolean;
  ocrImagesPath: string;
  screenSize: ScreenSize;
  text: string;
  timeout?: number;
  timeoutMsg?: string;
}

export default async function ocrWaitForTextDisplayed(
  options: OcrWaitForTextDisplayedOptions,
  tesseractOptions?: TesseractOptions
) {
  const { timeout, timeoutMsg } = options

  return driver.waitUntil(
    async () => {
      const { androidRectangles, iOSRectangles, isTesseractAvailable, ocrImagesPath, screenSize, text } = options

      return (
        await ocrGetText({
          androidRectangles,
          iOSRectangles,
          isTesseractAvailable,
          ocrImagesPath,
          // Always use a clean OCR
          reuseOcr: false,
          screenSize,
        },
        tesseractOptions)
      ).includes(text)
    },
    {
      timeout: timeout || 180000,
      timeoutMsg:
        timeoutMsg ||
        `Could not find the text "${options.text}" within the requested time.`,
    }
  )
}
