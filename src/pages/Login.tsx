import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useAuth } from "@/features/auth/hooks/useAuth"

const loginSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, "Password must be at least 8 characters"),
  })

type LoginFormValues = z.infer<typeof loginSchema>

function Login() {
  const { login, isLoading } = useAuth()
  const navigate = useNavigate()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: LoginFormValues) {
    try {
      await login(values.email, values.password)

      // Show success toast
      const toast = document.createElement('div')
      toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-4 z-50'
      toast.innerHTML = `
        <span>Login successful!</span>
      `
      document.body.appendChild(toast)

      // Navigate to projects after short delay
      setTimeout(() => {
        navigate('/projects')
      }, 1000)

      // Remove toast after 3 seconds
      setTimeout(() => {
        toast.remove()
      }, 3000)
    } catch (error) {
      // Show error toast
      const toast = document.createElement('div')
      toast.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-4 z-50'
      toast.innerHTML = `
        <span>Error Logging In</span>
        <span>Please try again</span>
      `
      document.body.appendChild(toast)
      console.log(error)

      // Remove toast after 5 seconds
      setTimeout(() => {
        toast.remove()
      }, 5000)
    }
  }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="w-full max-w-md">
            <CardHeader>
            <CardTitle>Login to Account</CardTitle>
            <CardDescription>Sign in to get started with PM Tool</CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormDescription>Must be at least 8 characters</FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Sign in"}
                    </Button>
                    </form>
                </Form>

                <div className="mt-6 text-center text-sm">
                    Don't have an account?{" "}
                    <a href="/register" className="text-primary hover:underline">
                    Register
                    </a>
                </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login;