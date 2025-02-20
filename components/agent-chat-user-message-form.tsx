import { useCallback, useRef, useEffect } from "react"
import { TrashIcon, Send } from "lucide-react"
import Textarea from "react-textarea-autosize"
import { toast } from "sonner"

import { useSettings, useSettingsModal } from "@/lib/hooks/use-api-key"
import { cn, nanoid } from "@/lib/utils"

import { UserMessage } from "./message"
import { Button } from "./ui/button"
import { IconArrowElbow, IconPlus } from "./ui/icons"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { useMediaQuery } from "@/lib/hooks/use-media-query"

export function AgentChatUserMessageForm({
  formRef,
  inputValue,
  setInputValue,
  setMessages,
  sendMessage,
  selectedActions,
  setSelectedActions,
  renderInputValue,
  setVariableValues,
  onKeyDown,
  setShowActionsMenu,
  prompt,
  handleNewChat,
}: {
  formRef: React.RefObject<HTMLFormElement>
  inputValue: string
  setInputValue: (value: string) => void
  setMessages: React.Dispatch<React.SetStateAction<any[]>>
  sendMessage: (value: string, apiKey: string, actions?: any[]) => Promise<any>
  selectedActions: any[]
  setSelectedActions: React.Dispatch<React.SetStateAction<any[]>>
  renderInputValue: () => string
  setVariableValues: (values: any) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  setShowActionsMenu: (show: boolean) => void
  handleNewChat?: any
  prompt?: { template: string }
}) {
  const { settings } = useSettings()
  const { toggleSettingsModal } = useSettingsModal()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const isMobile = useMediaQuery("(max-width: 640px)")

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Memoize the onChange handler to prevent unnecessary re-renders
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputValue(e.target.value)
      if (settings.USER_OPEN_AI_API_KEY === "") {
        toggleSettingsModal()
      }
    },
    [setInputValue, settings.USER_OPEN_AI_API_KEY, toggleSettingsModal]
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const message = renderInputValue()
    if (!message?.trim()) return

    setInputValue("")
    setVariableValues({})
    setSelectedActions([])
    setShowActionsMenu(false)

    await sendMessage(message, settings.USER_OPEN_AI_API_KEY, selectedActions.length > 0 ? selectedActions : undefined)
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="relative flex w-full items-center space-x-2"
    >
      <div className="relative flex-1">
        <Textarea
          ref={inputRef}
          tabIndex={0}
          rows={1}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
          placeholder="Type a message or use @ to access tools..."
          spellCheck={false}
          className="w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
          style={{
            maxHeight: isMobile ? "120px" : "200px",
            minHeight: "3rem",
          }}
        />
        <div 
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-primary transition-transform duration-300 ease-in-out peer-focus:scale-x-100"
          aria-hidden="true"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size={isMobile ? "sm" : "default"}
          onClick={handleNewChat}
          className="hidden sm:inline-flex"
        >
          Clear
        </Button>
        <Button
          type="submit"
          size={isMobile ? "sm" : "default"}
          className={`transition-transform duration-200 ${
            inputValue.trim() ? "scale-100" : "scale-95 opacity-70"
          }`}
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>

      {isMobile && (
        <div className="absolute -top-12 right-0 flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleNewChat}
          >
            Clear
          </Button>
        </div>
      )}
    </form>
  )
}
