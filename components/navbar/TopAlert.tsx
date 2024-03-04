import {ArrowRight} from "lucide-react"

import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"

export function TopAlert({content}:{content:string}) {
  return (
    <Alert className="w-fit p-2">
      <AlertTitle className="flex justify-center m-0 items-center gap-2">
        <p>{content}</p>
        <ArrowRight className="w-5 h-5 " />
      </AlertTitle>
    </Alert>
  )
}
