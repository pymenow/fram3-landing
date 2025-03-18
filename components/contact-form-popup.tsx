"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { sendContactEmail } from "@/utils/email"
import { useToast } from "@/hooks/use-toast"
import { X } from "lucide-react"

interface ContactFormPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactFormPopup({ isOpen, onClose }: ContactFormPopupProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    requirements: "",
  })
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await sendContactEmail({
        ...formData,
        template_id: "template_vwnut77",
      })

      if (result.success) {
        toast({
          title: "Message sent!",
          description: "Our sales team will get back to you as soon as possible.",
          variant: "default",
        })
        setFormData({ name: "", email: "", phone: "", requirements: "" })
        onClose()
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again later.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[500px] bg-fram3-dark border-white/10 max-h-[90vh] overflow-y-auto"
        hideCloseButton
      >
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-white">Contact Our Sales Team</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-gray-400">
            Fill out the form below and we'll get back to you with a custom solution tailored to your needs.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="bg-black/60 border-white/10 focus:border-fram3-yellow/50 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
              className="bg-black/60 border-white/10 focus:border-fram3-yellow/50 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              required
              className="bg-black/60 border-white/10 focus:border-fram3-yellow/50 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements" className="text-white">
              Requirements
            </Label>
            <Textarea
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="Tell us about your project requirements and goals..."
              required
              className="min-h-[120px] bg-black/60 border-white/10 focus:border-fram3-yellow/50 text-white"
            />
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-fram3-yellow text-black hover:bg-fram3-yellow/90"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

