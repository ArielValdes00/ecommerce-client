import { Skeleton } from "@nextui-org/react"

const Loading = () => {
    return (
        <div className='grid md:grid-cols-2 gap-5 py-10'>
            <Skeleton className="rounded-lg">
                <div className="h-96 w-full rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className='flex flex-col items-start justify-between gap-3'>
                <Skeleton className="w-full rounded-lg">
                    <div className="h-24 w-full rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-1/5 rounded-lg">
                    <div className="h-6 w-1/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-1/5 rounded-lg">
                    <div className="h-4 w-1/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-full rounded-lg">
                    <div className="h-4 w-full rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/3 rounded-lg">
                    <div className="h-4 w-2/3 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-full rounded-lg">
                    <div className="h-10 w-full rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-full rounded-lg">
                    <div className="h-10 w-full rounded-lg bg-default-200"></div>
                </Skeleton>
            </div>
        </div>
    )
}

export default Loading
