import type { Meta, StoryObj } from '@storybook/react'
import { Badge, DataTable, type ColumnDef } from '@vikingo/ui'

const meta: Meta = {
  title: 'Data/DataTable',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj

// ── Sample data ────────────────────────────────────────────────────────────────

interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  spend: number
}

const USERS: User[] = [
  {
    id: 1,
    name: 'Kiss Anna',
    email: 'anna@vikingo.hu',
    role: 'Admin',
    status: 'active',
    spend: 128400,
  },
  {
    id: 2,
    name: 'Nagy Béla',
    email: 'bela@vikingo.hu',
    role: 'Editor',
    status: 'active',
    spend: 47200,
  },
  {
    id: 3,
    name: 'Szabó Csilla',
    email: 'csilla@vikingo.hu',
    role: 'Viewer',
    status: 'inactive',
    spend: 0,
  },
  {
    id: 4,
    name: 'Tóth Dániel',
    email: 'daniel@vikingo.hu',
    role: 'Editor',
    status: 'pending',
    spend: 8900,
  },
  {
    id: 5,
    name: 'Varga Eszter',
    email: 'eszter@vikingo.hu',
    role: 'Admin',
    status: 'active',
    spend: 215000,
  },
  {
    id: 6,
    name: 'Fekete Ferenc',
    email: 'ferenc@vikingo.hu',
    role: 'Viewer',
    status: 'inactive',
    spend: 0,
  },
  {
    id: 7,
    name: 'Molnár Gábor',
    email: 'gabor@vikingo.hu',
    role: 'Editor',
    status: 'active',
    spend: 62100,
  },
  {
    id: 8,
    name: 'Horváth Hanna',
    email: 'hanna@vikingo.hu',
    role: 'Viewer',
    status: 'pending',
    spend: 3400,
  },
  {
    id: 9,
    name: 'Kovács István',
    email: 'istvan@vikingo.hu',
    role: 'Admin',
    status: 'active',
    spend: 340500,
  },
  {
    id: 10,
    name: 'Lukács Júlia',
    email: 'julia@vikingo.hu',
    role: 'Editor',
    status: 'inactive',
    spend: 0,
  },
  {
    id: 11,
    name: 'Mészáros Károly',
    email: 'karoly@vikingo.hu',
    role: 'Viewer',
    status: 'active',
    spend: 19200,
  },
  {
    id: 12,
    name: 'Németh Laura',
    email: 'laura@vikingo.hu',
    role: 'Editor',
    status: 'active',
    spend: 88700,
  },
]

const statusVariant: Record<User['status'], 'success' | 'error' | 'warning'> = {
  active: 'success',
  inactive: 'error',
  pending: 'warning',
}

const statusLabel: Record<User['status'], string> = {
  active: 'Aktív',
  inactive: 'Inaktív',
  pending: 'Függőben',
}

const COLUMNS: ColumnDef<User>[] = [
  { key: 'id', header: '#', className: 'w-12 text-[var(--color-text-muted)]' },
  { key: 'name', header: 'Név', sortable: true },
  { key: 'email', header: 'Email', className: 'text-[var(--color-text-muted)]' },
  { key: 'role', header: 'Szerepkör', sortable: true },
  {
    key: 'status',
    header: 'Státusz',
    sortable: true,
    cell: (row) => (
      <Badge variant={statusVariant[row.status]} dot size="sm">
        {statusLabel[row.status]}
      </Badge>
    ),
  },
  {
    key: 'spend',
    header: 'Költés',
    sortable: true,
    className: 'text-right font-mono',
    cell: (_, value) => (Number(value) > 0 ? `${Number(value).toLocaleString('hu-HU')} Ft` : '–'),
  },
]

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  render: () => <DataTable data={USERS} columns={COLUMNS} />,
}

export const Searchable: Story = {
  name: 'Searchable · Kereshető',
  render: () => (
    <DataTable
      data={USERS}
      columns={COLUMNS}
      searchable
      searchPlaceholder="Felhasználó keresése…"
    />
  ),
}

export const WithPagination: Story = {
  name: 'With Pagination · Lapozással',
  render: () => <DataTable data={USERS} columns={COLUMNS} searchable pageSize={5} />,
}

export const LoadingState: Story = {
  name: 'Loading State · Töltés',
  render: () => <DataTable data={[]} columns={COLUMNS} loading pageSize={5} />,
}

export const EmptyState: Story = {
  name: 'Empty State · Üres',
  render: () => (
    <DataTable
      data={[]}
      columns={COLUMNS}
      searchable
      emptyText="Nem található egyező felhasználó."
    />
  ),
}

export const FullFeatured: Story = {
  name: 'Full Featured · Teljes funkcióval',
  render: () => (
    <DataTable
      data={USERS}
      columns={COLUMNS}
      searchable
      searchPlaceholder="Felhasználó keresése…"
      pageSize={5}
      emptyText="Nincs találat."
    />
  ),
}
