import ocrGetElementPositionByText from './ocrGetElementPositionByText'
import { determineClickPoint } from '../utils'
import { Rectangles, ScreenSize, TesseractOptions  } from '../typings/types'

interface OcrClickOnTextOptions {
  androidRectangles?:Rectangles;
  iOSRectangles?:Rectangles;
  isTesseractAvailable: boolean;
  ocrImagesPath: string;
  reuseOcr: boolean;
  screenSize: ScreenSize;
  text: string;
  clickDuration?: Number;
}

export default async function ocrClickOnText(options: OcrClickOnTextOptions, tesseractOptions?: TesseractOptions): Promise<void> {
  const element = await ocrGetElementPositionByText(options, tesseractOptions)
  const { x, y } = determineClickPoint({ rectangles: element.dprPosition })

  await driver.performActions([
    {
      type: 'pointer',
      id: 'finger1',
      parameters: { pointerType: 'touch' },
      actions: [
        {
          type: 'pointerMove',
          duration: 0,
          x,
          y,
        },
        { type: 'pointerDown', button: 0 },
        { type: 'pause', duration: options.clickDuration ? options.clickDuration : 500 },
        { type: 'pointerUp', button: 0 },
      ],
    },
  ])
}
