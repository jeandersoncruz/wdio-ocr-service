import ocrGetData from '../utils/ocrGetData'
import { Rectangles, ScreenSize, TesseractOptions } from '../typings/types'

interface OcrGetTextOptions {
  androidRectangles?:Rectangles;
  iOSRectangles?:Rectangles;
  isTesseractAvailable: boolean;
  ocrImagesPath: string;
  reuseOcr: boolean;
  screenSize: ScreenSize;
}

export default async function ocrGetText(options: OcrGetTextOptions, tesseractOptions?: TesseractOptions): Promise<string> {
  const { text } = await ocrGetData(options, tesseractOptions)

  return text.replace(/\n\s*\n/g, '\n')
}
