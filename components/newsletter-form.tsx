"use client"

import { useState, type FormEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { sendSubscriptionEmail } from "@/utils/email"
import { useToast } from "@/hooks/use-toast"

interface NewsletterFormProps {
  className?: string
}

export function NewsletterForm({ className }: NewsletterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!email || !email.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Pass a more complete data object to ensure the email template has all needed fields
      const result = await sendSubscriptionEmail({
        email: email.trim(),
        from_name: "Website Visitor",
        subject: "Newsletter Subscription",
      })

      if (result.success) {
        toast({
          title: "Subscribed!",
          description: "Thank you for subscribing to our newsletter.",
          variant: "default",
        })
        setEmail("")
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
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-black/60 border-white/10 focus:border-fram3-yellow/50"
        />
        <Button type="submit" disabled={isSubmitting} className="bg-fram3-yellow text-black hover:bg-fram3-yellow/90">
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>
    </form>
  )
}

