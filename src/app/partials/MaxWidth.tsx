import React, { ReactNode } from 'react'

interface MaxWidthProps {
    children: ReactNode;
}
const MaxWidth: React.FC<MaxWidthProps> = ({ children }) => {
    return (
        <div className='px-5 xl:px-0 max-w-[1234px] mx-auto py-10'>
            {children}
        </div>
    )
}

export default MaxWidth