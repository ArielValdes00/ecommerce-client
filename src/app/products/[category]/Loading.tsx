import { Skeleton } from "@nextui-org/react"

const Loading = () => {
    return (
        <div className='grid grid-cols-3 gap-4'>
            {Array(6).fill(0).map((_, index) => (
                <Skeleton key={index} className='flex flex-col gap-3 items-center justify-between p-3 rounded-lg'>
                    <div className="h-64 w-full bg-default-300 rounded"></div>
                    <div className="h-6 w-3/4 bg-default-300 rounded"></div>
                    <div className="h-6 w-1/2 bg-default-300 rounded"></div>
                    <div className="h-10 w-full bg-default-300 rounded"></div>
                </Skeleton>
            ))}
        </div>
    )
}

export default Loading
