import Image from 'next/image'
 
export default function NotFound() {
  return (
    <div className='flex items-center justify-center py-32'>
      <Image src={"/404.jpg"} alt={"not-found"} width={600} height={600}/>
    </div>
  )
}