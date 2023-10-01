import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import GlobalStyle from './Components/GlobalStyle'
import { getMyAccount, type User } from './lib/api/auth'
import { extractError } from './lib/api/error'
import { setClientCookie } from './lib/client'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
})

export const loader: LoaderFunction = async ({ request }) => {
  const cookie = request.headers.get('Cookie')
  if (!cookie) return null
  setClientCookie(cookie)
  try {
    const me = await getMyAccount()
    return me
  } catch (e) {
    const error = extractError(e)
    if(error.name === 'UnauthorizedError'){
      console.log(error.payload)
    }
    return null
  }
}

export default function App() {
  const data = useLoaderData<User | undefined>()
  console.log(data) // 토큰이없다면 null이 옴
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {typeof document === 'undefined' ? '__STYLES__' : null}
      </head>
      <body>
        <GlobalStyle />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
