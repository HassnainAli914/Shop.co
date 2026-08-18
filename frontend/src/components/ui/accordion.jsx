import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const AccordionContext = React.createContext({
  openItems: [],
  toggleItem: () => {},
})

const Accordion = ({ type = "single", collapsible = true, className, children, ...props }) => {
  const [openItems, setOpenItems] = React.useState([])

  const toggleItem = (val) => {
    if (type === "single") {
      setOpenItems((prev) => (prev.includes(val) ? (collapsible ? [] : [val]) : [val]))
    } else {
      setOpenItems((prev) =>
        prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
      )
    }
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

const AccordionItemContext = React.createContext("")

const AccordionItem = React.forwardRef(({ className, value, children, ...props }, ref) => {
  return (
    <AccordionItemContext.Provider value={value}>
      <div ref={ref} className={cn("border-b", className)} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
})
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  const value = React.useContext(AccordionItemContext)
  const { openItems, toggleItem } = React.useContext(AccordionContext)
  const isOpen = openItems.includes(value)

  return (
    <div className="flex">
      <button
        ref={ref}
        type="button"
        onClick={() => toggleItem(value)}
        className={cn(
          "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
    </div>
  )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const value = React.useContext(AccordionItemContext)
  const { openItems } = React.useContext(AccordionContext)
  const isOpen = openItems.includes(value)

  if (!isOpen) return null

  return (
    <div
      ref={ref}
      className={cn("overflow-hidden text-sm pb-4 pt-0 transition-all", className)}
      {...props}
    >
      {children}
    </div>
  )
})
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
