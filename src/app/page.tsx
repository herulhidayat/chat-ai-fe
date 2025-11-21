import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { IconPlus } from "@tabler/icons-react"
import { ArrowUpIcon, Container } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import FormChatFeature from "@/features/FormChatFeature"

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
        <FormChatFeature />
      </div>
    </>
  );
}
