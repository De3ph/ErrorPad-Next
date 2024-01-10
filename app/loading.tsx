import { Spinner } from "@/ui/index";

export default function Loading() {
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <Spinner className='h-48 w-48 text-green-300' />
    </div>
  )
}
