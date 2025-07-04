import { ReactNode } from 'react'
import Navigation from './Navigation';
import Footer from './Footer';


interface LayoutProps {
    children: ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div>
        <Navigation />
        <div className="min-h-screen flex flex-col">
        <main className="flex-1">
            {children}
        </main>
        </div>

        <Footer />
    </div>
  )
}

export default Layout