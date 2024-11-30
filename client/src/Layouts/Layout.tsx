import Navbar from "./Navbar"
import Footer from "./Footer"

interface LayoutProps {
    children: React.ReactNode;
  }

const Layout = ({children} : LayoutProps) => {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main>{children}</main>
                <Footer />
            </div>       
        </>
    )
}

export default Layout