import React, {
  FC,
  memo,
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react'

import { getFileList } from '@/api/homeModule'
import { Swiper, Image } from 'react-vant'

interface HomeSwipeProps {
  count?: number
  ref: any
}
interface swipersProps {
  swipers: any[]
}
// 使用场景： forwardRef 搭配useImperativeHandle使用，经常会用在dom操作的库或者表单提交上；

// forwardRef 给子组件使用，帮助父组件获取方法和属性
const HomeSwipe: FC<any> = forwardRef((props, ref) => {
  // console.log('ref:', ref)
  const [state, setstate] = useState([])
  //拿到的数据
  useEffect(() => {
    ;(async () => {
      const { data } = await getFileList()

      try {
        if (data.status) {
          // setstate((state.swipers) =>  [...data.body] as swipersProps)
          // setstate(data.body)
          setstate((state) => [...(data.body as [])])
        }
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  // 希望，将以下的方法和属性给父组件

  // 属性
  const inputRef = useRef<HTMLInputElement | null>(null)

  // 方法
  const handleImageClick = () => {
    console.log('imageClick')
  }

  useImperativeHandle(ref, () => {
    // 生命周期，return的东西，就会被父组件获取到
    return {
      inputRef,
      handleImageClick,
    }
  })

  return (
    <div style={{ height: '212px', position: 'relative' }}>
      {/* <Image src="https://api-haoke-web.itheima.net/img/swiper/1.png" /> */}
      <Swiper autoplay={5000}>
        {state &&
          state.map((v: { id: React.Key; imgSrc: String; alt: String }) => {
            return (
              // <div>111</div>
              <Swiper.Item key={v.id}>
                <Image src={'https://api-haoke-web.itheima.net' + v.imgSrc} />
              </Swiper.Item>
            )
          })}
      </Swiper>
    </div>
  )
})

export default memo(HomeSwipe)
