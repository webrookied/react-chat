/*
 * @Author: yangfan 1437446666@qq.com
 * @Date: 2023-03-23 15:01:22
 * @LastEditors: yangfan 1437446666@qq.com
 * @LastEditTime: 2023-03-23 15:27:21
 * @FilePath: \hongye_room\pages\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import react, { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  // 路由的重定向
  const router = useRouter()
  useEffect(() => {
    router.push('/home')
  }, [])
  return (
    <>
      <div>loding.....</div>
    </>
  )
}
