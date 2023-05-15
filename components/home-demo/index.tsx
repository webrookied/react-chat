import React, { FC, memo } from 'react'

interface HomeDemoProps {
  func?: () => void
}

const HomeDemo: FC<HomeDemoProps> = ({ func }) => {
  console.log('count:--------home-demo')
  return <div>HomeDemo</div>
}

export default memo(HomeDemo)
