import path from 'path'
import Express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import counterApp from './reducers'
import App from './containers/App'

const app = Express()
const port = 3000

app.use(handleRender)

function handleRender(req, res) {
}

function renderFullPage(html, initialState) {
}

app.listen(port)
