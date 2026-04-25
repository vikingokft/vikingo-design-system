> **Audience:** any consumer (human or AI agent) building real screens with `@vikingo/ui`.
> **Use:** the canonical reference for the most common composition patterns. Linked from every template `CLAUDE.md`.

# Vikingo UI — Common Patterns

Each section is a copy-pasteable starting point. For full prop documentation, see [Storybook](https://vikingo-storybook.vercel.app).

## Form with validation (react-hook-form)

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@vikingo/ui'

const schema = z.object({
  email: z.string().email('Érvénytelen email'),
})

export function LoginForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => console.log(data))} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Belépés</Button>
      </form>
    </Form>
  )
}
```

## Confirm a destructive action

Prefer `ConfirmDialog` over building one with `Dialog` from scratch — it bakes in the right defaults (focus trap, accent color for the confirm button, labels in Hungarian).

```tsx
import { ConfirmDialog, Button } from '@vikingo/ui'
import { useState } from 'react'

export function DeleteUserButton({ onDelete }: { onDelete: () => Promise<void> }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="ghost" onClick={() => setOpen(true)}>Törlés</Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Felhasználó törlése"
        description="Ez a művelet nem vonható vissza."
        confirmLabel="Igen, törlés"
        cancelLabel="Mégse"
        variant="destructive"
        onConfirm={onDelete}
      />
    </>
  )
}
```

## Toast notifications

Mount `<Toaster />` once at the app root, then call `toast()` from anywhere.

```tsx
// app/layout.tsx (or src/main.tsx)
import { Toaster } from '@vikingo/ui'

<body>
  <Toaster />
  {children}
</body>
```

```tsx
// anywhere in the tree
import { toast } from '@vikingo/ui'

toast.success('Mentve')
toast.error('Hiba történt', { description: err.message })
toast.promise(saveData(), {
  loading: 'Mentés...',
  success: 'Sikeres',
  error: 'Hiba',
})
```

## Status badge

```tsx
import { Badge } from '@vikingo/ui'

<Badge variant="success">Aktív</Badge>
<Badge variant="warning">Függőben</Badge>
<Badge variant="error">Lezárva</Badge>
<Badge variant="info">Új</Badge>
<Badge variant="muted">Archív</Badge>
```

## Empty state

When a list, table, or search has no results, render an `EmptyState` instead of leaving a blank area.

```tsx
import { EmptyState, Button } from '@vikingo/ui'
import { Inbox } from 'lucide-react'

<EmptyState
  icon={Inbox}
  title="Még nincs üzenet"
  description="Az új üzenetek itt fognak megjelenni."
  action={<Button>Új üzenet</Button>}
/>
```

## Dashboard metric cards row

```tsx
import { StatCard } from '@vikingo/ui'
import { Users, ShoppingCart, DollarSign } from 'lucide-react'

<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <StatCard icon={Users} label="Felhasználók" value="1 234" change="+12%" trend="up" />
  <StatCard icon={ShoppingCart} label="Rendelések" value="89" change="-3%" trend="down" />
  <StatCard icon={DollarSign} label="Bevétel" value="2 450 000 Ft" change="+8%" trend="up" />
</div>
```

## Data table with sort + filter + pagination

```tsx
import { DataTable } from '@vikingo/ui'

const columns = [
  { id: 'name', header: 'Név', accessorKey: 'name', sortable: true },
  { id: 'email', header: 'Email', accessorKey: 'email' },
  { id: 'role', header: 'Szerep', accessorKey: 'role', filterable: true },
]

<DataTable
  columns={columns}
  data={users}
  pageSize={20}
  searchPlaceholder="Keresés név vagy email alapján…"
/>
```

## Page header with breadcrumb + actions

```tsx
import { PageHeader, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button } from '@vikingo/ui'

<PageHeader
  title="Felhasználók"
  description="Csapattagok kezelése"
  breadcrumb={
    <Breadcrumb>
      <BreadcrumbItem><BreadcrumbLink href="/">Kezdőlap</BreadcrumbLink></BreadcrumbItem>
      <BreadcrumbItem>Felhasználók</BreadcrumbItem>
    </Breadcrumb>
  }
  actions={<Button>Új felhasználó</Button>}
/>
```
