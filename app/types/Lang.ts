import { StaticImageData } from "next/image"

interface ILang {
  name: string
  param: string
}

interface ILangImage {
  image: StaticImageData
}

interface ILangObj extends ILang, ILangImage {}

export type { ILang, ILangImage, ILangObj }
