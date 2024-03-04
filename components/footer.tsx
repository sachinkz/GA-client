import { Facebook, Github, Linkedin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 flex items-center bg-secondary mt-10 md:py-0">
      <div className="container flex  items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground space-x-1 md:text-left">
          Built by{" "}
          <a
            href=''
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            sachink
          </a>
          . The source code is available on 
          <a
            href=''
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
      <div className="flex gap-3">
        <Github className="h-5 w-5 hover:scale-125 transition-transform ease-in-out duration-300 cursor-pointer"/>
        <Linkedin className="h-5 w-5 hover:scale-125 transition-transform ease-in-out duration-300 cursor-pointer"/>
      </div>
    </footer>
  )
}