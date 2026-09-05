import type { ComponentType } from 'react'
import { Dashboard } from './pages/Dashboard'
import { Notes } from './pages/Notes'
import { Bike } from './pages/Bike'
import { Personal } from './pages/Personal'

type MainCategory = {
  label: string
  path: string
  component: ComponentType
}

export const mainCategories: MainCategory[] = [
  {
    label: 'Personal',
    path: '/personal',
    component: Personal,
  },
  /*{
    label: 'Test',
    path: '/test',
    component: Test,
  },*/
  {
    label: 'Dashboard',
    path: '/dashboard',
    component: Dashboard,
  },
  {
    label: 'Notes',
    path: '/notes',
    component: Notes,
  },
  {
    label: 'Bike',
    path: '/bike',
    component: Bike,
  },
]