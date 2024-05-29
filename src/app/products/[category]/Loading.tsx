import { Skeleton } from "@nextui-org/react";

const Loading = () => {
    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
            {Array(6).fill(0).map((_, index) => (
                <div key={index} className='flex flex-col gap-3 items-start justify-between p-3 rounded-lg'>
                    <Skeleton className="w-full h-64 bg-default-200 rounded-xl" />
                    <Skeleton className="w-3/5 h-4 bg-default-200 rounded-full" />
                    <Skeleton className="w-4/5 h-4 bg-default-200 rounded-full" />
                    <Skeleton className="w-2/5 h-4 bg-default-200 rounded-full" />
                </div>
            ))}
        </div>
    );
}

export default Loading;
