"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button, List, ListItem } from "@/ui/index"

import availableLangList from "@/app/util/AvailableLangList"
import { usePathname } from "next/navigation"

function Languages({ urlLink }: any) {
  const currentPath = usePathname()
  return (
    <List className='grid grid-cols-2 gap-x-8 justify-items-center'>
      {availableLangList.map((lang, index) => (
        <Link
          key={index}
          className='flex items-center'
          href={`${currentPath}/${lang.name}`}
        >
          <ListItem className='hover:bg-transparent'>
            <Button
              variant='text'
              className='flex justify-center items-center gap-2'
            >
              <Image
                className='bg-transparent'
                src={lang.image}
                width={28}
                height={28}
                alt={lang.name + " logo"}
              />
              <p>{lang.name}</p>
            </Button>
          </ListItem>
        </Link>
      ))}
    </List>
  )
}

export default Languages
