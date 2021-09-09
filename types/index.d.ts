import { OcrGetElementPositionByText } from "../src/commands/ocrGetElementPositionByText";
import {
  ClickOnTextOptions,
  ElementPositionByText,
  GetTextOptions,
  OcrServiceConfig,
  SetValueOptions,
  WaitForTextDisplayedOptions,
  TesseractOptions
} from "../src/typings/types";

declare global {
  namespace WebdriverIO {
    interface Browser {
      ocrClickOnText(
        selector: string,
        options: ClickOnTextOptions = {}
      ): Promise<void>;

      ocrGetElementPositionByText(
        selector: string,
        options: ElementPositionByText = {}
      ): Promise<OcrGetElementPositionByText>;

      ocrGetText(
        options?: GetTextOptions = {}, tesseractOptions?: TesseractOptions = {}
      ): Promise<string>;

      ocrSetValue(
        selector: string,
        value: string,
        options: SetValueOptions = {}
      ): Promise<void>;

      ocrWaitForTextDisplayed(
        selector: string,
        options: WaitForTextDisplayedOptions = {},
        tesseractOptions?: TesseractOptions = {}
      ): Promise<void>;
    }

    interface ServiceOption extends OcrServiceConfig {}
  }
}
