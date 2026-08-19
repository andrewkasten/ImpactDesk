import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import DevelopmentForm from './DevelopmentForm'
import AuthContext from '../../../contexts/AuthContext'

// - Mocks -
// A unit test doesn't hit the real network. Replace axios with fakes so
// we can assert what the component tried to send.
// vi.fn  When a function is invoked, it stores its call arguments, returns, and instances.
vi.mock('axios', () => ({
  default: { post: vi.fn(), delete: vi.fn(), get: vi.fn() },
}))

// useContactForm also calls useSWR to load the people/organization lists.
// That data is irrelevant to submitting the form, so return an inert shape.
vi.mock('swr', () => ({
  default: () => ({ data: [], mutate: vi.fn() }),
}))

// The hook reads `userToken` via useContext(AuthContext). AuthContext has no
// default value, so it must wrap the component in a Provider or the hook
// throws on the destructure. This helper does that for every test.
function renderDevelopmentForm({ userToken = 'test-token' } = {}) {
  return render(
    <AuthContext.Provider value={{ userToken }}>
      <DevelopmentForm />
    </AuthContext.Provider>,
  )
}

beforeEach(() => {
  vi.clearAllMocks() // ensuring the test environment is clean after each test execution.
  // Make the POST resolve so `await axios.post(...)` inside the hook completes.
  axios.post.mockResolvedValue({ data: {} })
})

describe('ContactForm', () => {
  // 1) Smoke test: render test
  test('renders the submit button and the type selector', () => {
    renderDevelopmentForm()
    // Query the way a user perceives the UI — by role and accessible name —
    // not by CSS class or test id, role doesn't change.
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

 
  })


