import { Moon, Sun, SunMoon } from 'lucide-react'
import { Fragment } from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Label,
} from '@repo/ui'
import { useContext } from 'react'
import { ThemeProviderContext } from '.'
import { Translation } from "../translation";
import React from 'react';

export function ThemeToggle() {
  const { setTheme, theme } = useContext(ThemeProviderContext)




  return (
    <Fragment>
      <Label className="text-xs">Theme</Label>
      <br></br>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className='flex gap-2'>
            {theme === 'light' && <Sun className="h-[1rem] w-[1rem] transition-all" />}
            {theme === 'dark' && <Moon className="h-[1rem] w-[1rem] transition-all" />}
            {theme === 'system' && <SunMoon className="h-[1rem] w-[1rem] transition-all" />}
            <Translation id={`header.color.mode.${theme}`} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme('light')}>
            <Translation id={`header.color.mode.light`} defaultValue='Light' />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')}>
            <Translation id={`header.color.mode.dark`} defaultValue='Dark' />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('system')}>
            <Translation id={`header.color.mode.system`} defaultValue='System' />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Fragment>
  )
}
