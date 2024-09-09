import { CleanButtonProps } from '@/app/types'

export const CleanButton = ({ cleanBlocks }: CleanButtonProps) => {
  return (
    <div className='bg-teal-500 w-fit p-4 rounded text-white hover:bg-teal-700 cursor-pointer' onClick={cleanBlocks}>Limpiar</div>
  )
}
