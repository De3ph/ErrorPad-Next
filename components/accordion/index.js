"use client"
import React, { useState } from "react"
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Select,
  Option
} from "@/ui/index"
import LineChartComponent from "../linechart"
import { IconBrandStackoverflow } from "@tabler/icons-react"

export function DefaultAccordion({ errorsList }) {
  const [open, setOpen] = React.useState(-1)
  const [groupedChartData, setGroupedChartData] = useState([{}])
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const handleOpen = (value) => setOpen(open === value ? -1 : value)
  function handleChangeYear(val) {
    setSelectedYear(val)
  }

  function getErrorTypes(data) {
    return [...new Set(data.map((item) => item.code))]
  }

  function groupByErrorTypeAndYear(errorType, selectedYear) {
    console.log(selectedYear)
    const groupedData = {}
    const data = errorsList
    data.forEach((item) => {
      if (item.code === errorType) {
        const date = new Date(item.date)
        const year = date.getUTCFullYear()
        const month = new Intl.DateTimeFormat("en-US", {
          month: "long"
        }).format(date)
        const key = `${year}-${month}-${errorType}`
        groupedData[0] = { month: 0, count: 0 }
        if (selectedYear === 0 || year === selectedYear) {
          if (!groupedData[key]) {
            groupedData[key] = {
              year,
              month,
              code: errorType,
              count: 1
            }
          } else {
            groupedData[key].count++
          }
        }
      }
    })
    const sortedData = Object.values(groupedData).sort((a, b) => {
      const yearComparison = a.year - b.year
      if (yearComparison !== 0) {
        return yearComparison
      }

      const monthOrder = [
        "0",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]

      return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
    })

    return sortedData
  }
  let errorTypes = getErrorTypes(errorsList)
  let errorLang = errorsList[0]?.lang
  let years = []
  for (let index = 2023; index < new Date().getFullYear() + 1; index++) {
    years.push(index)
  }

  return (
    <div>
      <h3 className='flex justify-center text-2xl text-blue-gray-800 underline font-bold'>
        Yearly review by Error Types
      </h3>
      {errorTypes.map((type, index) => (
        <Accordion open={open === index} key={index}>
          <AccordionHeader
            onClick={() => {
              handleOpen(index)
              setSelectedYear(new Date().getFullYear())
              setGroupedChartData(groupByErrorTypeAndYear(type, selectedYear))
            }}
            className='flex justify-start items-center gap-4'
          >
            {type}
            <p className=' text-gray-600 font-light text-sm'>↓</p>
          </AccordionHeader>
          <AccordionBody>
            <div className='w-full flex flex-col items-center'>
              <div className='py-4'>
                <Select
                  label='Select Year'
                  defaultValue={selectedYear}
                  onChange={(val) => {
                    handleChangeYear(val)
                    setGroupedChartData(
                      groupByErrorTypeAndYear(type, parseInt(val))
                    )
                  }}
                >
                  {years.map((item, index) => (
                    <Option value={item} key={index}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </div>

              <LineChartComponent dataList={groupedChartData} />
              <a
                href={`https://stackoverflow.com/search?q=${errorLang}+${type}`}
                target='_blank'
                className=' text-xl flex items-center'
              >
                <IconBrandStackoverflow width='32' height='32' />
                The solution for this error can be found by clicking here
                <IconBrandStackoverflow width='32' height='32' />
              </a>
            </div>
          </AccordionBody>
        </Accordion>
      ))}
    </div>
  )
}
