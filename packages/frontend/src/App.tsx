import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles/global.css'
import { TabBar } from './components/TabBar'
import { Home } from './pages/Home'
import { Words } from './pages/Words'
import { Account } from './pages/Account'

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/words" element={<Words />} />
          <Route path="/account" element={<Account />} />
        </Routes>
        <TabBar />
      </div>
    </BrowserRouter>
  )
}
