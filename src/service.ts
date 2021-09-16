import type { Services } from '@wdio/types'
import { mkdirSync } from 'fs'
import ocrElementPositionByText from './commands/ocrGetElementPositionByText'
import ocrGetText from './commands/ocrGetText'
import ocrClickOnText from './commands/ocrClickOnText'
import ocrSetValue from './commands/ocrSetValue'
import {
  ClickOnTextOptions,
  ElementPositionByText,
  GetTextOptions,
  OcrServiceConfig,
  ScreenSize,
  SetValueOptions,
  WaitForTextDisplayedOptions,
  TesseractOptions
} from './typings/types'
import ocrWaitForTextDisplayed from './commands/ocrWaitForTextDisplayed'
import { isTesseractAvailable } from './utils/tesseract'
import { OCR_IMAGES_PATH } from './utils/constants'

export default class OcrService implements Services.ServiceInstance {
  private _ocrImagesPath = OCR_IMAGES_PATH
  private _driver?: WebdriverIO.Browser | WebdriverIO.MultiRemoteBrowser

  constructor(private _options: OcrServiceConfig = {}) {
    this._ocrImagesPath = this._options.ocrImagesPath || this._ocrImagesPath

    mkdirSync(this._ocrImagesPath, { recursive: true })
  }

  async before(
    caps: WebDriver.Capabilities,
    specs: string[],
    driver: WebdriverIO.Browser | WebdriverIO.MultiRemoteBrowser
  ) {
    this._driver = driver

    if (this._driver.isIOS) {
      // Lower the quality so it will have better results for OCR on iOS
      await this._driver.updateSettings({ screenshotQuality: 2 })
    }

    const screenSize = await this._driver.getWindowSize() as ScreenSize
    const tesseractAvailable = isTesseractAvailable()

    this._driver.addCommand(
      'ocrGetElementPositionByText',
      (selector:string, options: ElementPositionByText={}) => {
        const { androidRectangles, iOSRectangles, reuseOcr } = options

        return ocrElementPositionByText({
          androidRectangles,
          iOSRectangles,
          isTesseractAvailable: tesseractAvailable,
          reuseOcr: !!reuseOcr,
          ocrImagesPath: this._ocrImagesPath,
          screenSize,
          text: selector,
        })
      }
    )

    this._driver.addCommand(
      'ocrClickOnText',
      (selector: string, options: ClickOnTextOptions = {}, tesseractOptions: TesseractOptions = {}) => {
        const { androidRectangles, iOSRectangles, reuseOcr } = options
        const { lang, oem, psm, presets } = tesseractOptions

        return ocrClickOnText({
          androidRectangles,
          iOSRectangles,
          isTesseractAvailable: tesseractAvailable,
          reuseOcr: !!reuseOcr,
          ocrImagesPath: this._ocrImagesPath,
          screenSize,
          text: selector,
        }, { lang, oem, psm, presets })
      }
    )

    this._driver.addCommand('ocrGetText', (options: GetTextOptions = {}, tesseractOptions: TesseractOptions = {}) => {
      const { androidRectangles, iOSRectangles, reuseOcr } = options
      const { lang, oem, psm, presets } = tesseractOptions

      return ocrGetText({
        androidRectangles,
        iOSRectangles,
        isTesseractAvailable: tesseractAvailable,
        reuseOcr: !!reuseOcr,
        ocrImagesPath: this._ocrImagesPath,
        screenSize,
      }, { lang, oem, psm, presets })
    })

    this._driver.addCommand(
      'ocrWaitForTextDisplayed',
      (selector: string, options: WaitForTextDisplayedOptions = {}, tesseractOptions: TesseractOptions = {}
      ) => {
        const { androidRectangles, iOSRectangles, timeout, timeoutMsg } = options
        const { lang, oem, psm, presets } = tesseractOptions

        return ocrWaitForTextDisplayed({
          androidRectangles,
          iOSRectangles,
          isTesseractAvailable: tesseractAvailable,
          ocrImagesPath: this._ocrImagesPath,
          screenSize,
          text: selector,
          timeout,
          timeoutMsg,
        },
        { lang, oem, psm, presets })
      }
    )

    this._driver.addCommand(
      'ocrSetValue',
      (selector: string, value: string, options: SetValueOptions = {}) => {
        const { androidRectangles, iOSRectangles, reuseOcr, clickDuration } = options

        return ocrSetValue({
          androidRectangles,
          iOSRectangles,
          isTesseractAvailable: tesseractAvailable,
          ocrImagesPath: this._ocrImagesPath,
          reuseOcr: !!reuseOcr,
          screenSize,
          text: selector,
          value,
          clickDuration,
        })
      }
    )
  }
}
