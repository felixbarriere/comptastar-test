import '@testing-library/jest-dom'
import { render, screen, renderHook, act } from '@testing-library/react'
import Page from '../app/page'
import ContactsPage from '../app/contacts/page'
import { useContacts } from '../app/contacts/hooks/useContacts'
 
describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />)
 
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })
})

describe('ContactsPage', () => {
    it('renders the Contacts page correctly', () => {
      render(<ContactsPage />)
  
      const heading = screen.getByRole('heading', { level: 1 })
  
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent(/contact/i)
    })
  })

describe('useContacts - validation téléphone', () => {
    it('should not set an error if all fields are valid', () => {
        const { result } = renderHook(() => useContacts())
    
        act(() => {
          result.current.setForm({
            civilite: 'Monsieur',
            nom: 'Dupont',
            prenom: 'Jean',
            email: 'jean@exemple.com',
            telephone: '0123456789',
            pays: 'France',
          })
        })
    
        act(() => {
            result.current.handleSubmit({ preventDefault: () => {} })
          })
      })

    it('should set an error if one field is missing', () => {
        const { result } = renderHook(() => useContacts())

        act(() => {
            result.current.setForm({
            civilite: 'Monsieur',
            prenom: 'Jean',
            email: 'jean@exemple.com',
            telephone: '1234567890',
            pays: 'France',
            })
        })
        act(() => {
            result.current.handleSubmit({ preventDefault: () => {} })
        })

        expect(result.current.error).toMatch(/Tous les champs sont obligatoires./i)
    })

    it('should set an error if the phone number contains letters', () => {
        const { result } = renderHook(() => useContacts())

        act(() => {
            result.current.setForm({
            civilite: 'Monsieur',
            nom: 'Dupont',
            prenom: 'Jean',
            email: 'jean@exemple.com',
            telephone: 'abc123',
            pays: 'France',
            })
        })
        act(() => {
            result.current.handleSubmit({ preventDefault: () => {} })
        })

        expect(result.current.error).toMatch(/Le numéro de téléphone doit contenir exactement 10 chiffres./i)

    })

    it('should set an error if the mail format is not respected', () => {
        const { result } = renderHook(() => useContacts())

        act(() => {
            result.current.setForm({
            civilite: 'Monsieur',
            nom: 'Dupont',
            prenom: 'Jean',
            email: 'wrong',
            telephone: '1234567890',
            pays: 'France',
            })
        })
        act(() => {
            result.current.handleSubmit({ preventDefault: () => {} })
        })
        
        expect(result.current.error).toMatch(/L'adresse e-mail est invalide./i)
    })
})