import type { ComponentType } from 'react'
import { PersonalPage } from './pages/PersonalPage'
import { Test } from './pages/Test'
import { Links } from './pages/Links'
import { Notes } from './pages/Notes'
import { Bike } from './pages/Bike'

type MainCategory = {
  label: string
  path: string
  component: ComponentType
}

export const mainCategories: MainCategory[] = [
  {
    label: 'Persönliches',
    path: '/personal',
    component: PersonalPage,
  },
  {
    label: 'Test',
    path: '/test',
    component: Test,
  },
  {
    label: 'Links',
    path: '/links',
    component: Links,
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