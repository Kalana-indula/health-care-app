import React from 'react'

const ProtectedLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <div>
            <div>
            {/*  Sidebar  */}
            </div>
            <div>
            {/*  Navbar  */}
                <div>{children}</div>
            </div>
        </div>
    )
}
export default ProtectedLayout
