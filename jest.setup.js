// Permet d'utiliser les matchers Jest-DOM (toBeInTheDocument, etc.)
import '@testing-library/jest-dom'

// Polyfill du fetch pour Jest (sinon Node ne le connaît pas)
import 'whatwg-fetch'
