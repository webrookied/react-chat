import React, { FC } from 'react'
import { Flex } from 'react-vant'
import Image from 'next/image'
// 导入样式文件
import style from './index.module.scss'
import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'
import { useRouter } from 'next/router'
type Props = {}

const NavigationMenu = () => {
  const router = useRouter()
  const navs = [
    {
      id: 0,
      img: nav1,
      title: '整租',
      path: '/home/list',
    },
    {
      id: 1,
      img: nav2,
      title: '合租',
      path: '/home/list',
    },
    {
      id: 2,
      img: nav3,
      title: '地图找房',
      path: '/home/map',
    },
    {
      id: 3,
      img: nav4,
      title: '去出租',
      path: '/home/list',
    },
  ]
  const renderNavs = () => {
    return navs.map((item) => (
      <Flex.Item key={item.id} onClick={() => router.push(item.path)}>
        <Image src={item.img} alt={''} />
        {/* <img src={item.img as any} alt="" /> */}
        {/* <div>{item.img as any}</div> */}
        <h2>{item.title}</h2>
      </Flex.Item>
    ))
  }
  return (
    <Flex className={style.nav} justify="around" align="center">
      {renderNavs()}
    </Flex>
  )
}

export default NavigationMenu
