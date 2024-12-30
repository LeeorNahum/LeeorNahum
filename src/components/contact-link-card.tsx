"use client"

import { Card } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ContactLinkCardProps {
  icon: LucideIcon
  title: string
  link: string
  color: string
  bgColor: string
  lightBgColor: string
  buttonText: string
}

export function ContactLinkCard({
  icon: Icon,
  title,
  link,
  color,
  bgColor,
  lightBgColor,
  buttonText,
}: ContactLinkCardProps) {
  const tooltipText = link.startsWith('mailto:') ? link.slice(7) :
                     link.startsWith('https://') ? link.replace('https://', '') :
                     link

  const ButtonComponent = link.startsWith('/') ? Link : 'a'
  const buttonProps = {
    href: link,
    ...(link.startsWith('/') 
      ? {} 
      : {
          target: '_blank',
          rel: 'noopener noreferrer'
        }
    )
  }

  return (
    <Card 
      className="relative overflow-hidden"
      style={{ backgroundColor: `${bgColor}20` }}
    >
      <div className="p-3">
        <div className="flex items-start justify-between mb-2">
          <Icon className="h-5 w-5" style={{ color }} />
          <span className="text-sm font-medium" style={{ color }}>
            {title}
          </span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <ButtonComponent
                {...buttonProps}
                className="block w-full px-2.5 py-1 rounded-full text-sm font-medium text-center transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: lightBgColor,
                  color,
                }}
              >
                {buttonText}
              </ButtonComponent>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </Card>
  )
} 