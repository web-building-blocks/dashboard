"use client"
import { useEffect, useState } from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

type Sale = {
  _id: string
  name: string
  email: string
  sales: number
}

export function RecentSales() {

  const [data, setData] = useState<Sale[]>([])
  
  useEffect(() => {
    fetch("/api/recent-sales")
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [])


  return (
    <div className="space-y-8">
      {data.map((item, i) => (
        <div key={item._id} className="flex items-center">
          <div className="h-9 w-9 flex items-center justify-center rounded-full bg-muted">
            {item.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.email}</p>
          </div>
          <div className="ml-auto font-medium">+${item.sales.toFixed(2)}</div>
        </div>
      ))}
    </div>
  )

  // return (
  //   <div className="space-y-8">
  //     <div className="flex items-center">
  //       <Avatar className="h-9 w-9">
  //         <AvatarImage src="/avatars/01.png" alt="Avatar" />
  //         <AvatarFallback>OM</AvatarFallback>
  //       </Avatar>
  //       <div className="ml-4 space-y-1">
  //         <p className="text-sm font-medium leading-none">{item.name}</p>
  //         <p className="text-sm text-muted-foreground">
  //           olivia.martin@email.com
  //         </p>
  //       </div>
  //       <div className="ml-auto font-medium">+$1,999.00</div>
  //     </div>
  //     <div className="flex items-center">
  //       <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
  //         <AvatarImage src="/avatars/02.png" alt="Avatar" />
  //         <AvatarFallback>JL</AvatarFallback>
  //       </Avatar>
  //       <div className="ml-4 space-y-1">
  //         <p className="text-sm font-medium leading-none">Jackson Lee</p>
  //         <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
  //       </div>
  //       <div className="ml-auto font-medium">+$39.00</div>
  //     </div>
  //     <div className="flex items-center">
  //       <Avatar className="h-9 w-9">
  //         <AvatarImage src="/avatars/03.png" alt="Avatar" />
  //         <AvatarFallback>IN</AvatarFallback>
  //       </Avatar>
  //       <div className="ml-4 space-y-1">
  //         <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
  //         <p className="text-sm text-muted-foreground">
  //           isabella.nguyen@email.com
  //         </p>
  //       </div>
  //       <div className="ml-auto font-medium">+$299.00</div>
  //     </div>
  //     <div className="flex items-center">
  //       <Avatar className="h-9 w-9">
  //         <AvatarImage src="/avatars/04.png" alt="Avatar" />
  //         <AvatarFallback>WK</AvatarFallback>
  //       </Avatar>
  //       <div className="ml-4 space-y-1">
  //         <p className="text-sm font-medium leading-none">William Kim</p>
  //         <p className="text-sm text-muted-foreground">will@email.com</p>
  //       </div>
  //       <div className="ml-auto font-medium">+$99.00</div>
  //     </div>
  //     <div className="flex items-center">
  //       <Avatar className="h-9 w-9">
  //         <AvatarImage src="/avatars/05.png" alt="Avatar" />
  //         <AvatarFallback>SD</AvatarFallback>
  //       </Avatar>
  //       <div className="ml-4 space-y-1">
  //         <p className="text-sm font-medium leading-none">Sofia Davis</p>
  //         <p className="text-sm text-muted-foreground">sofia.davis@email.com</p>
  //       </div>
  //       <div className="ml-auto font-medium">+$39.00</div>
  //     </div>
  //   </div>
  // )
}
