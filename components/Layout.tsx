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

        <main className="container mx-auto">
            {children}
        </main>

        <Footer />
    </div>
  )
}

export default Layout