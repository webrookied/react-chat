import { Tabbar } from 'react-vant'
import {
  HomeO,
  CommentO,
  WapHomeO,
  ManagerO,
  ShopCollectO,
} from '@react-vant/icons'
import { useRouter } from 'next/router'
import Reac, { memo } from 'react'

const Tab = () => {
  const router = useRouter()
  // 底部导航tabbar数据
  const list = [
    { name: '首页', icon: <HomeO />, path: '/home' },
    { name: '消息', icon: <CommentO />, path: '/message' },
    { name: '我家', icon: <WapHomeO />, path: '/myfamily' },
    { name: '必看好房', icon: <ShopCollectO />, path: '/goodlook' },
    { name: '个人中心', icon: <ManagerO />, path: '/my' },
  ]
  // 点击路由跳转到对应的路由字段上
  const change = (item: any) => {
    router.push(item.path)
  }
  return (
    <div>
      {/* 循环遍历底部导航tabbar的数据 */}
      <div className="demo-tabbar">
        <Tabbar placeholder>
          {list.map((item: any, index) => {
            return (
              <Tabbar.Item
                key={index}
                icon={item.icon}
                onClick={() => change(item)}
              >
                {item.name}
              </Tabbar.Item>
            )
          })}
        </Tabbar>
      </div>
    </div>
  )
}

export default memo(Tab)
