import test from 'node:test'
import assert from 'node:assert/strict'
import {getWorkshopState} from './workshopStatus.js'

const now = Date.parse('2026-10-20T12:00:00Z')
const futureSession = {start: '2026-10-22T12:00:00Z', end: '2026-10-22T13:00:00Z'}
const pastSession = {start: '2026-10-18T12:00:00Z', end: '2026-10-18T13:00:00Z'}

test('an open workshop allows registration only before deadline with a future session', () => {
  const state = getWorkshopState({
    status: 'open',
    sessions: [futureSession],
    registrationUrl: 'https://example.com/register',
    registrationDeadline: '2026-10-21T12:00:00Z',
  }, now)
  assert.equal(state.canRegister, true)
  assert.equal(state.label, 'Registration open')
})

test('a passed registration deadline closes registration', () => {
  const state = getWorkshopState({
    status: 'open',
    sessions: [futureSession],
    registrationUrl: 'https://example.com/register',
    registrationDeadline: '2026-10-20T11:00:00Z',
  }, now)
  assert.equal(state.canRegister, false)
  assert.equal(state.label, 'Registration closed')
})

test('past sessions are not labeled upcoming', () => {
  const state = getWorkshopState({status: 'upcoming', sessions: [pastSession]}, now)
  assert.equal(state.canRegister, false)
  assert.equal(state.label, 'Past workshop')
})

test('manual full and canceled states override registration', () => {
  for (const [status, label] of [['full', 'Full'], ['canceled', 'Canceled']]) {
    const state = getWorkshopState({status, sessions: [futureSession], registrationUrl: 'https://example.com/register'}, now)
    assert.equal(state.canRegister, false)
    assert.equal(state.label, label)
  }
})

test('a missing schedule is handled without an upcoming label', () => {
  const state = getWorkshopState({status: 'upcoming', sessions: []}, now)
  assert.equal(state.canRegister, false)
  assert.equal(state.label, 'Dates coming soon')
})