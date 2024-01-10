import pythonLogo from "@/images/python.png"
import tsLogo from "@/images/ts.png"
import { ILangObj } from "../types/Lang"

export const Python: ILangObj = {
  name: "Python",
  param: "py",
  image: pythonLogo
}

export const Typescript: ILangObj = {
  name: "Typescript",
  param: "ts",
  image: tsLogo
}

const AvailableLangList = [Python, Typescript]

export default AvailableLangList
