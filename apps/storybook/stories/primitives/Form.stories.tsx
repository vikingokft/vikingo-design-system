import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Phone, User, Lock, Globe } from 'lucide-react'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Input,
  Textarea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Checkbox,
  Button,
  Alert,
} from '@vikingo/ui'

const meta: Meta = {
  title: 'Forms/Form',
  parameters: {
    layout: 'centered',
    docs: { source: { type: 'code' } },
  },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

// ── Basic Form ───────────────────────────────────────────────────────────────

const basicSchema = z.object({
  name: z.string().min(2, 'Legalább 2 karakter szükséges'),
  email: z.string().email('Érvénytelen email cím'),
})

export const BasicForm: Story = {
  name: 'Basic Form · Alap form',
  render: () => {
    const form = useForm<z.infer<typeof basicSchema>>({
      resolver: zodResolver(basicSchema),
      defaultValues: { name: '', email: '' },
    })

    return (
      <div className="w-96 p-6 bg-[var(--color-bg)]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => {})} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Teljes név</FormLabel>
                  <FormControl>
                    <Input placeholder="pl. Nagy Bence" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Email cím</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="pl. bence@vikingo.hu" {...field} />
                  </FormControl>
                  <FormDescription>Erre a címre küldjük a visszaigazolást.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Küldés
            </Button>
          </form>
        </Form>
      </div>
    )
  },
}

// ── Full Registration Form ───────────────────────────────────────────────────

const registerSchema = z.object({
  fullName: z.string().min(2, 'Legalább 2 karakter szükséges'),
  email: z.string().email('Érvénytelen email cím'),
  password: z.string().min(8, 'Legalább 8 karakter szükséges'),
  role: z.string().min(1, 'Válassz szerepkört'),
  bio: z.string().max(200, 'Maximum 200 karakter').optional(),
  terms: z.boolean().refine((v) => v === true, 'El kell fogadnod a feltételeket'),
})

export const RegistrationForm: Story = {
  name: 'Registration Form · Regisztrációs form',
  render: () => {
    const form = useForm<z.infer<typeof registerSchema>>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
        fullName: '',
        email: '',
        password: '',
        role: '',
        bio: '',
        terms: false,
      },
    })

    return (
      <div className="w-80 p-6 bg-[var(--color-bg)]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => {})} className="flex flex-col gap-4">
            <p className="font-display font-semibold text-lg text-[var(--color-text)]">
              Regisztráció
            </p>

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Teljes név</FormLabel>
                  <FormControl>
                    <Input placeholder="pl. Nagy Bence" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Email cím</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="bence@vikingo.hu" {...field} />
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
                  <FormLabel required>Jelszó</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormDescription>Legalább 8 karakter, szám és betű.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Szerepkör</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Válassz szerepkört" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Adminisztrátor</SelectItem>
                      <SelectItem value="editor">Szerkesztő</SelectItem>
                      <SelectItem value="viewer">Megtekintő</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bemutatkozás</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mesélj magadról..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Maximum 200 karakter.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-start gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-0.5"
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal cursor-pointer leading-snug">
                      Elfogadom az általános szerződési feltételeket
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Regisztráció
            </Button>
          </form>
        </Form>
      </div>
    )
  },
}

// ── Validation Error State ───────────────────────────────────────────────────

export const WithValidationErrors: Story = {
  name: 'Validation Errors · Validációs hibák',
  render: () => {
    const form = useForm<z.infer<typeof basicSchema>>({
      resolver: zodResolver(basicSchema),
      defaultValues: { name: 'X', email: 'nemvalid' },
    })

    // Trigger validation on mount to show errors
    const onSubmit = form.handleSubmit(() => {})

    return (
      <div className="w-96 p-6 bg-[var(--color-bg)]">
        <Form {...form}>
          <form className="flex flex-col gap-4">
            <Alert variant="error" title="Hibás adatok">
              Kérjük javítsd ki az alábbi mezőket a folytatáshoz.
            </Alert>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Teljes név</FormLabel>
                  <FormControl>
                    <Input placeholder="pl. Nagy Bence" {...field} />
                  </FormControl>
                  <FormMessage>Legalább 2 karakter szükséges</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Email cím</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="pl. bence@vikingo.hu" {...field} />
                  </FormControl>
                  <FormMessage>Érvénytelen email cím</FormMessage>
                </FormItem>
              )}
            />
            <Button type="button" className="w-full" onClick={onSubmit}>
              Küldés
            </Button>
          </form>
        </Form>
      </div>
    )
  },
}

// ── 2-Column Layout ──────────────────────────────────────────────────────────

const twoColSchema = z.object({
  firstName: z.string().min(1, 'Kötelező'),
  lastName: z.string().min(1, 'Kötelező'),
  email: z.string().email('Érvénytelen email'),
  phone: z.string().min(8, 'Érvénytelen telefonszám'),
  city: z.string().min(1, 'Kötelező'),
  country: z.string().min(1, 'Válassz országot'),
})

export const TwoColumnLayout: Story = {
  name: '2-Column Layout · Kétoszlopos elrendezés',
  render: () => {
    const form = useForm<z.infer<typeof twoColSchema>>({
      resolver: zodResolver(twoColSchema),
      defaultValues: { firstName: '', lastName: '', email: '', phone: '', city: '', country: '' },
    })

    return (
      <div className="w-[520px] p-6 bg-[var(--color-bg)]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => {})} className="flex flex-col gap-4">
            <p className="font-display font-semibold text-lg text-[var(--color-text)]">
              Számlázási adatok
            </p>

            {/* 2 columns */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Keresztnév</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Bence"
                        leftIcon={<User className="h-4 w-4" />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Vezetéknév</FormLabel>
                    <FormControl>
                      <Input placeholder="Nagy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Full width */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Email cím</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="bence@vikingo.hu"
                      leftIcon={<Mail className="h-4 w-4" />}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 2 columns */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Telefonszám</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+36 30 123 4567"
                        leftIcon={<Phone className="h-4 w-4" />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Ország</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Válassz…" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="hu">Magyarország</SelectItem>
                        <SelectItem value="ro">Románia</SelectItem>
                        <SelectItem value="sk">Szlovákia</SelectItem>
                        <SelectItem value="at">Ausztria</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Full width */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Város</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Budapest"
                      leftIcon={<Globe className="h-4 w-4" />}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Mentés
            </Button>
          </form>
        </Form>
      </div>
    )
  },
}

// ── With Icons ───────────────────────────────────────────────────────────────

const iconSchema = z.object({
  email: z.string().email('Érvénytelen email'),
  password: z.string().min(8, 'Legalább 8 karakter'),
})

export const WithIcons: Story = {
  name: 'With Icons · Ikonokkal',
  render: () => {
    const form = useForm<z.infer<typeof iconSchema>>({
      resolver: zodResolver(iconSchema),
      defaultValues: { email: '', password: '' },
    })

    return (
      <div className="w-96 p-6 bg-[var(--color-bg)]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => {})} className="flex flex-col gap-4">
            <p className="font-display font-semibold text-lg text-[var(--color-text)]">Belépés</p>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Email cím</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="bence@vikingo.hu"
                      leftIcon={<Mail className="h-4 w-4" />}
                      {...field}
                    />
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
                  <FormLabel required>Jelszó</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      leftIcon={<Lock className="h-4 w-4" />}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Legalább 8 karakter.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Belépés
            </Button>
          </form>
        </Form>
      </div>
    )
  },
}
