interface MetroLineProps {
    name: string
    color: string
  }
  
  export default function MetroLine({ name, color }: MetroLineProps) {
    return (
      <div className="flex items-center">
        <div className={`w-4 h-4 rounded-full ${color}`}></div>
        <span className="ml-2 text-sm">{name}</span>
      </div>
    )
  }
  
  