import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import ContactForm from './Contactform'
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
function renderContactForm({ userToken = 'test-token' } = {}) {
  return render(
    <AuthContext.Provider value={{ userToken }}>
      <ContactForm />
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
    renderContactForm()
    // Query the way a user perceives the UI — by role and accessible name —
    // not by CSS class or test id, role doesn't change.
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  // 2) Conditional rendering: First/Last Name only exist for a "Person".
  test("choosing 'Person' reveals the First and Last Name fields", async () => {
    const user = userEvent.setup()
    renderContactForm()

    // queryBy* returns null instead of throwing — the right tool for asserting
    // that something is ABSENT.
    expect(screen.queryByLabelText(/first name/i)).not.toBeInTheDocument()

    // MUI's <Select> is a combobox + popover, not a native HTML <select>: click to
    // open it, then click the option. (If this ever flakes, swap the first
    // click for `fireEvent.mouseDown` — MUI opens on mousedown.)
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: 'Person' }))

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
  })

  // 3) The behavior that matters: filling the form and submitting sends the
  //    correctly-mapped payload (camelCase state -> snake_case API) with auth.
  test('submitting a Person posts the mapped payload with the auth token', async () => {
    const user = userEvent.setup()
    renderContactForm({ userToken: 'abc123' })

    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: 'Person' }))

    await user.type(screen.getByLabelText(/first name/i), 'Jane')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com')

    await user.click(screen.getByRole('button', { name: /submit/i }))

    // handleContactSubmit is async and not awaited by the form's onSubmit, so
    // wait for the mocked call to land instead of asserting immediately.
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1))

    expect(axios.post).toHaveBeenCalledWith(
      '/api/people/', // API_BASE is "" in tests, so the path resolves to this
      expect.objectContaining({
        first_name: 'Jane', // proves buildPeopleObject() maps the fields
        last_name: 'Doe',
        email: 'jane@example.com',
      }),
      { headers: { Authorization: 'Token abc123' } },
    )
  })
})
