import { Outlet } from "react-router-dom"
import Header from "./modules/Header"
import Sidebar from "./modules/Sidebar"

export default function Layout({ onSearch, searchTerm }) {
    return (
        <div className="app-layout">
            <Header onSearch={onSearch} />
            <div className="main-container">
                <Sidebar />
                <main className="content-area">
                    <Outlet context={{ searchTerm }} /> 
                </main>
            </div>
        </div>
    )
}
